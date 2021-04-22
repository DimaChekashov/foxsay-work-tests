import { handleError, handleResponse } from "./apiUtils";

const baseUrl = "https://jsonplaceholder.typicode.com/";

export function getAllPhotos() {
    let photos = localStorage.getItem("photos");
    if (photos) {
        return new Promise((res) => res(JSON.parse(photos)));
    }

    return fetch(baseUrl + "photos/")
        .then((response) => handleResponse(response))
        .then((photos) => {
            localStorage.setItem("photos", JSON.stringify(photos));
            return photos;
        })
        .catch(handleError);
}

export function getCurrentUser(userId) {
    let user = localStorage.getItem("user-" + userId);
    if (user) {
        return new Promise((res) => res(JSON.parse(user)));
    }

    return fetch(baseUrl + `users/${userId}`)
        .then((response) => handleResponse(response))
        .then((user) => {
            localStorage.setItem("user-" + userId, JSON.stringify(user));
            return user;
        })
        .catch(handleError);
}

export function getAlbum() {
    let albums = localStorage.getItem("albums");
    if (albums) {
        return new Promise((res) => res(JSON.parse(albums)));
    }

    return fetch(baseUrl + "albums/")
        .then((response) => handleResponse(response))
        .then((albums) => {
            localStorage.setItem("albums", JSON.stringify(albums));
            return albums;
        })
        .catch(handleError);
}
