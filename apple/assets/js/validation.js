var fields = {

	//Телефон
	phone: {
 	 value: '',
 	 validate: {
 		 required: {
 			 error: 'Это поле обязательно для заполнения',
 		 },
 		 pattern: {
 			 reg: /^\+7\s?\(\d\d\d\)\s?\d\d\d\-\d\d\-\d\d$/g,
 			 error: 'Введите телефон в формате +7(xxx)xx-xx-xx',
 		 },
 	 },
  },
	//Год выпуска
	year: {
		value: '',
		validate: {
			required: {
  			 error: 'Это поле обязательно для заполнения',
  		 },
			 is: {
				 in: ['2010','2011','2012','2013','2014','2015','2016','2017','2018'],
				 error: 'Введено неверное значение.',
			 },
		}
	},
	//Модель
	model: {
		value: '',
		validate: {
			required: {
  			 error: 'Это поле обязательно для заполнения',
  		 },
			 is: {
				 in: ['MacBook Pro','MacBook Air'],
				 error: 'Введено неверное значение.',
			 },
		}
	},

}

var forms = [
	{
		id: 'top-form',
		fields: {
			'top-form__model': fields.model,
			'top-form__phone': fields.phone,
			'top-form__year' : fields.year,
		}
	},

	{
		id: 'modal-form',
		fields: {
			'modal-form__phone': fields.phone,
		}
	},

]

var onFieldError = function( field, result )
{
	removeMessage( field )
	appendError( field, result.error )
}

var onSuccess = function( field )
{
	removeMessage( field )
	appendSuccess( field, '' )
}

var onSubmitError = function( field, result )
{
	removeMessage( field )
	appendError( field, result.error )
}

var onFormError   = function( errors )
{
	errors[0].field.focus()
	throw errors[0].error
}

var onFormSuccess = function( form )
{
	form.find('button').prop( 'disabled', true )
	var data = form.serialize()
	console.log(data)
	$('body').addClass('is-loading')
	$.ajax({
		url: 'http://notecash.ru/backend/detailed-mac',
		method: 'POST',
		data: data,
		success: function(r) {
			console.log(r)


			setTimeout(function(){
				form.find('button').prop( 'disabled', false )
				successAlert( r, 'Успех', 3000  )
				$('body').removeClass('is-loading')
			}, 1000)
		},
		error: function(r) {
			//console.log(r)


			setTimeout(function(){
				form.find('button').prop( 'disabled', false )
				errorAlert( r.responseText, 'Ошибка', 3000  )
				$('body').removeClass('is-loading')
			}, 1000)
		},
	})
}

validateUs( forms )
