<?php

	function sendPhoneForm()
	{
		print_r($_POST);
		// if( isset( $_POST['phone'] ) and preg_match( '^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$', $_POST['phone'] )  ) {
    //
		// 	$tmpl = TemplateService::load( 'mails/phone.tpl' );
		// 	$tmpl = TemplateService::replace( $tmpl, ['phone' => $_POST['phone'] ] );
    //
		// 	$mail = MailService::createMail( BASIC_FROM, 'dhawkmoon@mail.ru', 'test', $tmpl );
    //
		// 	//$mail->send();
		// 	echo '1';
		// }
	}
