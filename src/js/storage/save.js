// saves data to the local storage and converts the value to a JSON string
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
