import "./vendor";
import "./helpers";
import "./components/social";
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

	inputs.forEach((input) =>
		input.addEventListener("input", () =>
			input.value
				? input.classList.add("fill")
				: input.classList.remove("fill")
		)
	);

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
}

// function arrowAnimate() {
// 	const arrow = document.querySelector("#graph-arr");

// 	arrow.style.transform = `translate(-50%, -88%) rotate(90deg)`;

// 	setTimeout(() => {
// 		arrow.style.transform = `translate(-50%, -88%) rotate(65deg)`;
// 		arrow.style.transition = `all 0.7s ease-in`;
// 	}, 700);
// }

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

document.addEventListener("DOMContentLoaded", () => {
	inputsWave();
	levelCounter();
	//arrowAnimate();
});
