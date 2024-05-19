import { getListings } from "../api/fetch.js";
import { search } from "../api/search.js";
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

    // loader.style.display = "none";
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
    // loader.style.display = "none";
    feedContainer.innerHTML += displayError(`Something went wrong ˙◠˙ <br> Please try again later!`);
    console.error("Error displaying posts:", error);
  }
}

export function createHTMLListings(listings) {
  const maxListings = 40; // Maximum number of listings to display

  // Filter listings to only include those with valid media URLs
  const validListings = listings.filter((listing) => listing.media && listing.media[0] && listing.media[0].url);

  // Limit the valid listings to the first 20
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
          <p class="fs-7">Bidding ends ${date} </p>
        </div>
      </div>
    </a>
  </div>`;
  });
}

// export function createHTMLListings(listings) {
//   listings.forEach((listings) => {
//     if (listings.media && listings.media[0] && listings.media[0].url) {
//       feedContainer.innerHTML += `<a href="listing.html?id=${listings.id}">
//       <div class="row mb-2 w-100">
//         <div class="col-2 col-lg-3 col-xl-2 align-self-center">
//           <div class="container ps-2">
//             <h1>${listings.title}</h1>
//             <img src="${listings.media[0].url}" alt="${listings.media[0].alt}" />
//           </div>
//         </div>
//       </div>
//       </a>`;
//     }
//   });
// }
