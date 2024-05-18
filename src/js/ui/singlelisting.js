import { getSingleListing } from "../api/fetch.js";
import { listingContainer } from "./constants.js";
import { displayError } from "./error.js";

export async function displayListing() {
  try {
    const result = await getSingleListing();
    const listing = result.data;

    // loader.style.display = "none";
    console.log(listing);
    createHTMLListing(listing);
  } catch (error) {
    // loader.style.display = "none";
    listingContainer.innerHTML += displayError(`Something went wrong ˙◠˙ <br> Please try again later!`);
    console.error("Failed to display listing:", error);
    throw error;
  }
}

export function createHTMLListing(listing) {
  // const newDate = new Date(post.created);
  // const date = newDate.toLocaleDateString("en-GB");

  //   meta.content = ` Check out ${listing.seller.name}'s latest post on Pawfinity: ${listing.title}. Connect, share, and celebrate with fellow pet lovers. The perfect space for wagging tails and endless smiles. Join the fun now!`;

  listingContainer.innerHTML += `<h1 class="p-2 p-sm-0 pt-sm-5 pb-sm-3 h3 text-uppercase">${listing.title}</h1>
  
  <img src="${listing.media[0].url}" alt="${listing.media[0].alt}" class="w-100 p-0 post-page-img" />
  
  <div class="d-flex justify-content-between p-2 pt-2 pb-5 p-sm-0 pt-sm-2 pb-sm-3">
      <p class="col-10 col-lg-9 col-xl-10 text-black mb-0"> Posted by ${listing.seller.name} </p>
      <i class="fa-regular fa-heart"></i>
  </div>
  <p>${listing.description}</p>
    `;
}
