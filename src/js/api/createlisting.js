import { load } from "../storage/load.js";
import { APIBase, APIKey, listingsURL } from "./constants.js";

/**
 * Creates a new post by sending a POST request to the server.
 * @async
 * @param {object} postData - The data for the new post.
 * @returns {Promise<object>} A Promise that resolves with the response data
 * from the server upon successful creation of the post.
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

// Function to handle form submission
export async function handleListingCreation(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieves values from input elements
  const listingTitle = document.getElementById("title").value;
  const listingDescription = document.getElementById("description").value;
  const listingDeadline = document.getElementById("deadline").value;
  const mediaUrl = document.getElementById("media").value;

  // Populate newPostData object with form data
  newData.title = listingTitle;
  newData.description = listingDescription;
  newData.endsAt = listingDeadline;
  newData.media = [{ url: mediaUrl }];

  try {
    await createListing(newData);
    window.location.href = "/feed.html";
  } catch (error) {
    // uploadErr.classList.remove("d-none");
    console.error(error);
  }
}

// Adds an event listener to the form with the ID "createPost" to handle post creation.
export function setUploadListener() {
  document.getElementById("createListing").addEventListener("submit", handleListingCreation);
}
