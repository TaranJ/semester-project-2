import { load } from "../storage/load.js";
import { biddingContainer, errBid } from "../ui/constants.js";
import { handleNoUserForBidding } from "../ui/logindisplay.js";
import { APIBase, APIKey, listingsURL } from "./constants.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/**
 * Reveals the bidding form and attaches a submit event listener to it.
 */
export function openBidder() {
  biddingContainer.classList.remove("d-none");
  biddingContainer.addEventListener("submit", handleBidding);
}

/**
 * Sends a bid to the server for the specified listing.
 * @async
 * @param {object} bidData - The bid data containing the bid amount.
 * @param {number} bidData.amount - The bid amount.
 * @returns {Promise<object>} A Promise that resolves with the response data upon successful bid placement.
 * @throws {Error} If the bid placement request fails.
 */
export async function bidOnListing(bidData) {
  try {
    const response = await fetch(APIBase + listingsURL + "/" + id + "/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
      body: JSON.stringify(bidData),
    });

    if (!response.ok) {
      throw new Error("Failed to place bid");
    }

    const responseData = await response.json();
    console.log("Bid placed successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error placing bid:", error.message);
    throw error;
  }
}

// Example of newBid object
export const newBid = {
  amount: 0, // Required
};

/**
 * Handles the bidding form submission event.
 * Prevents the default form submission behavior.
 * Retrieves the bid amount from the input field and sends it to the server.
 * Reloads the page upon successful bid placement.
 * Displays an error message if bid placement fails.
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A Promise that resolves after the bidding process is completed.
 * @throws {Error} If the bid placement request fails.
 */
export async function handleBidding() {
  event.preventDefault();
  // Retrieves values from input elements
  const bid = document.getElementById("bid").value;

  // Populate newBid object with form data
  newBid.amount = parseInt(bid);

  try {
    await bidOnListing(newBid);
    // Reload the current page
    window.location.reload();
  } catch (error) {
    // shows error message to the user
    errBid.classList.remove("d-none");
    console.error(error);
  }
}

/**
 * Sets up the event listener for the place bid button.
 * If the user is not logged in, shows a login prompt.
 * If the user is logged in, reveals the bidding form.
 */
export function setPlaceBidListener() {
  const localProfile = load("profile");
  if (!localProfile || !localProfile.name) {
    document.getElementById("bid-btn").addEventListener("click", handleNoUserForBidding);
  } else {
    document.getElementById("bid-btn").addEventListener("click", openBidder);
  }
}
