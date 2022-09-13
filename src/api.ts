export function fetchGoogleBook(searchParameters: string) {
  return fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchParameters}`
  ).then((response) => {
    return response.json();
  });
}

export function fetchAllListingsnon() {
  return fetch(`https://powerful-foal-sweater.cyclic.app/api/listings`).then(
    (response) => {
      return response.json();
    }
  );
}

export function fetchAllListings(key: string) {
  return fetch(`https://alert-cow-loincloth.cyclic.app/api/listings`, {
    method: "GET",
    headers: {
      token: key,
    },
  }).then((response) => {
    return response.json();
  });
}

export function fetchUser(key: string) {
  return fetch(`https://alert-cow-loincloth.cyclic.app/api/user`, {
    method: "GET",
    headers: {
      token: key,
    },
  }).then((response) => {
    return response.json();
  });
}
