import $ from 'jquery';

var Player = function()
{

	this.initLabels = function()
	{
		this.labels = [
			{
				time: 0, //seconds
				element: $('.route__step:nth-child(1)'),
			},
			{
				time: 28, //seconds
				element: $('.route__step:nth-child(2)'),
			},
			{
				time: 45, //seconds
				element: $('.route__step:nth-child(3)'),
			},
			{
				time: 75, //seconds
				element: $('.route__step:nth-child(4)'),
			},
			{
				time: 105, //seconds
				element: $('.route__step:nth-child(5)'),
			},
		]
		//Sets handlers for click - video seeking
		for( var i = 0; i < this.labels.length; i++ ) {

			//console.log(labels[i])

			this.labels[i].element.on( 'click', this.labels[i].time, function( e ) {

				this.player.seekTo( e.data )

			}.bind(this) )

		}

	}


	this.initTimer = function( e )
	{
		//console.log(timer)
		if( e.data == 1 ) {
			$('.route__step--active a').removeClass('paused')
			this.timer = setInterval( function(){
				this.switchLabels( this.player.getCurrentTime() )
			}.bind( this ), 300 )
		}
		else {
			if( e.data == 2 ) {
				$('.route__step--active a').addClass('paused')
			}
			clearInterval( this.timer )
		}
	}

	this.switchLabels = function( time ) {
		//
		for( var t = this.labels.length-1; t >= 0; t-- ) {

			if( t == this.labels.length-1 && time >= this.labels[t].time ) {
				//console.log('last')
				if( this.currentLabel != this.labels.indexOf( this.labels[t] ) ) {
					this.currentLabel = this.labels.indexOf( this.labels[t] )
					this.labels[t].element.find( 'a' ).trigger('reached')
				}

			}
			else if( typeof this.labels[t+1] != 'undefined' && time >= this.labels[t].time && time < this.labels[t+1].time ) {
				//console.log('middle:' + labels[t].time)
				if( this.currentLabel != this.labels.indexOf( this.labels[t] ) ) {
					this.currentLabel = this.labels.indexOf( this.labels[t] )
					this.labels[t].element.find( 'a' ).trigger('reached')
				}
			}
		}
		//
	}


	this.initHandlers = function(e)
	{
		//Click events - visual changes
		$('.route__step a').on('click', function(e){

			e.preventDefault();

			$(e.currentTarget).parent().trigger('mouseenter')

			$('.route__step').removeClass('route__step--active')
			$('.sep-vert').removeClass('sep-vert--transform')
			$(e.currentTarget).parent().prev().find('.sep-vert').addClass('sep-vert--transform')

			var i = $(e.currentTarget).attr('href')

			this.labels[i].element.addClass('route__step--active')


		}.bind(this))

		$('.route__step a').on('reached', function(e){

			e.preventDefault();

			$(e.currentTarget).parent().trigger('mouseenter')

			$('.route__step').removeClass('route__step--active')
			$('.sep-vert').removeClass('sep-vert--transform')
			$(e.currentTarget).parent().prev().find('.sep-vert').addClass('sep-vert--transform')

			var i = $(e.currentTarget).attr('href')

			this.labels[i].element.addClass('route__step--active')


		}.bind(this))
	}

	this.onPlayerReady = function(event) {
    //timerInit()
  }

  this.stopVideo = function() {
    this.player.stopVideo();
  }

	this.init = function()
	{
		this.timer = '';
		this.labels = [];
		this.initLabels()
		//this.initTimer()
		this.initHandlers()
	}

}

module.exports = (new Player);
