import { setPlaceBidListener } from "../api/bid.js";
import { getSingleListing } from "../api/fetch.js";
import { listingContainer, loader, meta } from "./constants.js";
import { displayError } from "./error.js";

/**
 * Displays the details of a single listing.
 * Fetches the data of the listing and updates the DOM with the listing's information,
 * including title, seller name, description, closing date, current highest bid, and a button to place a bid.
 * @async
 */
export async function displayListing() {
  try {
    const result = await getSingleListing();
    const listing = result.data;

    loader.style.display = "none";
    createHTMLListing(listing);
  } catch (error) {
    loader.style.display = "none";
    listingContainer.innerHTML += displayError(`Something went wrong ˙◠˙ <br> Please try again later!`);
    console.error("Failed to display listing:", error);
    throw error;
  }
}

/**
 * Generates HTML content to display the details of a single listing.
 * Inserts the listing's title, seller name, description, closing date, current highest bid, and a button to place a bid
 * into the designated listing container element.
 * @param {object} listing - The listing data containing title, seller name, description, closing date, media, and bids.
 */
export function createHTMLListing(listing) {
  const newDate = new Date(listing.endsAt);
  const date = newDate.toLocaleDateString("en-GB");

  meta.content = ` Check out ${listing.seller.name}'s auction listing: ${listing.title}! Create an account to start bidding on this item and other unique vintage collectibles`;

  document.title = `Vintage Charm Bids | ${listing.title}`;

  // Calculate the highest bid amount
  const highestBid = listing.bids.length > 0 ? Math.max(...listing.bids.map((bid) => bid.amount)) : "No bids yet";

  listingContainer.innerHTML += `<div class="row">
  
  <div class="col-12 col-lg-6 p-0 p-lg-4 pb-lg-0 pt-lg-0">
            <img src="${listing.media[0].url}" alt="${listing.media[0].alt}" class="img-fluid w-100 listing-page-img" />
          </div>
          <div class="col-12 col-lg-6 d-flex flex-column justify-content-between p-3 pt-2 pb-5 p-xl-0 pt-sm-2 pb-sm-3">
          <div>
            <h1 class="p-2 p-sm-0 m-0 h5">${listing.title}</h1>
            <div class="d-flex justify-content-between">
              <p>${listing.seller.name}</p>
              <p class="text-danger">Closes on ${date}</p>
            </div>
          </div>
            <p>${listing.description}</p>
          <div>
            <div class="d-flex gap-4">
              <p>Current</p>
              <p class="text-danger">${highestBid}</p>
            </div>
            <button class="btn btn-custom text-white text-uppercase" id="bid-btn">Place bid</button></div>
          </div></div>
  
    `;
  setPlaceBidListener();
}
