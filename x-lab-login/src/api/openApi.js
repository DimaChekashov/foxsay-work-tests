import { auth, handleError, handleResponse } from "./apiUtils";

const baseUrl = "https://agile-garden-50413.herokuapp.com/api/";

export function login(username, password) {
    return fetch(baseUrl + "token/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then((response) => handleResponse(response))
        .then((json) => {
            document.cookie = "auth_token=" + json.auth_token;
        })
        .catch(handleError);
}

export function logout() {
    return fetch(baseUrl + "token/logout/", {
        method: "POST",
        headers: auth({ "content-type": "application/json" }),
        credentials: "include",
    });
}

export function getUsers() {
    return new Promise((res, rej) => {
        const users = [];
        for (let i = 0; i < 10; i++) {
            users.push({
                id: i,
                username: "username-" + i,
                first_name: "first_name-" + i,
                last_name: "last_name-" + i,
                email: "email-" + i,
            });
            res(users);
        }
    }).then((users) => users);
}
