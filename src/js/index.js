import { attachSearchEventListener } from "./api/search.js";
import { displayListings } from "./ui/listings.js";
import { checkIfLoggedIn } from "./ui/logindisplay.js";

checkIfLoggedIn();
attachSearchEventListener();
displayListings();
