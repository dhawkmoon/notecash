function validateField( f ) {
	if( typeof f.validate != 'undefined' ) {
		//Required fields checks if value is not emoty
		if( f.validate.required ) {
			if( f.value.length == 0 ) {
				return {
					error: f.validate.required.error,
				}
			}
		}
		else {
			if( f.value.length == 0 ) {
				return true
			}
		}
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
			//console.log(f.value )
			return f.validate.callback( f.value )
		}
		
		return true;
	}
	else {
		return true;
	}
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
			}
		},
		callback: function( v ) {
			if( v.length > 10 && v.length < 200 ) {
				return true
			}
			else {
				return 'Длина описания должна быть больше 10 и меньше 200 символов',
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
		},
	},
]