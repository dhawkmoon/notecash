import $ from 'jquery';
import player from './player.js';
import Swiper from 'swiper';

/*** VIDEO ***/
if( $(window).width() > 640 ) {


	window.onYouTubeIframeAPIReady = function() {
		console.log('I\'am ready')
    player.player = new window.YT.Player('player', {
      height: '365',
      width: '508',
      videoId: '0E9TOPqcttg',
      events: {
        'onReady': player.onPlayerReady.bind(this),
        'onStateChange': player.initTimer.bind(this)
      }
    });
  }

  player.init()

}//end if
else {
	console.log('yeeeah')
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
