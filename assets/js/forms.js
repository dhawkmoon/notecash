/***
	Basic Validation Func
	***/
function validateField( f ) {
//	console.log( typeof f.validate )
	if( typeof f.validate != 'undefined' ) {
		console.log(f.validate)
		//Required fields checks if value is not empty
		if( f.validate.required ) {
			if( f.value.length == 0 ) {
				return {
					error: f.validate.required.error,
				}
			}
		}
/*
		else {
			if( f.value.length == 0 ) {
				return true
			}
		}
*/
		//Pattern
		if( f.validate.pattern ) {
			if( !f.value.match( f.validate.pattern.reg ) ) {
				return {
					error: f.validate.pattern.error,
				}
			}
		}
		//Custom callback for validation
		if( f.validate.callback ) {
			
			return f.validate.callback( f.value )
		}
		
		return true;
	}
	else {
		return true;
	}
}
/***
	Form validation func
	***/
function validateForm( e ) {
	var f = e.data
	//console.log(f)
	e.preventDefault()
	var errors = []
	for( var k in f.fields ) {
		
		if(  f.fields.hasOwnProperty( k )  ) {
			var $field = $(this).find( '[data-field="' + k + '"]' )
		//	console.log(k, $(this) )
			var v = $field.val()
			f.fields[k].value = v
		//	console.log(f)
			var result = validateField(f.fields[k])
			//console.log(result)
			if( result !== true ) {
				if( typeof f.fields[k].onError == 'function' ) {
					f.fields[k].onSubmitError($field, result )
				}
				else { 
					onSubmitError($field, result )
				}
			}
			else {
				if( typeof f.fields[k].onSuccess == 'function' ) {
					f.fields[k].onSuccess( $field )
				}
				else { 
					onSuccess( $field )
				}
			}
		}
	}
	//
}

function validateSingleField( e ) {
	//console.log(1)
	var field = e.data
	//console.log(field)
	var $field = $( this )
	field.value = $field.val()
	var result = validateField( field )
	//console.log(result)
	if( result !== true ) {
		if( typeof field.onError == 'function' ) {
			field.onFieldError($field, result )
		}
		else { 
			onFieldError($field, result )
		}
	}
	else {
		if( typeof field.onSuccess == 'function' ) {
			field.onSuccess( $field )
		}
		else { 
			onSuccess( $field )
		}
	}
}
// field - input dom el, being validated
function onFieldError( field, result ) {
	$( field ).parent().addClass('has-error')
	$( field ).parent().removeClass('has-success')
}

function onSubmitError( field, result ) {
	$( field ).parent().addClass('has-error')
	$( field ).parent().removeClass('has-success')
	if( $( field ).parent().find('.error-text').length == 0 ) {
		$( field ).parent().append( '<span class="error-text">'+ result.error +'</span>' )
	}
}

function onSuccess( field ) {
	$( field ).parent().removeClass('has-error')
	$( field ).parent().addClass('has-success')
	$( field ).parent().find('.error-text').remove()
}

//start fields
var fields = {
	phone: {
		value: '',
		validate: {
			required: {
				error: 'Заполните поле телефон',
			},
			pattern: {
				reg: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
				error: 'Заполните поле телефон в правильном формате',
			}
		},
	},
	name: {
		value:'',
		validate: {
			required: {
				error: 'Заполните поле имя',
			},
			pattern: {
				reg: /[а-яА-Я\s]+/,
				error: 'В поле имени введены недопустимые символы',
			}
		}
	},
	description: {
		value: '',
		validate: {
			required: {
				error: 'Введите описание ноутбука',
			},
			callback: function( v ) {
				if( v.length > 10 && v.length < 200 ) {
					return true
				}
				else {
					return {error: 'Длина описания должна быть больше 10 и меньше 200 символов'}
				}
			}
		},
	},
	notebook: {
		value: '',
		validate: {
			required: {
				error: 'Укажите, пожалуйста, марку ноутбука'
			}
		}
	},
	photo: {
		value: '',
		validate: {
			required: {
				error: 'Укажите, пожалуйста, фото ноутбука'
			}
		}
	},
}
//end fields

var forms = [
	{
		id: 's1-form',
		fields: {
			phone: fields.phone,
		},
	},
	{
		id: 'modal-form-2',
		fields: {
			phone: fields.phone,
		},
	},
	{
		id: 'prefooter-form',
		fields: {
			phone: fields.phone,
		},
	},
	{
		id: 'modal-form',
		fields: {
			name: fields.name,
			phone: fields.phone,
			description: fields.description,
			notebook: fields.notebook,
			photo: fields.photo,
		},
	},
]
//Handlers
for( var i=0; i<forms.length; i++ ) {
	$('#'+forms[i].id).on('submit', forms[i], validateForm );
	for( var k in forms[i].fields ) {
		//console.log($( '#'+forms[i].id ).find( '[data-field="' + k + '"]' ))
		$( '#'+forms[i].id ).find( '[data-field="' + k + '"]' ).on('keyup', forms[i].fields[k], validateSingleField )
		$( '#'+forms[i].id ).find( '[data-field="' + k + '"]' ).on('change', forms[i].fields[k], validateSingleField )
	}
}

//Error text closd on click
$(document).on( 'click', '.error-text', function( e ) {
	$(this).remove()
} )