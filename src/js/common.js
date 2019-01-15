import Swiper from 'swiper';
import $ from 'jquery';

window.$ = $
window.jQuery = $

import 'jquery-mask-plugin';



/***
	Tetimonials slider
								***/

var testimonialsSlider = new Swiper ('#testimonials', {

		slidesPerView:2,
		spaceBetween: 51,
    // If we need pagination
    pagination: {
      el: '#testimonials-pagination',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '#testimonials-button-next',
      prevEl: '#testimonials-button-prev',
    },

	breakpoints: {
		992: {
			slidesPerView: 1,
			spaceBetween: 70,
		}
	},
	init: false,

  })

testimonialsSlider.on( 'init', function(){
    var coll = $('#testimonials-pagination>span')
    for( var i=0; i<coll.length; i++ ) {
        $( coll[i] ).attr('id', 'testimonials_bullets_'+i)
    }
} )
testimonialsSlider.init()
/***
	Notebooks slider
								***/

if( $(window).width() <= 768 ) {

	var notebooksSlider = new Swiper ('.note-books-wrapper', {

			slidesPerView:1,
			//spaceBetween: 51,
	    // If we need pagination
	    pagination: {
	      el: '#notebooks-pagination',
	      clickable: true,
	    },
			//slideClass: 'note-books-slide',
	    // Navigation arrows
	    navigation: {
	      nextEl: '#notebooks-button-next',
	      prevEl: '#notebooks-button-prev',
	    },


	  })
}//end if
  /***
	  Separators transformations
	  											***/
	$(document).ready( function($) {

		/***
			MAPS
				***/
		if( $(window).width() > 768 ) {
			$('#map').append('<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Abc8de033ccad85b440e3effd6cae68f1c65fc86e6c60ed84d63420daa76ea4ff&amp;width=100%25&amp;height=570&amp;lang=ru_RU&amp;scroll=false"></script>')
		}
		else {
			$('#map').append('<script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9b56d2dccc1a9c2d7c4a2288b40b6b28b565495af943f64b026e4ccc72fd012c&amp;width=100%25&amp;height=320&amp;lang=ru_RU&amp;scroll=false"></script>')
		}

		$( '.route__step' ).on( 'mouseenter', function() {

			if( !$(this).hasClass('route__step--active') ) {
				$(this).prev( '.route__step' ).find( '.sep-vert' ).addClass('sep-vert--transform')
			}

		} );

		$( '.route__step' ).on( 'mouseleave', function() {
			//console.log($(this).hasClass('route__step--active'))
			if( !$(this).hasClass('route__step--active') ) {
				$(this).prev( '.route__step' ).find( '.sep-vert' ).removeClass('sep-vert--transform')
			}

		} );

	/****
		Accordeon in QA section
													***/

		$('.questions__item').on('click', function( e ) {
			$('.questions__item').removeClass( 'questions__item--active' )
			$(this).addClass( 'questions__item--active' )
		})

		/***
			MASK
				***/

		$("#phone-top,#phone-bottom").mask("+7 (999) 999-99-99");
		$("[data-mask=phone]").mask("+7 (999) 999-99-99");
		$('.s1-icon').on( 'click', function(){
			$("#phone-top").focus()
		} )

		$('.phone').on( 'click', function(){
			$("#phone-bottom").focus()
		} )

		$('.floating-label:not(.floating-label--textarea)').on('click', function(){
			$(this).find('input').focus()
		})

		$('.floating-label--textarea').on('click', function(){
			$(this).find('textarea').focus()
		})

		$('.floating-label input,.floating-label textarea').on('focus', function(){
			$(this).parent().addClass('floating-label--focused')
		})

		$('.floating-label input,.floating-label textarea').on('blur', function(){
			$(this).parent().removeClass('floating-label--focused')
		})

		/***
			FORMS NOT EMPTY DETECTION
															***/
		var checkInputBlur = function(e){

			if( $(this).val().length > 0 ) {
				$(this).addClass('not-empty')
			}
			else {
				$(this).removeClass('not-empty')
			}
		}
		var checkInputFocus = function() {
			$(this).addClass('not-empty')
		}
		$('input').on( 'blur', checkInputBlur )
		$('input').on( 'focus', checkInputFocus )


		var checkTextareaBlur = function(e){

			if( $(this).val().length > 0 ) {
				$(this).addClass('not-empty')
			}
			else {
				$(this).removeClass('not-empty')
			}
		}
		var checkTextareaFocus = function() {
			$(this).addClass('not-empty')
		}
		$('textarea').on( 'blur', checkInputBlur )
		$('textarea').on( 'focus', checkInputFocus )

		/***
				ARR ANIMATION
									***/

		$( '.s1-icon:first-child' ).on( 'mouseenter', function(){
			$('.arr-top').addClass('arr-top--active')
		} )

		$( '.s1-icon:first-child' ).on( 'mouseleave', function(){
			$('.arr-top').removeClass('arr-top--active')
		} )


		/***
			ANCHORS SCROLL
									***/
		$( '.header-menu__item > a,.mobile-menu a' ).on( 'click', function(e){
			e.preventDefault();

			var target = $(this).attr('href')
			var to = $( target ).offset().top

			$('html,body').animate({scrollTop: to}, 400)

			$('.mobile-menu').removeClass('mobile-menu--active')
			$('.mobile-menu').trigger('mutation')
			return false

		} )


		/***
			Modal on open focus events
															***/
		$('.m-modal').on( 'modalopened', function() {
			var $inp = $(this).find('input:first-child')
			if( $inp.length > 0) {
			  setTimeout( function(){
					$inp[0].focus()
				}, 400 );
			}
		} )

		/***
			FILEs
					***/
		$('.floating-label--file .btn').on('click', function(e){
			e.preventDefault()
			$(this).next().trigger('click')
		})

		$('.floating-label--file input').on('change', function(e){
			var name = getFileName( $(this).val() )
			$(this).next().text( name )
			$(this).next().addClass('not-empty')
		})

		function getFileName( path ) {
			return path.split(/(\\|\/)/g).pop()
		}


		/***
			Mobile menu
								***/
		$('.mobile-menu-toggler,.mobile-menu-overlay').on('click', function(){
			$('.mobile-menu').toggleClass('mobile-menu--active')
			$('.mobile-menu').trigger('mutation')
		})

		$('.mobile-menu').on('mutation', function(){
			if( $(this).hasClass('mobile-menu--active') ) {
				$('.mobile-menu-overlay').fadeIn(300)
				$('html,body').addClass('mobile-menu-is-open')
			}
			else {
				$('.mobile-menu-overlay').fadeOut(300)
				$('html,body').removeClass('mobile-menu-is-open')
			}
		})

} );//end document.ready

//trigger phone animation

var $w = $(window)
var $d = $(document)
var $pf = $('#prefooter')
var $b = $('body')

var animatePhone = function(){
	window.requestAnimationFrame( function(){
		var wh = $w.height()
		var d = $pf.offset().top - $d.scrollTop()
		//console.log( d, wh )
		if( d < wh ) {
			$( '.phone' ).addClass('animate')
			$w.off( 'scroll', animatePhone )
		}

	})
}

var animatePhoneXS = function(){
	window.requestAnimationFrame( function(){
		if( $pf.offset().top < 60 ) {
			$( '.phone' ).addClass('animate')
			$b.off( 'scroll', animatePhoneXS )
		}
	})
}

$w.on( 'scroll', animatePhone )
$b.on( 'scroll', animatePhoneXS )


$( document ).ready( function($){

	$('[data-src]').each( function(){

		$.ajax({
			method: 'get',
			url: $(this).data('src'),

		})

	} )

} );
