import $ from 'jquery';

/***
	DROPDOWNS
					***/

$(document).ready(function($){

	var dropdown = {
		open: function(e) {
			e.preventDefault();
			$(this).addClass('m-dropdown--opened')
		},
		closeAll: function(e) {
			//e.preventDefault();
			e.stopPropagation()
			//console.log($(this), e.currentTarget)

			if( !$(e.currentTarget).hasClass('m-dropdown') && !$(e.currentTarget).hasClass('m-dropdown__current') && !$(e.currentTarget).hasClass('m-dropdown__item') ) {

				$('.m-dropdown--opened').removeClass('m-dropdown--opened')
			}
		},
		toggle: function(e) {
			e.preventDefault()
			e.stopPropagation()
			if( $(this).hasClass('m-dropdown--opened') ) {
				$(this).removeClass('m-dropdown--opened')
			}
			else {
				$(this).addClass('m-dropdown--opened')
			}
		},
		setVal: function(e) {
			$(this).parents('.m-dropdown').find('.m-dropdown__current').text( $(this).text() ).addClass('m-dropdown__current--not-empty')
			//$(this).data( 'value', $(this).text() )
			$(this).parents('.floating-label').find('input').val( $(this).text() )
			$(this).parents('.floating-label').find('input').trigger('change')
		}
	}

	$(document).on('click', '.m-dropdown', dropdown.toggle )

	$(document).on('click', '.m-dropdown__item', dropdown.setVal)
	$(window).on('click', dropdown.closeAll)
});
