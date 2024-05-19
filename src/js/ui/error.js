/**
 * Generates HTML markup for displaying an error message.
 * @param {string} message - The error message to be displayed. Default is "Unknown error" if not provided.
 * @returns {string} HTML markup for displaying the error message.
 */
export function displayError(message = "Unknown error") {
  return `<div class="error border bg-danger text-white p-2 text-center">${message}</div>`;
}
