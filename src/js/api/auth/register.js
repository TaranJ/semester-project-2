import { errSignup } from "../../ui/constants.js";
import { APIBase, registerURL } from "../constants.js";

/**
 * Registers a new user with the provided name, email, and password.
 * Sends a POST request to the server with the user's registration data.
 * Resets the register form and displays a success message upon successful registration.
 * Displays an error message if registration fails due to invalid email format.
 * @async
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} A Promise that resolves with the response data upon successful registration.
 * @throws {Error} If the registration request fails or if the email format is invalid.
 */
export async function register(name, email, password) {
  const response = await fetch(APIBase + registerURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    return await response.json();
  } else if (response.status === 400) {
    errSignup.classList.remove("d-none");
    throw new Error("Only stud.noroff.no emails are allowed to register");
  } else {
    throw new Error("could not register the account");
  }
}

/**
 * Handles the registration form submission event.
 * Prevents the default form submission behavior.
 * Retrieves the name, email, and password from the form fields.
 * Attempts to register a new user using the provided data.
 * @async
 * @param {Event} event - The registration event.
 * @returns {Promise<void>} A Promise that resolves after the registration process is completed.
 */
export async function onRegister(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

  await register(name, email, password);
  window.location.href = "/login.html";
}

// Sets up a listener for the register form submission event.
export function setRegisterListener() {
  document.getElementById("signUp").addEventListener("submit", onRegister);
}
