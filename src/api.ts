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

export function postListing(key: string, listing: any) {
  return fetch(`https://alert-cow-loincloth.cyclic.app/api/listings`, {
    method: "POST",
    headers: {
      token: key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ listing }),
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

export function postBook(key: string, book: any) {
  return fetch(`https://alert-cow-loincloth.cyclic.app/api/user/bookshelf`, {
    method: "POST",
    headers: {
      token: key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ book }),
  }).then((response) => {
    return response.json();
  });
}

export function deleteBook(key: string, isbn: string) {
  return fetch(
    `https://alert-cow-loincloth.cyclic.app/api/user/bookshelf/${isbn}`,
    {
      method: "DELETE",
      headers: {
        token: key,
      },
    }
  ).then((response) => {
    return response.text();
  });
}

export function fetchSwaps(key: string) {
  return fetch(`https://alert-cow-loincloth.cyclic.app/api/swaps`, {
    method: "GET",
    headers: {
      token: key,
    },
  }).then((response) => {
    return response.json();
  });
}

export function postSwap(key: string, swap: any) {
  return fetch(`https://alert-cow-loincloth.cyclic.app/api/swaps`, {
    method: "POST",
    headers: {
      token: key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ swap }),
  }).then((response) => {
    return response.json();
  });
}

export function patchSwap(key: string, swap: any) {
  return fetch(`https://alert-cow-loincloth.cyclic.app/api/swaps`, {
    method: "PATCH",
    headers: {
      token: key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ swap }),
  }).then((response) => {
    return response.json();
  });
}
