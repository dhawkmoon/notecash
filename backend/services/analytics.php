<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
	//echo '1';
	Class Analytics
	{
		//
		public static function getLeadTags()
		{
			$tags = [];
			$r = '';
			$s = '';

			if( isset( $_POST['r'] )  ) {
				$r = $_POST['r'];
			}
			if( isset( $_POST['s'] )  ) {
				$s = $_POST['s'];
			}

			// echo $r.'<br>';
			//
			// echo 'Preg :: '.preg_match_all( '/yandex/', $r );

			//
			if( $r == '') {
				$tags[] = 'organic';
			}
			elseif( preg_match_all( '/yandex/', $r ) ) {
				$tags[] = 'yandex';
			}
			elseif( preg_match_all( '/google/', $r )  ) {
				$tags[] = 'google';
			}

			if( preg_match_all( '/utm_source|utm_medium/', $s ) ) {
				$u = [];
				parse_str( $s, $u );
				
				
				$tags[] = $u['utm_source'];
				$tags[] = $u['utm_medium'];
				
				if( preg_match( '/^display/', $u['utm_campaign'] ) ) {
					$tags[] = 'РСЯ';
				}
				
				$c = explode( '|', $u['utm_content'] );
				
				$tags[] = $c[0];
				if( $c[1] != 'none' ) {
					$tags[] = $c[1];
				}
				
				$tags[] = $c[4];

			}

			return implode( ',', array_unique( $tags ) );
		}




		//
	}
/*

	function test()
	{
		$_POST['r'] = 'yandex.com';
		$_POST['s'] = 'utm_source=yandex&utm_medium=cpc&utm_campaign=search_123&utm_term=продать макбук&utm_content=345|none|search|A|mobile|';
		echo 'r: '.Analytics::getLeadTags();
	}

	test();
*/
