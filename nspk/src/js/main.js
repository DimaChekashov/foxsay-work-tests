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

	$(".advantages-items_mobile").owlCarousel({
		loop: false,
		margin: 20,
		nav: false,
		dots: false,
		items: 1,
		autoWidth: true
	});
});