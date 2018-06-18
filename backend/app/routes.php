<?php

	$routes = [
		[
			'method' 		=> 'GET',
			'uri'		 		=> '/',
			'callback' 	=> function(){
				return ['code'=>200, 'body'=>'Hello, world!'];
			}
		],
		[
		    'method'  => 'GET',
		    'uri'     => '/test/[*:phone]',
		    'callback' => function( $phone ){
		        //$phone = '(925) 571-12-27';
		        $phone = '+7 '. str_replace( ')', ') ', $phone );
		        if( isBadPhone( $phone ) ) {
		            echo '<span style="color:red;">' .$phone . ' is very bad! </span>';
		        }
		        else {
		            echo '<span style="color:green;">' . $phone . ' is good.</span>';
		        }
		        echo '<hr><br /> Row row, fight da power! ';
		    }
		],
		[
			'method'	 	=> 'GET',
			'uri'				=>  '/amo',
			'callback'	=>	function() {
				
				
				
				return [ 'code'=>200,'body'=>AmoCRM::getInfo( 'custom_fields' )];
				
				$contact = AmoCRM::addContact( '+7 916 570 13 17' );
				
				if( $contact ) {
					$lead = AmoCRM::addLead( $contact );
					
					if( $lead ) {
						$task = AmoCRM::addTask( $lead );
						
						if( $task ) {
							return ['code'=>200,'body'=> 'Сделка успешно добавлена.'];	
						}
						
					}
					
					
				}
				
				return ['code'=>403,'body'=>null];
				
			}
		],
		[
			'method'		=> 'POST',
			'uri'				=> '/send',
			'callback'	=> function() {

				$fields = validateFormFields( FORM_FIELDS );
				
                if( isBadPhone( $fields['phone'] ) ) { //filter BAD and SCUM phones
                    return ['code'=> 403, 'body' => 'К сожалению, введенный Вами номер телефона содержит неправильный код* оператора.<span style="font-size: 13px; display: block !important; border-top: 1px dashed #3f7592; padding-top: 5px; margin-top: 5px;">* Если Ваш телефон содержит действующий код оператора, но Вы видите данное сообщение, свяжитесь с нами по телефону +7 (495) 477-96-83</span>.'];
                }
				if( count( $fields ) > 0 ) {
					
					$manager = AmoCRM::getManager();
					
					//Amo
					AmoCRM::handleCallback( $fields['phone'], MANAGERS[$manager]['id'] );
					
					if( $manager == 0 ) {
						AmoCRM::saveManager(1);
					}
					else {
						AmoCRM::saveManager(0);
					}
					
					$tmpl = TemplateService::load( 'mails/phone.tpl' );
					$tmpl = TemplateService::replace( $tmpl, ['phone' => $fields['phone'] ] );

					$mail = MailService::createMail( BASIC_FROM, MANAGERS[$manager]['email'], BASIC_SUBJECT, $tmpl  );
					//echo $m
					$mail->send();
					
					$mail2 = MailService::createMail( BASIC_FROM, BASIC_TO, BASIC_SUBJECT, $tmpl  );
					
					$mail2->send();
					
					return ['code' => 200, 'body' => 'Спасибо, Ваше сообщение успешно отправлено.'];
				}
				else {
					return ['code'=> 200, 'body' => 'К сожалению, данные некорректны!'];
				}
				//
			}
		],
		[
			'method'		=> 'POST',
			'uri'				=> '/detailed',
			'callback'	=> function() {

				$fields = validateFormFields( FORM_FIELDS );
				// print_r( $_POST );
				// print_r( $fields );

				if( count( $fields ) > 0 ) {

					$matches = [
						'phone' 			=> $fields['phone'],
						'name'				=> $fields['name'],
						'note'				=> $fields['note'],
						'description' => $fields['description'],
						'type'				=> $fields['type'],
						'model'				=> $fields['model'],
						'state'				=> $fields['state'],
					];
					
					//AMO
					$cf = [
						[
							'id' 			=> CF_BRAND,
							'values' 	=>	[
								[
									'value'=> AmoCRM::getFieldId( $fields['note'] ),
									'enum' => $fields['note'],
								],
							],
						],
						[
							'id'			=> CF_STATE,
							'values'	=>	[ 
								[
									'value' => AmoCRM::getFieldId( $fields['state'] ),
									'enum'	=> $fields['state'],
								],
							],
						],
						[
							'id'			=> CF_MODEL,
							'values'	=> [
								[
									'value' => $fields['model']
								],
							],
						],
					];
					
					$manager = AmoCRM::getManager();
					//print_r( MANAGERS[$manager] );die();
					AmoCRM::handleCallback( $fields['phone'], MANAGERS[$manager]['id'], $fields['name'], $cf );
					
					if( $manager == 0 ) {
						AmoCRM::saveManager(1);
					}
					else {
						AmoCRM::saveManager(0);
					}
					
					$tmpl = TemplateService::load( 'mails/detailed.tpl' );
					$tmpl = TemplateService::replace( $tmpl, $matches );

					$mail = MailService::createMail( BASIC_FROM, MANAGERS[$manager]['email'], BASIC_SUBJECT, $tmpl );

					if(
						isset( $_FILES['modal-photo'] ) &&
						is_image( $_FILES['modal-photo']['tmp_name'] ) &&
						$_FILES['modal-photo']['size'] <= BASIC_UPLOAD_SIZE
					) {
						$mail->addAttachment( $_FILES['modal-photo']['tmp_name'], $_FILES['modal-photo']['name'] );
					}

					$mail->send();
					
					
					$mail2 = MailService::createMail( BASIC_FROM, BASIC_TO, BASIC_SUBJECT, $tmpl  );
					
					if(
						isset( $_FILES['modal-photo'] ) &&
						is_image( $_FILES['modal-photo']['tmp_name'] ) &&
						$_FILES['modal-photo']['size'] <= BASIC_UPLOAD_SIZE
					) {
						$mail2->addAttachment( $_FILES['modal-photo']['tmp_name'], $_FILES['modal-photo']['name'] );
					}
					
					$mail2->send();
					
					return ['code' => 200, 'body' => 'Спасибо, Ваше сообщение успешно отправлено.'];
				}
				else {
					return ['code'=> 200, 'body' => 'К сожалению, данные некорректны!'];
				}

			}
		],
		[
			'method'		=> 'POST',
			'uri'				=> '/testimonials',
			'callback'	=> function() {

				$fields = validateFormFields( FORM_FIELDS );
				// print_r( $_POST );
				// print_r( $fields );

				if( count( $fields ) > 0 ) {

					$matches = [
						'name'	=> $fields['name'],
						'description' => $fields['description'],
					];

					$tmpl = TemplateService::load( 'mails/testimonials.tpl' );
					$tmpl = TemplateService::replace( $tmpl, $matches );

					$mail = MailService::createMail( BASIC_FROM, BASIC_TO, '++ [TEST] ++ Добавлен новый отзыв на модерацию на сайте notecash.ru', $tmpl );

					if(
						isset( $_FILES['modal-2-photo'] ) &&
						is_image( $_FILES['modal-2-photo']['tmp_name'] ) &&
						$_FILES['modal-2-photo']['size'] <= BASIC_UPLOAD_SIZE
					) {
						$mail->addAttachment( $_FILES['modal-2-photo']['tmp_name'], $_FILES['modal-2-photo']['name'] );
					}

					$mail->send();
					return ['code' => 200, 'body' => 'Спасибо, Ваш отзыв принят на модерацию.'];
				}
				else {
					return ['code'=> 200, 'body' => 'К сожалению, данные некорректны!'];
				}

			}
		],
	];
