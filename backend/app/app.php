<?php

Class App {

	private $router;

	private $match;

	private $response;

	public function mapRoutes( array $routes ):void
	{

		foreach ( $routes as $route ) {

				$this->router->map( $route['method'], $route['uri'], $route['callback'] );

		}

	}

	public function setRouter( $router ):void
	{
		$this->router = $router;
	}

	public function execute() {
		$this->match = $this->router->match();

		//print_r($this->match);

		if( $this->match && is_callable( $this->match['target'] ) ) {
			$result = call_user_func_array( $this->match['target'], $this->match['params'] );



		} else {
			// no route was matched
			$result = ['code'=> 404];
			//header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
		}
		$this->response = $result;
		//print_r($result);
	}

	public function end() {
		$response = new Response( $this->response );

		//$response->setJSON();
		//print_r($response);
		$response->throw();
	}
}
