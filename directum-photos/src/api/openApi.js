import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "https://jsonplaceholder.typicode.com/";

export function getAllPhotos() {
    return fetch(baseUrl + "photos/", {
        method: "GET",
        headers: { "content-type": "application/json" },
        credentials: "include",
    })
        .then((response) => handleResponse(response))
        .catch(handleError);
}

export function getCurrentUser(userId) {
    return fetch(baseUrl + `users/${userId}`, {
        method: "GET",
        headers: { "content-type": "application/json" },
        credentials: "include",
    })
        .then((response) => handleResponse(response))
        .catch(handleError);
}
