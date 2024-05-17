import { remove } from "../../storage/remove.js";

export function logout() {
  remove("token");
  remove("profile");
  window.location.reload();
}
