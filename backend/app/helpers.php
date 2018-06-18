<?php

  function validateFormFields( array $fields ):array
  {
    $result = [];
    foreach ( $fields as $key => $field ) {
      if(  isset( $_POST[$key] ) && preg_match( $field['pattern'], $_POST[$key] )  ) {
        $result[ $field['name'] ] = $_POST[$key] ;
      }
    }
    return $result;
  }
  
  /*
   * Filters phone numbers, that are scum
   */
  function isBadPhone( string $field )
  {
  
    return ( array_search( $field, BAD_PHONES ) !== false || !preg_match( ALLOWED_CODES, $field ) ); 
  }
  
  /*
   * Validate if file path is real image
   */
  function is_image( string $path ):bool
  {
    $a = getimagesize($path);
    $image_type = $a[2];

    if( in_array( $image_type , array( IMAGETYPE_GIF , IMAGETYPE_JPEG ,IMAGETYPE_PNG , IMAGETYPE_BMP) ) )
    {
      return true;
    }
    return false;
  }

	function http_errors( int $code )
	{
		$errors = [
		  301 => 'Moved permanently',
		  400 => 'Bad request',
		  401 => 'Unauthorized',
		  403 => 'Forbidden',
		  404 => 'Not found',
		  500 => 'Internal server error',
		  502 => 'Bad gateway',
		  503 => 'Service unavailable'
		];
		
		return isset( $errors[$code] ) ? $errors[$code] : 'Unknown http error';
		
	}
