const KEY_USERNAME = "username";

export const getLoggedUsername = () => localStorage.getItem(KEY_USERNAME);

export const setLoggedUsername = (username) => {
    localStorage.setItem(KEY_USERNAME, username);
};

export const clearStore = () => {
    localStorage.clear();
};
