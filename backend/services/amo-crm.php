<?php 
	
	Class AmoCRM
	{
		
		static function auth( $login, $key )
		{
			
			$data = json_encode( [
				'USER_LOGIN'=>'spriggun140493@gmail.com',
				'USER_HASH'=>'442b3f31feac244d4df83494ffcc74af',
			] );
			
			return Requests::post( 'https://notelab.amocrm.ru/private/api/auth.php?type=json', ['Content-Type'=>'apllication/json'], $data );
			
		}
		
		static function addLead( $lead )
		{
			
		}
	}