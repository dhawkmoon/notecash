<?php
	require 'helpers.php';
	require 'routes.php';
	require 'response.php';
	require 'app.php';
	require 'services/mail-service.php';
	require 'services/template-service.php';
	require 'services/form-service.php';
	require 'services/analytics.php';
	require 'services/amo-crm.php';
	//Create router
	$router = new AltoRouter();
	$router->setBasePath( BASE_PATH );
	//echo BASE_PATH;
	//Create APP
	$app = new App();
	$app->setRouter( $router );

	$app->mapRoutes( $routes );

	$app->execute();
	$app->end();
