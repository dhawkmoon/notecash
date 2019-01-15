import $ from 'jquery';
import player from './player.js';

function getRoutesSlider()
{
	return import( './routes-slider.js' )
		.then(  function({default: routesSlider}) {
			console.log( routesSlider )
			return routesSlider
		} )
		.catch(error => 'An error occurred while loading the component');
}

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
	setTimeout( function(){getRoutesSlider()
		.then( function( slider ){
			console.log('===>',slider)
			slider.render()
		})}, 6000 )



}
