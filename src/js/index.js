import { attachSearchEventListener } from "./api/search.js";
import { displayListings } from "./ui/listings.js";
import { checkIfLoggedIn } from "./ui/logindisplay.js";

checkIfLoggedIn();
attachSearchEventListener();
displayListings();

document.addEventListener("DOMContentLoaded", function () {
  const navbarToggler = document.getElementById("navbar-toggler");
  const navbarMenu = document.getElementById("navbarMenu");

  navbarToggler.addEventListener("click", function () {
    navbarMenu.classList.toggle("show");
  });
});
