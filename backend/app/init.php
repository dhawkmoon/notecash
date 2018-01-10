<?php
	
	require 'routes.php';
	require 'app.php';
	//echo 1;
	//Create router
	$router = new AltoRouter();
	$router->setBasePath('/backend');
	//Create APP
	$app = new App();
	
	$app->setRouter( $router );
	
	$app->execute();
	
	
	