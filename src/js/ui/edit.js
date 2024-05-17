import { handleUpdate } from "../api/update.js";
import { updateContainer } from "./constants.js";

export function openEditor() {
  updateContainer.classList.remove("d-none");

  // Add event listener to the updateForm once it's revealed
  updateContainer.addEventListener("submit", handleUpdate);
}

export function setEditProfileListener() {
  document.getElementById("edit-btn").addEventListener("click", openEditor);
}
