import { handleUpdate } from "../api/update.js";
import { updateContainer } from "./constants.js";

/**
 * Reveals the update container by removing the "d-none" class, allowing users to edit their profile.
 * Adds an event listener to the update form for handling profile updates.
 */
export function openEditor() {
  updateContainer.classList.remove("d-none");

  // Add event listener to the updateForm once it's revealed
  updateContainer.addEventListener("submit", handleUpdate);
}

/**
 * Sets up a listener for the edit profile button click event.
 * When the button is clicked, it triggers the openEditor function to reveal the update container.
 */
export function setEditProfileListener() {
  document.getElementById("edit-btn").addEventListener("click", openEditor);
}
