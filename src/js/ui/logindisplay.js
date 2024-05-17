import { load } from "../storage/load.js";
import { createForm, loginContainer } from "./constants.js";

export function checkIfLoggedIn() {
  const localProfile = load("profile");
  if (localProfile && localProfile.name) {
    loginContainer.classList.add("d-none");
  } else {
    createForm.innerHTML = `<p class="text-center align-content-end fs-5">Log in or register to list an auction</p>
    <div class="d-flex align-items-center justify-content-center">
      <a href="/login.html" class="text-nowrap text-uppercase text-decoration-none">Log in</a>
      <a href="/signup.html"
        ><button class="btn btn-custom ms-3 text-nowrap text-white text-uppercase rounded-pill p-4 pt-2 pb-2">Create account</button></a
      >
    </div>`;
  }
}
