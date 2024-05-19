import { load } from "../storage/load.js";
import { uploadErr } from "../ui/constants.js";
import { APIBase, APIKey, listingsURL } from "./constants.js";

/**
 * Creates a new listing by sending a POST request to the server.
 * @async
 * @param {object} listingData - The data for the new listing.
 * @returns {Promise<object>} A Promise that resolves with the response data from the server upon successful creation of the listing.
 * @throws {Error} If the request fails or an error occurs during processing.
 */
export async function createListing(listingData) {
  try {
    const response = await fetch(APIBase + listingsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create listing");
    }

    const responseData = await response.json();
    console.log("Listing created successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error creating listing:", error.message);
    throw error;
  }
}

// Usage example:
export const newData = {
  title: "",
  description: "",
  endsAt: "",
  media: [],
};

/**
 * Handles the form submission for creating a new listing.
 * Prevents the default form submission behavior, retrieves form data,
 * populates the new listing data object, and attempts to create the listing.
 * Redirects to the profile page upon successful creation.
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A Promise that resolves after the listing creation process is completed.
 * @throws {Error} If the listing creation fails.
 */
export async function handleListingCreation(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieves values from input elements
  const listingTitle = document.getElementById("title").value;
  const listingDescription = document.getElementById("description").value;
  const listingDeadline = document.getElementById("deadline").value;
  const mediaUrl = document.getElementById("media").value;

  // Populate newData object with form data
  newData.title = listingTitle;
  newData.description = listingDescription;
  newData.endsAt = listingDeadline;
  newData.media = [{ url: mediaUrl }];

  try {
    await createListing(newData);
    window.location.href = "/profile.html";
  } catch (error) {
    // display an error message to the user
    uploadErr.classList.remove("d-none");
    console.error(error);
  }
}

/**
 * Sets up an event listener for the form with the ID "createListing" to handle listing creation.
 */
export function setUploadListener() {
  document.getElementById("createListing").addEventListener("submit", handleListingCreation);
}
