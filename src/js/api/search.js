import { searchField } from "../ui/constants.js";
import { createHTMLListings, feedContainer } from "../ui/listings.js";
import { getListings } from "./fetch.js";

/**
 * Searches for listings that match the query and updates the UI with the filtered results.
 * @async
 * @param {string} query - The search query to filter listings.
 * @returns {Promise<void>} A Promise that resolves when the search process is completed.
 * @throws {Error} If the search process fails.
 */
export async function search(query) {
  try {
    const result = await getListings();
    const posts = result.data;

    // Filter posts based on the search query
    const filteredPosts = posts.filter((post) => {
      if (query) {
        const titleMatch = post.title && post.title.toLowerCase().includes(query.toLowerCase());
        const bodyMatch = post.description && post.description.toLowerCase().includes(query.toLowerCase());
        const nameMatch = post.seller.name && post.seller.name.toLowerCase().includes(query.toLowerCase());
        const tagsMatch = post.tags && post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
        return titleMatch || bodyMatch || nameMatch || tagsMatch;
      }
      return false;
    });

    // Clear previous posts from the DOM
    clearPreviousPosts();

    // Display filtered posts
    createHTMLListings(filteredPosts);
  } catch (error) {
    console.error("Error searching posts:", error);
    throw error;
  }
}

/**
 * Clears the previous posts from the feed container in the DOM.
 */
export function clearPreviousPosts() {
  feedContainer.innerHTML = "";
}

/**
 * Attaches an event listener to the search field to handle search queries.
 * If the current page is the feed page, it listens for input events.
 * Otherwise, it listens for the Enter key press to redirect to the feed page with the query.
 */
export function attachSearchEventListener() {
  const currentPath = window.location.pathname;
  const isFeedPage = currentPath.includes("feed");

  if (isFeedPage) {
    searchField.addEventListener("input", function () {
      const query = this.value.trim();
      search(query);
      console.log("Search executed for:", query);
    });
  } else {
    searchField.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const query = this.value.trim();
        window.location.href = `/feed.html?query=${encodeURIComponent(query)}`;
      }
    });
  }
}
