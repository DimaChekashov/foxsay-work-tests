const navbarToggle = document.querySelector(".header__toggle"),
    header = document.querySelector(".header"),
    body = document.querySelector("body");

navbarToggle.addEventListener("click", () => {
    header.classList.toggle("active");
    body.classList.toggle("scroll-hidden");
});

// popup
const popups = document.querySelectorAll(".popup"),
    overlay = document.querySelector("#overlay"),
    popupItems = document.querySelectorAll("[data-popup]");

const togglePopup = (popup) => {
    body.classList.remove("scroll-hidden");
    overlay.classList.remove("show");
    popup.classList.remove("open");
};

popups.forEach((popup) => {
    const closeBtn = document.querySelector(
        `#${popup.getAttribute("id")} .popup__close`
    );

    overlay.addEventListener("click", () => togglePopup(popup));
    closeBtn.addEventListener("click", () => togglePopup(popup));
});

popupItems.forEach((item) =>
    item.addEventListener("click", function () {
        elem = document.getElementById(item.getAttribute("data-popup"));

        if (elem) {
            body.classList.add("scroll-hidden");
            overlay.classList.add("show");
            elem.style.display = "block";
            setTimeout(() => elem.classList.add("open"), 0);
        }
    })
);
