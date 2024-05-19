import { getListings } from "../api/fetch.js";
import { search } from "../api/search.js";
import { loader } from "./constants.js";
import { displayError } from "./error.js";

export const feedContainer = document.querySelector(".feed-container");

/**
 * Fetches and displays listings. Checks for a search query in the URL parameters
 * and filters the displayed listings based on the query, if present.
 * @async
 * @returns {Promise<void>} A Promise that resolves once listings have been fetched and displayed,
 * or filtered and displayed based on a search query.
 */
export async function displayListings() {
  try {
    // Fetch listings data
    const result = await getListings();
    const posts = result.data;

    // Sort listings by created date in descending order (newest first)
    posts.sort((a, b) => new Date(b.created) - new Date(a.created));

    // Hide loader once listings are fetched
    loader.style.display = "none";

    // Display listings with or without search query
    createHTMLListings(posts);

    // Retrieve the search query from the URL parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get("query");

    // If a search query exists, filter the listings
    if (query) {
      search(query);
    }
  } catch (error) {
    // Display error message if fetching listings fails
    loader.style.display = "none";
    feedContainer.innerHTML += displayError(`Something went wrong ˙◠˙ <br> Please try again later!`);
    console.error("Error displaying posts:", error);
  }
}

/**
 * Creates HTML markup for displaying listings based on the provided data.
 * The number of listings displayed is determined by the current page.
 * @param {Array} listings - An array of listing objects to be displayed.
 */
export function createHTMLListings(listings) {
  // Determine the maximum number of listings to display based on the current page
  const currentPath = window.location.pathname;
  const isFeedPage = currentPath.includes("feed");
  let maxListings = 20; // Default to 20

  // Set maxListings based on the current page
  if (isFeedPage) {
    maxListings = 40;
  } else {
    maxListings = 4;
  }

  // Filter listings to only include those with valid media URLs
  const validListings = listings.filter((listing) => listing.media && listing.media[0] && listing.media[0].url);

  // Limit the valid listings to the maximum number to display
  const displayListings = validListings.slice(0, maxListings);

  // Loop through the valid and limited listings to create HTML
  displayListings.forEach((listing) => {
    const newDate = new Date(listing.endsAt);
    const date = newDate.toLocaleDateString("en-GB");

    feedContainer.innerHTML += ` <div class="col-12 col-md-6 col-lg-3 mb-4">
    <a href="listing.html?id=${listing.id}" class="text-decoration-none">
      <div class="card listing-bg border-0 w-100">
        <img src="${listing.media[0].url}" alt="${listing.media[0].alt}" class="listing-img m-2" />
        <div class="card-body">
          <h2 class="condensed text-dark fs-6">${listing.title}</h2>
          <p class="fs-7">Bidding ends ${date}</p>
        </div>
      </div>
    </a>
  </div>`;
  });
}
