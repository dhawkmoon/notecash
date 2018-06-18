<?php
	
	Class TemplateService {
		
		public static function load( string $path ):string 
		{
			
			return file_get_contents( $path );
			
		}
		
		public static function replace( string $tmpl, array $matches ):string
		{
			
			foreach( $matches as $key=>$match ) {
				$tmpl = str_replace( '{' . $key . '}', $match, $tmpl );
			}
			
			return $tmpl;
				
		}
		
		public static function concat()
		{
			return implode( "\r\n", func_get_args() );
		}
		
	}