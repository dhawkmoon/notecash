/**
 * @description Appends Message with className to specified input
 * @param {String/DOM Element/jQuery Selector} input Targeted input
 * @param {String} text text of the message
 * @param {Sting} className class of message
 */

function appendMessage( input, text, className=false ){

	className ? className = ' '+className : className=''

	var message = '<span class="message'+className+'">'+text+'</span>'
	//
	if( $(input).is('select') ) {
		$(input).siblings('.chosen-container').after( message )
	}
	else {
		$(input).after( message )
	}
}

/**
 * @description Appends Error Message to specified input
 * @param {String/DOM Element/jQuery Selector} input Targeted input
 * @param {String} text text of the message
 */
function appendError( input, text )
{
	$(input).addClass('has-error')
	$(input).removeClass('has-success')
	appendMessage( input, text, 'message-error' )
}

/**
 * @description Appends Success Message to specified input
 * @param {String/DOM Element/jQuery Selector} input Targeted input
 * @param {String} text text of the message
 */
function appendSuccess( input, text )
{
	$(input).addClass('has-success')
	$(input).removeClass('has-error')
	appendMessage( input, text, 'message-success' )
}

/**
 * @description Removes any message from provided input
 * @param {String/DOM Element/jQuery Selector} input Targeted input
 */
function removeMessage( input )
{
	$(input).removeClass('has-success')
	$(input).removeClass('has-error')
	$(input).siblings('.message').remove()
}
