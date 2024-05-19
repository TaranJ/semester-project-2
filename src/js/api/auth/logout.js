import { remove } from "../../storage/remove.js";

/**
 * Logs out the current user.
 * Removes the token and profile from local storage.
 * Redirects the user to the homepage.
 */
export function logout() {
  remove("token");
  remove("profile");
  window.location.href = "/index.html";
}
