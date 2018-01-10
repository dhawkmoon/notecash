<?php

Class App {
	
	private $router;
	
	private $match;
	
	public function mapRoutes( array $routes ):void 
	{
		
		foreach ( $routes as $route ) {
			
				$this->router->map( $route['method'], $route['callback'] );
			
		}
		
	}
	
	public function setRouter( $router ):void
	{
		$this->router = $router;
	}
	
	public function execute() {
		$this->match = $this->router->match();
		
		if( $match && is_callable( $match['target'] ) ) {
			call_user_func_array( $match['target'], $match['params'] ); 
		} else {
			// no route was matched
			header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
		}

	}
	
} 