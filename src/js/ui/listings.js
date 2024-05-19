import { getListings } from "../api/fetch.js";
import { search } from "../api/search.js";
import { loader } from "./constants.js";
import { displayError } from "./error.js";

export const feedContainer = document.querySelector(".feed-container");

/**
 * Fetches and displays posts. It also checks for a search query in the URL parameters,
 * and if found, filters the displayed posts by this query.
 * @async
 * @returns {Promise<void>} A Promise that resolves once posts have been fetched and displayed,
 * or filtered and displayed based on a search query.
 */
export async function displayListings() {
  try {
    const result = await getListings();
    const posts = result.data;

    // Sort posts by created date in descending order (newest first)
    posts.sort((a, b) => new Date(b.created) - new Date(a.created));

    loader.style.display = "none";
    createHTMLListings(posts);

    // Retrieve the search query from the URL parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const query = urlParams.get("query");

    // If a search query exists, filter the posts
    if (query) {
      search(query);
    }
  } catch (error) {
    loader.style.display = "none";
    feedContainer.innerHTML += displayError(`Something went wrong ˙◠˙ <br> Please try again later!`);
    console.error("Error displaying posts:", error);
  }
}

export function createHTMLListings(listings) {
  // Check the current location
  const currentPath = window.location.pathname;
  let maxListings = 20; // Default to 20

  // Set maxListings based on the current page
  if (currentPath === "/index.html" || currentPath === "/listing.html") {
    maxListings = 4;
  } else if (currentPath === "/feed.html") {
    maxListings = 20;
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
        <div class="card listing-bg border-0">
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
