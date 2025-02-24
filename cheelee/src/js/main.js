function customSelect() {
    const select = document.querySelector(".custom-select");
    const trigger = select.querySelector(".select-trigger");
    const options = select.querySelectorAll(".option");
    const hiddenInput = select.querySelector("#selected-value");
    
    trigger.addEventListener("click", () => {
        select.classList.toggle("active");
    });
    
    options.forEach(option => {
        option.addEventListener("click", () => {
        trigger.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;
        select.classList.remove("active");
        });
    });
    
    document.addEventListener("click", (e) => {
        if (!select.contains(e.target)) {
        select.classList.remove("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    customSelect();
});