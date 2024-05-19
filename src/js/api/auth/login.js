import { save } from "../../storage/save.js";
import { errLogin } from "../../ui/constants.js";
import { APIBase, loginURL } from "../constants.js";

/**
 * Handles the login event.
 * Prevents the default form submission behavior.
 * Retrieves the email and password from the form fields.
 * Attempts to log in using the provided email and password.
 * @async
 * @param {Event} event - The login event.
 * @returns {Promise<void>} A Promise that resolves after the login process is completed.
 */
export async function onLogin(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  await login(email, password);
}

/**
 * Logs in a user using the provided email and password.
 * Sends a POST request to the server with the user's credentials.
 * Saves the access token and user profile to local storage upon successful login.
 * Redirects the user to the profile page after successful login.
 * @async
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} A Promise that resolves with the user profile upon successful login.
 * @throws {Error} If the login request fails or if the provided credentials are invalid.
 */
export async function login(email, password) {
  const response = await fetch(APIBase + loginURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data;
    save("token", accessToken);
    save("profile", profile);
    window.location.href = "/profile.html";
    return profile;
  } else if (response.status === 401 || response.status === 400) {
    errLogin.classList.remove("d-none");
    throw new Error("Invalid email or password. Please try again.");
  } else {
    throw new Error("Could not login to the account");
  }
}

/**
 * Sets up a listener for the login form submission event.
 */
export function setLoginListener() {
  document.getElementById("logIn").addEventListener("submit", onLogin);
}
