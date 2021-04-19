export async function handleResponse(response) {
    if (response.ok) return response.json();
    if (response.status === 400) {
        const error = await response.json();
        throw new Error(error.message);
    }
    throw new Error("Network response was not ok.");
}

export function handleError(error) {
    console.error("API call failed. " + error);
    throw error;
}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
export function getCookie(name) {
    let matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : "";
}

export const auth = (headers) => {
    headers["Authorization"] = `Bearer ${getCookie("auth_token")}`;
    return headers;
};
