function notify( obj ) {
	this.template = '<div class="notify-message %type%">'+
		'<div class="notify-icon"><i class="%icon%"></i></div>'+
		'<div class="notify-heading">%heading%</div><div class="notify-text">%text%</div>'+
		'<div class="clearfix"></div>'+
		'<div class="notify-closer">&times;</div>'+
		'</div>'



	this.hide = function()
	{
		$(this).fadeOut(400, function(){
			$(this).remove()
		})
	}

	this.afterAppend = function( el )
	{
		$(el).find( '.notify-closer' ).on( 'click', this.hide.bind(el) )
		//setTimeout
		if( el.time == -1 ) {
			return false;
		}
		else {
			el.timer = setTimeout( this.hide.bind(el), el.time )
			console.log(el.time)
			$(el).on( 'mouseenter', function() {

				clearTimeout( el.timer )
			} )

			$(el).on( 'mouseleave', this, function(e) {
				el.timer = setTimeout( e.data.hide.bind(el), el.time )
			} )
		}
	}

	this.getWrapper = function( obj )
	{
		var wrapper = $( '.notify-wrapper.'+obj.position )
		if( wrapper.length > 0 ) return wrapper
		else {
			wrapper = document.createElement( 'div' )
			wrapper.className = 'notify-wrapper '+obj.position
			$('body').append(wrapper)
			return $(wrapper)
		}
	}

	this.render = function( obj, cb )
	{

		 var message = this.template
		 for( k in obj ) {
			 message = message.replace( '%'+k+'%', obj[k] )
		 }
		 var el = document.createElement( 'div' )
		 el.innerHTML = message
		 el.time = obj.time || 1000

		 var $wrapper = this.getWrapper(obj)
		 $wrapper.append( el )
		 this.afterAppend( el )

	}

	this.render( obj )

}
