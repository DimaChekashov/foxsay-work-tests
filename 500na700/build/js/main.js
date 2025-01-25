const removeClasses = (elems, className) =>
    elems.forEach((elem) => elem.classList.remove(className));

function accordion() {
    const accordions = document.querySelectorAll(".faq__item");

    accordions.forEach((accordion) => {
        accordion.querySelector(".faq__item-content").style.maxHeight = `${
            accordion.querySelector(".faq__item-text").offsetHeight
        }px`;

        accordion.addEventListener("click", () => {
            if (accordion.classList.contains("active")) {
                accordion.classList.remove("active");
            } else {
                removeClasses(accordions, "active");
                accordion.classList.add("active");
            }
        });
    });
}

function menuList() {
    const lists = document.querySelectorAll(".nav__inner");

    lists.forEach(list => {
        list.addEventListener("mouseover", () => {
            list.parentNode.classList.add("active");
        });
        list.addEventListener("mouseout", () => {
            list.parentNode.classList.remove("active");
        });
    });
}

function menu() {
    const header = document.querySelector(".header");
    const body = document.querySelector("body");
    const overlay = document.querySelector(".overlay");

    window.onscroll = function () {
        if (window.pageYOffset > 50) {
            body.classList.add("body-padding-top");
            header.classList.add("fixed");
        } else {
            body.classList.remove("body-padding-top");
            header.classList.remove("fixed");
        }
    };

    [document.querySelector(".header__btn"), overlay].forEach((elem) =>
        elem.addEventListener("click", () => header.classList.toggle("active"))
    );
}

function sliders() {
    $("#main-slider").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        items: 1,
        dots: false,
        navText: ["", ""],
    });
    $("#news-slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 1,
        nav: false,
        dots: false,
    });
}

function inputs() {
    const phone = document.querySelector(".phone");
    const time = document.querySelector(".time");
    const date = document.querySelector(".date");

    const phoneMask = new Inputmask("+7 (999) 999-99-99");
    const dateMask = new Inputmask("99.99.9999");
    const timeMask = new Inputmask("99:99");

    phoneMask.mask(phone);
    dateMask.mask(date);
    timeMask.mask(time);
}

window.addEventListener("DOMContentLoaded", function () {
    sliders();
    accordion();
    menuList();
    menu();
    inputs();
});
