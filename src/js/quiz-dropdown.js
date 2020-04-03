import $ from 'jquery';

/***
	DROPDOWNS
					***/

$(document).ready(function($){

	var quizDropdown = {
		open: function(e) {
			e.preventDefault();
			$(this).addClass('quiz-dropdown--opened')
		},
		closeAll: function(e) {
			//e.preventDefault();
			e.stopPropagation()
			//console.log($(this), e.currentTarget)

			if( !$(e.currentTarget).hasClass('quiz-dropdown') && !$(e.currentTarget).hasClass('quiz-dropdown__current') && !$(e.currentTarget).hasClass('quiz-dropdown__item') ) {

				$('.quiz-dropdown--opened').removeClass('quiz-dropdown--opened')
			}
		},
		toggle: function(e) {
			e.preventDefault()
			e.stopPropagation()
			if( $(this).hasClass('quiz-dropdown--opened') ) {
				$(this).removeClass('quiz-dropdown--opened')
			}
			else {
				$(this).addClass('quiz-dropdown--opened')
			}
		},
		setVal: function(e) {
			$(this).parents('.quiz-dropdown').find('.quiz-dropdown__current').text( $(this).text() ).addClass('quiz-dropdown__current--not-empty')
			//$(this).data( 'value', $(this).text() )
			$(this).parents('.quiz-floating-label').find('input').val( $(this).text() )
			$(this).parents('.quiz-floating-label').find('input').trigger('change')
		}
	}

	$(document).on('click', '.quiz-dropdown', quizDropdown.toggle )

	$(document).on('click', '.quiz-dropdown__item', quizDropdown.setVal)
	$(window).on('click', quizDropdown.closeAll)
});
