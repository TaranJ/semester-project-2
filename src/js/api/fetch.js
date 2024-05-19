import { load } from "../storage/load.js";
import { APIBase, APIKey, listingsURL } from "./constants.js";

// Represents an array of posts obtained from the API
let listings = [];

// Retrieves the query string from the current URL
const queryString = document.location.search;
// Parses the query string to extract URL parameters
const params = new URLSearchParams(queryString);
// Retrieves the value of the "id" parameter from the URL.
const id = params.get("id");

/**
 * Fetches all active listings from the API.
 * @async
 * @returns {Promise<Array>} A Promise that resolves to an array of listings.
 * @throws {Error} If the request fails.
 */
export async function getListings() {
  try {
    const response = await fetch(APIBase + listingsURL + "?_seller=true&_active=true", {
      headers: {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }
    listings = await response.json();
    return listings;
  } catch (error) {
    console.error("Error fetching listings:", error.message);
  }
}

/**
 * Fetches listings for the currently logged-in user's profile.
 * @async
 * @returns {Promise<Array>} A Promise that resolves to an array of listings for the user's profile.
 * @throws {Error} If the request fails.
 */
export async function getListingsForProfile() {
  try {
    const localProfile = load("profile");
    const response = await fetch(APIBase + "/auction/profiles/" + localProfile.name + "/listings", {
      headers: {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }
    listings = await response.json();
    return listings;
  } catch (error) {
    console.error("Error fetching listings:", error.message);
    throw error;
  }
}

/**
 * Fetches the profile data of the currently logged-in user.
 * @async
 * @returns {Promise<object>} A Promise that resolves to the profile data of the user.
 * @throws {Error} If the request fails.
 */
export async function getProfile() {
  try {
    const localProfile = load("profile");
    const response = await fetch(APIBase + "/auction/profiles/" + localProfile.name, {
      headers: {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
}

/**
 * Fetches a single listing by its ID from the API.
 * @async
 * @returns {Promise<object>} A Promise that resolves to the data of the requested listing.
 * @throws {Error} If the request fails.
 */
export async function getSingleListing() {
  try {
    const response = await fetch(APIBase + listingsURL + "/" + id + "?_seller=true&_bids=true", {
      headers: {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error.message);
  }
}
