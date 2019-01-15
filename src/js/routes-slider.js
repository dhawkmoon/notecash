import $ from 'jquery';
import Swiper from 'swiper';

function RoutesSlider()
{
	this.render = function()
	{
		$('#routes-slider-container').load('/routes-slider.html #planshet-video', function() {
			this.init()
		}.bind(this))
	}

	this.init = function()
	{
		$('.route__step>a').click( function(e){e.preventDefault;} )
		var routesSlider = new Swiper ('#routes-slider', {

				slidesPerView:1,
				//spaceBetween: 51,
		    // If we need pagination
		    pagination: {
		      el: '#mobile-routes-pagination',
		      clickable: true,
		    },
				//slideClass: 'note-books-slide',
		    // Navigation arrows
				navigation: {
					nextEl: '#route-slider-arrow-right',
					prevEl: '#route-slider-arrow-left',
				},

		  })

		routesSlider.on( 'slideChange', function(){
			console.log(this.activeIndex)
			var n = this.activeIndex+1
			console.log(n)

			$('.route-slide').removeClass('route-slide--active')
			$('.route-slide:nth-child('+n+')').addClass('route-slide--active')
		} )

		//Change slide on tap
		$('.route-slide-next').on( 'click', function(e){
			e.preventDefault();
			routesSlider.slideNext()

		} )

		$('.route-slide-prev').on( 'click', function(e){
			e.preventDefault();
			routesSlider.slidePrev()

		} )
	}

	return this;
}

module.exports = (new RoutesSlider)
