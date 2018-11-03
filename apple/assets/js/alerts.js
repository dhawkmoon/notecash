/*
 * Alerts for error and success messages
 *
 * 01 Error Alert
 * Call notify message with error styles
 */
function errorAlert( text, heading='Возникла ошибка', t=3000 )
{
	notify( {
			type: 'bg-danger',
			position: 'bottom-center',
			heading: heading,
			text: text,
			time: t,
			icon: 'icon-cancel',
		} )
}

 /*
	* 02 Success Alert
	* Call notify message with sussess styles
	*/
	function successAlert( text, heading='Действие выполнено успешно', t=3000 )
	{
	 notify( {
			 type: 'bg-success',
			 position: 'bottom-center',
			 heading: heading,
			 text: text,
			 time: t,
			 icon: 'icon-ok',
		 } )
	}
