import "./vendor";
import "./helpers";
import "./components/social";
import "./vendor/vanilla-tilt";
import { ieFix } from "./vendor/ie-fix";
import { vhFix } from "./vendor/vh-fix";
import { actualYear } from "./modules/actualYear";
import lazyLoading from "./modules/lazyLoading";
import scrollToAnchor from "./modules/scrollToAnchor";

ieFix();
vhFix();
actualYear();
scrollToAnchor.init();
lazyLoading.init();

function inputsWave() {
	const inputs = document.querySelectorAll(".blank__input");
	const labels = document.querySelectorAll(".form-control label");

	labels.forEach((label) => {
		label.innerHTML = label.innerHTML
			.split("")
			.reduce(
				(accumulator, currentValue, i) =>
					accumulator +
					`<span style="transition-delay: ${
						i * 20
					}ms">${currentValue}</span>`,
				""
			);
	});

	inputs.forEach((input) => {
		input.addEventListener("input", () =>
			input.value
				? input.classList.add("fill")
				: input.classList.remove("fill")
		);
		setTimeout(() => inputAutofill(input), 500);
	});
}

function inputAutofill(input) {
	input.classList.add("fill");
	input.value = "";
	input
		.getAttribute("data-input")
		.split("")
		.forEach((word, i) => {
			setTimeout(() => (input.value += word), (i + 1) * 100);
		});
	input.style.width = `100%`;
}

function levelCounter() {
	const counter = document.querySelector("#level-counter");
	counter.innerText = "0";

	const updateCounter = () => {
		const target = +counter.getAttribute("data-target");
		const c = +counter.innerText;

		const increment = target / 200;

		if (c < target) {
			counter.innerText = `${Math.ceil(c + increment)}`;
			setTimeout(updateCounter, 17);
		} else {
			counter.innerText = target;
		}
	};

	updateCounter();
}

function autoCheckbox() {
	const checkboxes = document.querySelectorAll(
		".blank-checkbox input[checked-data]"
	);
	checkboxes.forEach((checkbox, i) => {
		setTimeout(() => (checkbox.checked = true), i * 150);
	});
}

function avatarTilt() {
	VanillaTilt.init(document.querySelectorAll(".blank__avatar"), {
		max: 25,
		speed: 400,
		glare: true,
		"max-glare": 0.5,
	});
}

document.addEventListener("DOMContentLoaded", () => {
	inputsWave();
	levelCounter();
	autoCheckbox();
	avatarTilt();
});
