import { attachSearchEventListener } from "./api/search.js";
import { checkIfLoggedIn } from "./ui/logindisplay.js";

checkIfLoggedIn();
attachSearchEventListener();
