<?php

	Class AmoCRM
	{

		static function auth()
		{

		//	$request = AmoCRM::loadCookies();

			//if( $request ) $auth =	$request->cookies->offsetGet( 'session_id' );
			//echo  $auth->flags['creation'] ;



		//	if( !$request || $auth->is_expired() ) {

				$data = json_encode( [
					'USER_LOGIN'	=> 	USER_LOGIN,
					'USER_HASH'		=> 	USER_HASH,
				] );


				$request = Requests::post( AMO_HOST . '/private/api/auth.php?type=json', ['Content-Type'=>'apllication/json'], $data );

				if( $request->status_code != 200 && $request->status_code != 204 ) {
					return http_errors( $request->status_code );
				}
				else {
					//AmoCRM::saveCookies( $request );
					return $request;
				}
			//}
		//	else return $request;
		}

		static function saveCookies( $cookies )
		{

			$h = fopen( TEMP_FILE, 'w+' );
			fwrite( $h, serialize( $cookies ) );
			fclose( $h );

		}

		static function loadCookies()
		{
			if( file_exists( TEMP_FILE ) && filesize( TEMP_FILE ) > 0 ) {

				$h = fopen( TEMP_FILE, 'r' );
				$cookies = fread( $h, filesize( TEMP_FILE ) );
				//print_r( $cookies );
				fclose($h);
				return unserialize( $cookies );
			}
			else return false;
		}

		static function getResponse( $request )
		{
			return json_decode( $request->body )->response;
		}

		static function getBody( $request )
		{
			return json_decode( $request->body );
		}

		static function getCookies( $request )
		{
			return $request->cookies;
		}

		static function getInfo( $fields='note_types,pipelines' )
		{
			$r = AmoCRM::auth();

			$cookies = AmoCRM::getCookies( $r );

			$response = AmoCRM::getResponse( $r );

			if( $response->auth ) {

				$result = Requests::get( AMO_HOST . '/api/v2/account?with=' . $fields, [], [ 'cookies' => $cookies ] );

				ob_start();

				print_r( AmoCRM::getBody( $result ) );

				return ob_get_clean();
			}
			else return false;

			//

		}

		static function addLead( $contact, $responsible_user, $cf=false, $add='' )
		{
			$r = AmoCRM::auth();
			$cookies = AmoCRM::getCookies( $r );
			$response = AmoCRM::getResponse( $r );

			//analytics
			$tags = Analytics::getLeadTags();

			if( $response->auth ) {
				$lead['add'] = [
					[
						'name' 				=> 'Обратный звонок #' . $contact['ID'] . $add,
						'responsible_user_id' => $responsible_user,
						'created_at' 	=>  time(),
						'status_id'		=>	PL_STATUS,
						'tags' 				=> $tags,
						'contacts_id' =>  [
							$contact['ID'],
						],
						'custom_fields' => $cf,
					],
				];
			//	print_r( $lead );
				//if( $cf ) $lead['add'][0]['custom_fields'] = $cf;



				$options = [
					'cookies' => $cookies,
				];

				$request = Requests::post( AMO_HOST . '/api/v2/leads', ['Content-Type'=>'apllication/json'], json_encode( $lead ), $options );

				$body = AmoCRM::getBody($request);

				return ['ID' => $body->_embedded->items[0]->id, 'link'=> $body->_embedded->items[0]->_links->self->href ];


			}
			else return false;
		}

		static function addContact( $phone, $responsible_user, $name='Имя не назначено' )
		{
			$r = AmoCRM::auth();
			$cookies = AmoCRM::getCookies( $r );
			$response = AmoCRM::getResponse( $r );

			if( $response->auth ) {

				$contact['add'] = [
					[
						'name' => $name,
						'responsible_user_id' => $responsible_user,
						'created_by' => $response->user->id,
						'created_at' => time(),
						'tags' => 'обратный звонок',
						'custom_fields' => [
							[
								'id' => CF_PHONE,
								'values' => [
									[
										'value' => $phone,
										'enum'  => 'MOB',
									],
								],
							],
						],
					],
				];

				$options = [
					'cookies' => $cookies,
				];

				$request = Requests::post( AMO_HOST . '/api/v2/contacts', ['Content-Type'=>'apllication/json'], json_encode( $contact ), $options );

				$body = AmoCRM::getBody($request);

				return ['ID' => $body->_embedded->items[0]->id, 'link'=> $body->_embedded->items[0]->_links->self->href ];
			}
			else return false;
		}

		static function addTask( $lead, $responsible_user )
		{
			$r = AmoCRM::auth();
			$cookies = AmoCRM::getCookies( $r );
			$response = AmoCRM::getResponse( $r );

			if( $response->auth ) {

				$task['add'] = [
					[
						'element_id' 		=> $lead['ID'],
						'element_type' 	=> 2,
						'task_type'			=> 1,
						'text'					=> 'Обработать заказ обратного звонка с сайта до ' . date( 'H:i d.m.Y', time() + 60 * 5 ),
						'responsible_user_id' => $responsible_user,
						'complete_till_at' => time() + 60 * 5,

					],
				];

				$options = [
					'cookies' => $cookies,
				];

				$request = Requests::post( AMO_HOST . '/api/v2/tasks', ['Content-Type'=>'apllication/json'], json_encode( $task ), $options );

				$body = AmoCRM::getBody($request);

				return ['ID' => $body->_embedded->items[0]->id, 'link'=> $body->_embedded->items[0]->_links->self->href ];
			}
			else return false;
		}

		static function handleCallback( $phone, $responsible_user, $name=false, $cf=false, $add='' )
		{
			if( $name )
				$contact = AmoCRM::addContact( $phone, $responsible_user, $name );
			else
				$contact = AmoCRM::addContact( $phone, $responsible_user );

			if( $contact ) {
				$lead = AmoCRM::addLead( $contact, $responsible_user, $cf, $add );

				if( $lead ) {
					$task = AmoCRM::addTask( $lead, $responsible_user );

					if( $task ) {
						return ['code'=>200,'body'=> 'Сделка успешно добавлена.'];
					}

				}


			}

			return ['code'=>403,'body'=>null];
		}

		static function getFieldId( $field )
		{
			$fields = [
				'Asus' => 472717,
        'Acer' => 472719,
        'Apple'=> 472721,
        'Dell' => 472723,
        'Lenovo'=>472725,
        'Samsung'=>472727,
        'HP'=>472729,
        'Sony'=>472731,
        'DNS'=>472733,
        'Toshiba'=>472735,
        'Packard Bell'=>472737,
				'Рабочий'=>472739,
	      'Нерабочий'=>472741,
	      'С дефектами'=>472743,
	      'Новый'=>472745,
	      'Medion' => 895505,
	      'MSI'=>895503,
	      'Emachines'=>895509,
	      'Fyujitsu-siemens'=>895507,
			];
			return $fields[$field];
		}

		static function loadManager()
		{
			if( file_exists( MANAGERS_FILE ) ) {

				$h = fopen( MANAGERS_FILE, 'r' );
				$r = fread( $h, filesize( MANAGERS_FILE ) );

				fclose($h);
				return unserialize( $r );
			}
			else return false;
		}

		static function saveManager( $manager )
		{

			$h = fopen( MANAGERS_FILE, 'w+' );
			fwrite( $h, serialize( $manager ) );
			fclose( $h );

		}

		static function getManager()
		{
			$manager = AmoCRM::loadManager();
			if( $manager ) {
				return $manager;
			}
			else {
				return 0;
			}
		}

	}
