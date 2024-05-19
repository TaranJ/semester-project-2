import { getListingsForProfile } from "./api/fetch.js";
import { displayProfile, displayProfileListings } from "./ui/profileinfo.js";

displayProfile();
getListingsForProfile();
displayProfileListings();
