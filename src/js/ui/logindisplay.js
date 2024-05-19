import { load } from "../storage/load.js";
import { biddingContainer, createForm, loginContainer } from "./constants.js";

/**
 * Checks if a user is logged in by checking the presence of a user profile in the local storage.
 * If the user is logged in, hides the login container.
 */
export function checkIfLoggedIn() {
  const localProfile = load("profile");
  if (localProfile && localProfile.name) {
    loginContainer.classList.add("d-none");
  }
}

/**
 * Handles the scenario where there is no user logged in for creating a new post.
 * Updates the create form HTML to prompt the user to log in or register.
 */
export function handleNoUserForPostCreation() {
  const localProfile = load("profile");
  if (!localProfile || !localProfile.name) {
    createForm.innerHTML = `<p class="text-center align-content-end fs-5">Log in or register to list an auction</p>
    <div class="d-flex align-items-center justify-content-center">
      <a href="/login.html" class="text-nowrap text-uppercase text-decoration-none">Log in</a>
      <a href="/signup.html"
        class="btn btn-custom ms-3 text-nowrap text-white text-uppercase rounded-pill p-4 pt-2 pb-2">Create account</a
      >
    </div>`;
  }
}

/**
 * Handles the scenario where there is no user logged in for bidding on an auction.
 * Updates the bidding container HTML to prompt the user to log in or register.
 */
export function handleNoUserForBidding() {
  biddingContainer.classList.remove("d-none");
  biddingContainer.innerHTML = `<p class="text-center align-content-end fs-5">Log in or register to bid on an auction</p>
    <div class="d-flex align-items-center justify-content-center">
      <a href="/login.html" class="text-nowrap text-uppercase text-decoration-none">Log in</a>
      <a href="/signup.html"
        ><button class="btn btn-custom ms-3 text-nowrap text-white text-uppercase rounded-pill p-4 pt-2 pb-2">Create account</button></a
      >
    </div>`;
}
