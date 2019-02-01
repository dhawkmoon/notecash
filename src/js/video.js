import $ from 'jquery';
import player from './player.js';

function getRoutesSlider()
{
	return import( './routes-slider.js' )
		.then(  function({default: routesSlider}) {
		//	console.log( routesSlider )
			return routesSlider
		} )
		.catch(error => 'An error occurred while loading the component');
}

/*** VIDEO ***/
if( $(window).width() > 640 ) {

	// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	window.onYouTubeIframeAPIReady = function() {
		//console.log('I\'am ready')
    player.player = new window.YT.Player('player', {
      height: '365',
      width: '508',
      videoId: '0E9TOPqcttg',
      events: {
        'onReady': player.onPlayerReady.bind(player),
        'onStateChange': player.initTimer.bind(player)
      }
    });
  }

  player.init()

}//end if
else {
	setTimeout( function(){getRoutesSlider()
		.then( function( slider ){
			//console.log('===>',slider)
			slider.render()
		})}, 6000 )



}
