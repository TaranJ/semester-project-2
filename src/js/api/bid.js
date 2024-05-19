import { load } from "../storage/load.js";
import { biddingContainer } from "../ui/constants.js";
import { handleNoUserForBidding } from "../ui/logindisplay.js";
import { APIBase, APIKey, listingsURL } from "./constants.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export function openBidder() {
  biddingContainer.classList.remove("d-none");

  // Add event listener to the updateForm once it's revealed
  biddingContainer.addEventListener("submit", handleBidding);
}

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

// Usage example:
export const newBid = {
  amount: 0, // Required
};

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
    //   uploadErr.classList.remove("d-none");
    console.error(error);
  }
}

export function setPlaceBidListener() {
  const localProfile = load("profile");
  if (!localProfile || !localProfile.name) {
    document.getElementById("bid-btn").addEventListener("click", handleNoUserForBidding);
  } else {
    document.getElementById("bid-btn").addEventListener("click", openBidder);
  }
}
