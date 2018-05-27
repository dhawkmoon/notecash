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
			'method'	 	=> 'GET',
			'uri'				=>  '/amo',
			'callback'	=>	function() {
				return ['code'=>200, 'body'=> 'Hello, amo!'];
			}
		],
		[
			'method'		=> 'POST',
			'uri'				=> '/send',
			'callback'	=> function() {
			//	print_r( $_POST );
				// $_POST['phone-top'] = '+7 (123) 323-32-32';
				// $_POST['modal-2-phone'] = '3213121';
				// $_POST['phone-bottom'] = '81233233232';
				$fields = validateFormFields( FORM_FIELDS );
				//print_r( $fields );

				if( count( $fields ) > 0 ) {

					$tmpl = TemplateService::load( 'mails/phone.tpl' );
					$tmpl = TemplateService::replace( $tmpl, ['phone' => $fields['phone'] ] );

					$mail = MailService::createMail( BASIC_FROM, BASIC_TO, BASIC_SUBJECT, $tmpl );
					//echo $m
					$mail->send();
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
						'phone' => $fields['phone'],
						'name'	=> $fields['name'],
						'note'	=> $fields['note'],
						'description' => $fields['description'],
						'type'				=> $fields['type'],
					];

					$tmpl = TemplateService::load( 'mails/detailed.tpl' );
					$tmpl = TemplateService::replace( $tmpl, $matches );

					$mail = MailService::createMail( BASIC_FROM, BASIC_TO, BASIC_SUBJECT, $tmpl );

					if(
						isset( $_FILES['modal-photo'] ) &&
						is_image( $_FILES['modal-photo']['tmp_name'] ) &&
						$_FILES['modal-photo']['size'] <= BASIC_UPLOAD_SIZE
					) {
						$mail->addAttachment( $_FILES['modal-photo']['tmp_name'], $_FILES['modal-photo']['name'] );
					}

					$mail->send();
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
