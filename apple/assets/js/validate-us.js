/***
	Basic Validation Func
	***/
function validateField( f ) {
//	console.log( typeof f.validate )
	if( typeof f.validate != 'undefined' ) {
		//console.log(f.validate)
		//Required fields checks if value is not empty
		if( f.validate.required ) {
			//console.log( f )
			if( f.value.length == 0 ) {
				return {
					error: f.validate.required.error,
				}
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

    //Min
    if( f.validate.min ) {
      if( f.value.length < f.validate.min.treshold ) {
        return {
					error: f.validate.min.error,
				}
      }
    }

    //Max
    if( f.validate.max ) {
      if( f.value.length > f.validate.max.treshold ) {
        return {
					error: f.validate.max.error,
				}
      }
    }

		//Is
		if( f.validate.is ) {
			//in
			if( f.validate.is.in  ) {
				if( f.validate.is.in.indexOf( f.value ) < 0 ) {
					return {
						error: f.validate.is.in.error || f.validate.is.error,
					}
				}
			}
			//equal
			if( f.validate.is.equal  ) {
				if( f.validate.is.equal != f.value ) {
					return {
						error: f.validate.is.equal.error || f.validate.is.error,
					}
				}
			}
			//not
			if( f.validate.is.not  ) {
				if( f.validate.is.not == f.value ) {
					return {
						error: f.validate.is.not.error || f.validate.is.error,
					}
				}
			}
			//greaterThan
			if( f.validate.is.greaterThan  ) {
				if( f.validate.is.greaterThan >= f.value ) {
					return {
						error: f.validate.is.greaterThan.error || f.validate.is.error,
					}
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
	e.stopPropagation()
	var errors = []
	//console.log(f)
	for( var k in f.fields ) {

		if(  f.fields.hasOwnProperty( k )  ) {
			var $field = $( '[name=' + k + ']' )
		//	console.log(k, $(this) )
			var v = $field.val()
			f.fields[k].value = v
		//	console.log(f)
			var result = validateField(f.fields[k])
			//console.log(result)
			if( result !== true ) {
				if( typeof f.fields[k].onError == 'function' ) {
					f.fields[k].onSubmitError( $field, result )
				}
				else {
					window.onSubmitError( $field, result )
				}
				errors.push( {field: $field, error: result} )
			}
			else {
				if( typeof f.fields[k].onSuccess == 'function' ) {
					f.fields[k].onSuccess( $field )
				}
				else {
					window.onSuccess( $field )
				}
			}
		}
    // endfor
	}

  //
  if( errors.length == 0 ) {
    var $form = $( this )
    var form = forms.filter( function( form ) {
      console.log( form.id, $form )
      return form.id == $form.attr('id')
    } )
    if( form.length == 0 ) {
      console.log( 'No form set' )
      window.onFormSuccess( $(this) )
    }
    else {
      //
      if( typeof form[0].onFormSuccess == 'function' ) {
        form[0].onFormSuccess( $(this) )
      }
      else {
          window.onFormSuccess( $(this) )
      }
      //
    }
  }
	else {
		//console.log()
		if( typeof window.onFormError == 'function' ) {
			window.onFormError(errors)
		}
	}
}

function validateSingleField( e ) {
	//console.log(1)
	var field = e.data
	console.log(field)
	var $field = $( this )
	field.value = $field.val()
	var result = validateField( field )
	//console.log(result)
	if( result !== true ) {
		if( typeof field.onError == 'function' ) {
			field.onFieldError($field, result )
		}
		else {
			window.onFieldError($field, result )
		}
	}
	else {
		if( typeof field.onSuccess == 'function' ) {
			field.onSuccess( $field )
		}
		else {
			window.onSuccess( $field )
		}
	}
}

function validateUs( forms, c=false ) {
  //Handlers
  for( var i=0; i<forms.length; i++ ) {
  	$('#'+forms[i].id).on('submit', forms[i], validateForm );
  	for( var k in forms[i].fields ) {
  		//console.log($( '#'+forms[i].id ).find( '[data-field="' + k + '"]' ))
  		$( '[name=' + k + ']' ).on('keyup', forms[i].fields[k], validateSingleField )
  		$( '[name=' + k + ']').on('change', forms[i].fields[k], validateSingleField )
			try {
		    //Set placeholder
		    if( typeof forms[i].fields[k].placeholder != 'undefined' && forms[i].fields[k].placeholder.length > 0  ) {
		      $( '[name=' + k + ']').attr( 'placeholder', forms[i].fields[k].placeholder )
		    }
				if( !c || c.clearValues === false ) {
			    //Set value
			    if( typeof forms[i].fields[k].value != 'undefined' && forms[i].fields[k].value.length > 0  ) {
			      $( '[name=' + k + ']' ).val( forms[i].fields[k].value  )
			    }
				}
		  }
			catch(e) {
				console.log( forms[i].fields[k], k, e )
			}
  	}
  }
}
