document.addEventListener("DOMContentLoaded", () => {
	$('#cases-slider').owlCarousel({
    loop: false,
    margin: 20,
    nav: false,
		dots: false,
    responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1200:{
				items:3
			}
    }
	})
});