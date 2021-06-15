import "../../node_modules/popper.js/dist/popper.js";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";
import "../../node_modules/owl.carousel/dist/owl.carousel.js";

import "../scss/main.scss";
import "../index.pug";

function preloader() {
    let keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1,
    };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener)
            window.addEventListener("DOMMouseScroll", preventDefault, false);
        window.onwheel = preventDefault;
        window.onmousewheel = document.onmousewheel = preventDefault;
        window.ontouchmove = preventDefault;
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener("DOMMouseScroll", preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }
    disableScroll();

    let preloader = document.getElementById("preloader"),
        images = document.images,
        imagesTotalCount = images.length,
        imagesLoadedCount = 0;
    if (images.length == 0) {
        imageLoaded();
    }
    for (let i = 0; i < imagesTotalCount; i++) {
        let imageClone = new Image();
        imageClone.onload = imageLoaded;
        imageClone.onerror = imageLoaded;
        imageClone.src = images[i].src;
    }

    function imageLoaded() {
        imagesLoadedCount++;
        if (imagesLoadedCount >= imagesTotalCount) {
            preloader.classList.add("animate__animated");
            preloader.classList.add("animate__fadeOut");
            setTimeout(function () {
                enableScroll();
                preloader.parentNode.removeChild(preloader);
            }, 500);
        }
    }
}

function sliders() {
    $("#comment-slider").owlCarousel({
        loop: false,
        margin: 40,
        nav: true,
        navText: ["", ""],
        dots: true,
        items: 2,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
        },
    });
}

function burgerIcon() {
    $(".menu").on("click", function () {
        if ($(this).is(".active:not(.back)")) {
            $(this).addClass("back");
        } else if ($(this).is(".back")) {
            $(this).removeClass("back");
        } else {
            $(this).addClass("active");
        }
    });
}

function actions() {
    $(".item__full-btn").on("click", function (e) {
        $(this).parent().children(".comment__text").toggleClass("active");
    });
}

$(function () {
    preloader();
    sliders();
    burgerIcon();
    actions();
});
