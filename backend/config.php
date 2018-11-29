<?php

	define( 'BASE_PATH', '/backend' );

	define( 'BASIC_FROM', 'info@notecash.ru' );

	define( 'BASIC_TO', 'lihaletov.dm@gmail.com' );

	define( 'BASIC_SUBJECT', 'Заказ ноутбука с сайта notecash.ru' );

	define( 'BASIC_UPLOAD_SIZE', 1024*1024*3 );

	define( 'FORM_FIELDS',
		[
			'phone-top'       =>   [
				'name'    => 'phone',
				'pattern' => '/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/',
			],
			'modal-2-phone'   =>   [
				'name'    => 'phone',
				'pattern' => '/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/',
			],
			'modal-phone'   =>   [
				'name'    => 'phone',
				'pattern' => '/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/',
			],
			'phone-bottom'    =>   [
				'name'    => 'phone',
				'pattern' => '/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/',
			],
			'modal-name'			=>   [
					'name'		=> 'name',
					'pattern'	=> '/^(.){10,60}$/i',
			],
			'modal-2-name'			=>   [
					'name'		=> 'name',
					'pattern'	=> '/^(.){10,60}$/i',
			],
			'modal-note'			=>	 [
					'name'		=>	'note',
					'pattern'	=>	'/^(Asus|Acer|Apple|Lenovo|Samsung|Sony|HP|Packard Bell|Dell|Toshiba|MSI|DNS|Medion|Fyjitsu-siemenes|Emachines)+$/',
			],
			'modal-state'			=>	 [
					'name'		=>	'state',
					'pattern'	=>	'/^(Рабочий|Нерабочий|С дефектами|Новый)+$/',
			],
			'modal-model'			=>   [
					'name'		=> 'model',
					'pattern'	=> '/^(.){4,50}$/i',
			],
			'modal-photo'			=>	[
					'name'		=> 'photo',
					'pattern'	=> '/(.)*/',
			],
			'modal-2-photo'			=>	[
					'name'		=> 'photo',
					'pattern'	=> '/(.)*/',
			],
			'modal-details'			=>	[
					'name'		=> 'description',
					'pattern'	=> '/^(.){20,300}$/i',
			],
			'modal-2-details'			=>	[
					'name'		=> 'description',
					'pattern'	=> '/^(.){20,300}$/i',
			],
			'modal-type'			=>	[
					'name'		=> 'type',
					'pattern'	=> '/^(По телефону|SMS)+$/',
			],
			'modal-form__phone'   =>   [
				'name'    => 'phone',
				'pattern' => '/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/',
			],
			'top-form__phone'   =>   [
				'name'    => 'phone',
				'pattern' => '/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/',
			],
			'top-form__year'   =>   [
				'name'    => 'year',
				'pattern' => '/^(2010|2011|2012|2013|2014|2015|2016|2017|2018)$/',
			],
			'top-form__model'  =>   [
				'name'    => 'model',
				'pattern' => '/^(MacBook Air|MacBook Pro)$/',
			],
		]
	);
	
	/**
	 * Amo CRM integration options
	 */
	 
	define( 'AMO_HOST', 'https://notelab.amocrm.ru' );
	
	define( 'USER_LOGIN', 'spriggun140493@gmail.com' );
	
	define( 'USER_HASH', '11e6a551ad972ecd6796bf9325080fc54e7c7409' );
	
	define( 'CF_PHONE', 226253 );
	
	define( 'CF_EMAIL', 226255 );
	
	define( 'CF_BRAND', 234025 );
	
	define( 'CF_MODEL', 234027 );
	
	define( 'CF_STATE', 234029 );
	
	define( 'PL_STATUS', 17301367 );
	
	//define( 'CREATED_BY_USER', 1995433 );
	//1995433 - Artyom
	//1995451 - Viktor
	//2186452 - Ilya
	//2186464 - Maksim

	define( 'MANAGERS', [
		//[
		//	'id' => 2186452,
		//	'email' => 'Deimos199501@gmail.com',
		//],
		//[
		//	'id' => 2186452,
		//	'email' => 'Deimos199501@gmail.com',
		//],
		[
			'id' => 1995433,
			'email' => 'spriggun140493@gmail.com',
			//'email' => 'hawkguitar@gmail.com',
		],
		[
			'id' => 1995433,
			'email' => 'spriggun140493@gmail.com',
			//'email' => 'hawkguitar@gmail.com',
		],
	]);

	define( 'TEMP_FILE', dirname( __FILE__ ) . '/temp/cookies' );
	
	define( 'MANAGERS_FILE', dirname( __FILE__ ) . '/temp/managers' );
	
	define( 'BAD_PHONES', [
	    '+7 (000) 000-00-00',
	    '+7 (111) 111-11-11',
	    '+7 (222) 222-22-22',
	    '+7 (333) 333-33-33',
	    '+7 (444) 444-44-44',
	    '+7 (555) 555-55-55',
	    '+7 (666) 666-66-66',
	    '+7 (777) 777-77-77',
	    '+7 (888) 888-88-88',
	    '+7 (999) 999-99-99',
	    ] );
	    
	define( 'ALLOWED_CODES', '/^\+7 \((495|499|900|901|902|903|904|905|906|908|909|910|911|912|913|914|915|916|917|918|919|920|921|922|923|924|925|926|927|928|929|930|931|932|933|934|935|936|937|938|939|950|951|952|953|958|960|961|962|963|964|965|966|967|968|969|977|978|980|981|982|985|986|996|999)\)/' );
