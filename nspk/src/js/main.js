document.addEventListener("DOMContentLoaded", () => {
	$("#cases-slider").owlCarousel({
    loop: false,
    margin: 20,
    nav: false,
		dots: false,
    responsive:{
			0:{
				items: 1,
				autoWidth: true
			},
			729:{
				items: 2,
				autoWidth: true
			},
			1150:{
				items: 3
			}
    }
	});

	if (window.innerWidth < 729) {
		const advantageSlider = $(".advantages-items");
		advantageSlider.addClass("owl-carousel owl-theme");

		advantageSlider.owlCarousel({
			loop: false,
			margin: 20,
			nav: false,
			dots: false,
			items: 1,
			autoWidth: true
		});
	}
});