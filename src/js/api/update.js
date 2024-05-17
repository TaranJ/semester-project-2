import { load } from "../storage/load.js";
import { APIBase, APIKey } from "./constants.js";

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
    console.log("Profile updated successfully:", responseData);
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

export async function handleUpdate(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieves values from input elements

  const mediaUrl = document.getElementById("avatar").value;

  // Populate newPostData object with form data
  newProfileData.avatar.url = mediaUrl;

  try {
    await updateProfile(newProfileData);
    // Reload the current page
    window.location.reload();
  } catch (error) {
    // shows error message to the user
    //   uploadErr.classList.remove("d-none");
    console.error(error);
  }
}
