export const getDate = (seconds: number) => {
    return new Date(seconds).toLocaleString(
        "ru-RU",
        {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }
    );
}