import { getListings } from "../api/fetch.js";
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

    // loader.style.display = "none";
    createHTMLListings(posts);

    // Retrieve the search query from the URL parameter
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // // const query = urlParams.get("query");

    // If a search query exists, filter the posts
    // if (query) {
    //   searchPosts(query);
    // }
  } catch (error) {
    // loader.style.display = "none";
    feedContainer.innerHTML += displayError(`Something went wrong ˙◠˙ <br> Please try again later!`);
    console.error("Error displaying posts:", error);
  }
}

export function createHTMLListings(listings) {
  listings.forEach((listings) => {
    {
      feedContainer.innerHTML += `
      <div class="row mb-2 w-100">
        <div class="col-2 col-lg-3 col-xl-2 align-self-center">
          <div class="container ps-2">
            <h1>${listings.title}</h1>
            <img src="${listings.media[0].url}" alt="${listings.media[0].alt}" />
          </div>
        </div>
      </div>
    `;
    }
  });
}
