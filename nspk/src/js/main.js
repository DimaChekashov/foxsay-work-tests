document.addEventListener("DOMContentLoaded", () => {
	$('#cases-slider').owlCarousel({
    loop: false,
    margin: 20,
    nav: false,
		dots: false,
    responsive:{
			0:{
				items: 1
			},
			729:{
				items: 2,
				autoWidth: true
			},
			1150:{
				items: 3
			}
    }
	})
});