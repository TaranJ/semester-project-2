import { load } from "../storage/load.js";
import { uploadErr } from "../ui/constants.js";
import { APIBase, APIKey } from "./constants.js";

/**
 * Updates the user profile with the provided profile data.
 * Sends a PUT request to the server with the user's profile data.
 * @async
 * @param {object} profileData - The new profile data to update.
 * @returns {Promise<object>} A Promise that resolves with the response data
 * from the server upon successful update of the profile.
 * @throws {Error} If the request fails or an error occurs during processing.
 */
export async function updateProfile(profileData) {
  try {
    const profile = load("profile");
    const response = await fetch(APIBase + "/auction/profiles/" + profile.name, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
}

// usage example
export const newProfileData = {
  avatar: {
    url: "",
  },
};

/**
 * Handles the form submission for updating the user profile.
 * Prevents the default form submission behavior, retrieves form data,
 * populates the new profile data object, and attempts to update the profile.
 * Reloads the current page upon successful update.
 * @async
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A Promise that resolves after the profile update process is completed.
 * @throws {Error} If the profile update fails.
 */
export async function handleUpdate(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieves values from input elements
  const mediaUrl = document.getElementById("avatar").value;

  // Populate newProfileData object with form data
  newProfileData.avatar.url = mediaUrl;

  try {
    await updateProfile(newProfileData);
    window.location.reload();
  } catch (error) {
    uploadErr.classList.remove("d-none");
    console.error(error);
  }
}
