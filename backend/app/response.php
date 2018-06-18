<?php
  Class Response {
    private $protocol;
    private $code;
    private $body;

    private $isJSON;

    function __construct( array $result )
    {

      $this->protocol = $_SERVER["SERVER_PROTOCOL"];
      $this->code     = $this->setCode( $result['code'] );
      if( !empty( $result['body'] ) ) {
        $this->body     = $result['body'];
      }
      else {
        $this->body = false;
      }
      //echo $this->body;
    }

    function setCode( $code ):string
    {
      $result = '';
      switch( $code ) {
        case 200:
          $result = $code . ' OK';
        break;
        case 404:
          $result = $code . ' Not Found';
        break;
        case 409:
          $result = $code . ' Conflict';
        break;
        case 403:
          $result = $code . ' Forbidden';
        break;
      }
      return $result;
    }

    function setJSON():void
    {
      $this->isJSON = true;
      $this->body   = json_encode( $this->body );
    }

    function throw():void
    {
      header( $this->protocol . ' ' . $this->code );
      if( $this->isJSON )
      {
        header( 'Content-Type: application/json' );
      }
      else {
        header('Content-Type: text/html; charset=utf-8');
      }
      die( $this->body );
    }
  }
