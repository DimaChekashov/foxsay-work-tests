function select() {
    const selected = document.querySelector(".selected");
    const selectedText = document.querySelector(".selected span");
    const optionsContainer = document.querySelector(".options-container");

    const optionsList = document.querySelectorAll(".option");

    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
    });

    optionsList.forEach((o) => {
        o.addEventListener("click", () => {
            selectedText.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active");
        });
    });
}

function range() {
    const slider = document.getElementById("myRange");
    const output = document.querySelector(".range-text__value");

    output.innerHTML = slider.value + "%";

    slider.oninput = function () {
        output.innerHTML = this.value + "%";
    };
}

function burger() {
    const btn = document.querySelector(".header__btn");
    const nav = document.querySelector(".nav");

    btn.addEventListener("click", function () {
        this.classList.toggle("close");
        nav.classList.toggle("active");
    });
}

window.addEventListener("load", () => {
    select();
    range();
    burger();
});
