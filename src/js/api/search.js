import { searchField } from "../ui/constants.js";
import { createHTMLListings, feedContainer } from "../ui/listings.js";
import { getListings } from "./fetch.js";

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

export function clearPreviousPosts() {
  feedContainer.innerHTML = "";
}

export function attachSearchEventListener() {
  if (window.location.pathname === "/feed.html") {
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
