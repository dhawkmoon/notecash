<?php

	define( 'BASE_PATH', '/backend' );

	define( 'BASIC_FROM', 'info@notecash.ru' );

	define( 'BASIC_TO', 'dhawkmoon@mail.ru' );

	define( 'BASIC_SUBJECT', '++ [TEST] ++ Заказ ноутбука с сайта notecash.ru' );

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
		]
	);
