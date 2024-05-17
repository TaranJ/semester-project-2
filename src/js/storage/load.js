// loads data from local storage and parses the stored JSON data before returning it
export function load(key) {
  return JSON.parse(localStorage.getItem(key));
}
