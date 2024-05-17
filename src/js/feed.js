import { getListings } from "./api/fetch.js";
import { displayListings } from "./ui/listings.js";
import { checkIfLoggedIn } from "./ui/logindisplay.js";

getListings();
displayListings();
checkIfLoggedIn();
