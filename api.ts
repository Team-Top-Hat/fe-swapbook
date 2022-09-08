export function fetchGoogleBook(searchParameters: string) {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchParameters}`
  ).then((response) => {
    return response.json();
  });
}
