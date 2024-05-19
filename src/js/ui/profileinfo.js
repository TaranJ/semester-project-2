import { logout } from "../api/auth/logout.js";
import { getListingsForProfile, getProfile } from "../api/fetch.js";
import { latestAuctions, loader, meta, profileContainer } from "./constants.js";
import { setEditProfileListener } from "./edit.js";
import { displayError } from "./error.js";
import { createHTMLListings } from "./listings.js";

/**
 * Displays the user's profile information.
 * Fetches the user's profile data and updates the DOM with the profile picture, name, and credits.
 * Provides buttons for editing the profile, creating a new auction, and logging out.
 * @async
 */
export async function displayProfile() {
  try {
    const profile = await getProfile();
    createHTMLForProfile(profile);
  } catch (error) {
    console.error("Error displaying profile:", error);
  }
}

/**
 * Generates HTML content to display the user's profile information.
 * Inserts the user's profile picture, name, credits, and action buttons into the designated profile container element.
 * @param {object} profile - The user's profile data containing name, avatar URL, credits, and optionally bio.
 */
export async function createHTMLForProfile(profile) {
  console.log(profile);
  meta.content = `${profile.data.name}'s profile on Vintage Charm Bids. ${profile.data.name} is part of our community of enthusiasts. Join us to place your bids, and find your next cherished item today!
  `;

  document.title = `Vintage Charm Bids | ${profile.data.name}`;

  profileContainer.innerHTML = `<div class="d-flex flex-column align-items-center gap-3">
    <div>
      <img src="${profile.data.avatar.url}" alt="${profile.data.avatar.alt}" class="profile-img rounded-circle" />
      <h2 class="bg-primary text-white condensed fs-5 p-2 text-center fw-light m-4 mt-0">${profile.data.name}</h2>
    </div>
    <div class="m-4 mt-0 col-6 mb-auto">
      <p class="m-0 text-center">Credits:</p>
      <p class="bg-primary text-white condensed fs-5 p-3 text-center fw-light rounded">${profile.data.credits}</p>
    </div>
  </div>
  <div class="bg-light p-5 d-flex flex-column col-12 col-md-8">
    <div class="d-flex flex-column gap-5">
      <button class="btn btn-cyan" id="edit-btn">Edit profile</button>
      <a href="/newlisting.html" class="btn btn-cyan">Create Auction</a>
    </div>
    <button class="btn mt-auto text-uppercase" id="logout-btn">Log out</button>
  </div>`;
  setEditProfileListener();
  setLogoutListener();
}

/**
 * Sets up a click event listener for the logout button.
 */
export function setLogoutListener() {
  document.getElementById("logout-btn").addEventListener("click", logout);
}

/**
 * Displays the user's listings on their profile page.
 * Fetches the listings associated with the user's profile and displays them.
 * @async
 */
export async function displayProfileListings() {
  try {
    const result = await getListingsForProfile();
    const posts = result.data;

    loader.style.display = "none";
    latestAuctions.classList.remove("d-none");
    createHTMLListings(posts);
  } catch (error) {
    loader.style.display = "none";
    latestAuctions.innerHTML += displayError(`Something went wrong ˙◠˙ <br> Please try again later!`);
    console.error("Error displaying posts:", error);
  }
}
