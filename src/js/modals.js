import $ from 'jquery';

$(document).ready(function($){

  var modal = {
    toggle: function( e ){
      e.preventDefault();
      if( typeof $(this) == 'undefined'  ) {
        console.log('Function is called outside the scope of jquery func.')
      }
      else {
        var $target = $( $(this).data('target') )
        if( !$target.hasClass('m-modal--opened') ) {
          $target.trigger('modalopened')
          $target.addClass('m-modal--opened')

          modal.addOverlay( $target )
        }
        else {
          $target.trigger('modalclosed')
          $target.removeClass('m-modal--opened')

          modal.removeOverlay()
        }
        return $target
      }
    },
    open: function( e ){
      e.preventDefault();
      if( typeof $(this) == 'undefined'  ) {
        console.log('Function is called outside the scope of jquery func.')
      }
      else {
        var $target = $(this)
        if( !$target.hasClass('m-modal--opened') ) {
          $target.trigger('modalopened')
          $target.addClass('m-modal--opened')

        }
        return $target
      }
    },
    close: function( e ){

      e.preventDefault();
      if( typeof $(this) == 'undefined'  ) {
        console.log('Function is called outside the scope of jquery func.')
      }
      else {
        var $target = $(this)
        if( $target.hasClass('m-modal--opened') ) {
          $target.trigger('modalclosed')
          $target.removeClass('m-modal--opened')
          modal.removeOverlay()
        }
        return $target
      }
    },
    addOverlay: function( $target ) {
      if( typeof  $target == 'undefined' ) {
        console.log('Error: no object scope provided')
        return false;
      }
      $( $target ).prepend('<div class="m-modal-overlay"></div>')
      $('body').addClass('modal-open')
    },
    removeOverlay: function( e ) {
      $('.m-modal-overlay').remove()
      $('body').removeClass('modal-open')
    },
    closeAll: function(e) {

      $('.m-modal').removeClass('m-modal--opened')
      modal.removeOverlay()

    }
  }
  $(document).on( 'click', '.m-modal-overlay', modal.closeAll )
  $('[data-toggle=modal]').on( 'click', modal.toggle )
  $(document).on( 'keydown', function(e){
    if( e.which == 27 ) {
      modal.closeAll()
    }
  } );



})
