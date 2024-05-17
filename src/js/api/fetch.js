import { load } from "../storage/load.js";
import { APIBase, APIKey, listingsURL } from "./constants.js";

// Represents an array of posts obtained from the API
let listings = [];

// Retrieves the query string from the current URL
// const queryString = document.location.search;
// // Parses the query string to extract URL parameters
// const params = new URLSearchParams(queryString);
// // Retrieves the value of the "id" parameter from the URL.
// const id = params.get("id");

// Fetches posts from the API
export async function getListings() {
  try {
    const response = await fetch(APIBase + listingsURL + "?_author=true", {
      headers: {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": APIKey,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    listings = await response.json();
    console.log(listings);
    return listings;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
  }
}