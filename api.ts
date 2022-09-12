export function fetchGoogleBook(searchParameters: string) {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchParameters}`
  ).then((response) => {
    return response.json();
  });
}

export function fetchAllListings(){
  return fetch(
    `https://powerful-foal-sweater.cyclic.app/api/listings`
  ).then((response) => {
    return response.json();
  });
}