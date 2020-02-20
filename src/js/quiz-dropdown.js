import $ from 'jquery';

/***
	DROPDOWNS
					***/

$(document).ready(function($){

	var Quiz = function() {
		this.$steps = $('.quiz-step')

		this.state = {
			currentStep: 0,
		}

		this.setStep( i )
		{
			this.state.currentStep = i
			this.$steps.removeClass('.quiz-step--active')
			this.$steps.eq(i).addClass('.quiz-step--active')
		}
	}

	quiz = new Quiz()

	quiz.setStep(2)

});
