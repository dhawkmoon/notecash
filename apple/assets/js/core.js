jQuery(document).ready(function(a) {

 $(".menu__icon").on("click", function() {
  $(".mobile-menu-wrapper, .mobile-menu").toggleClass("active");
  $("body").toggleClass("nonscroll");
}),

 $(".mobile-menu-wrapper").on("click", function() {
  $(".mobile-menu-wrapper, .mobile-menu").removeClass("active");
  $(".menu__icon").removeClass("menu__icon--close");
  $("body").removeClass("nonscroll");
});

 $(".menu-item a").on("click", function() {
  $(".mobile-menu-wrapper, .mobile-menu").removeClass("active");
  $(".menu__icon").removeClass("menu__icon--close");
  $("body").removeClass("nonscroll");
})

// мягкий скролл
$(function(){
  $('.goto').click( function(){ // ловим клик по ссылке с классом goto
    var scrollElement = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
    if ( $(scrollElement).length != 0) { // проверим существование элемента чтобы избежать ошибки
      $('html, body').stop().animate({ scrollTop: $(scrollElement).offset().top}, 1000); // анимируем скроолинг к элементу scroll_el
    }
    return false; // выключаем стандартное действие
  });
});

// меню большое/малое
$(function(){
  var menu = $('header');

  function setMenuView() {
    if ($(window).scrollTop() >= 80){
      menu.addClass('menu--small-js');
    } else {
      menu.removeClass('menu--small-js');
    }
  }

  setMenuView();
  $(document).on('scroll', function(){
    setMenuView();
  });
});

// убираем меню на мобиле при скролле вниз и показываем при скролле вверх

$(function() {
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('header').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 50);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
      return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
      } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
          $('header').removeClass('nav-up').addClass('nav-down');
        }
      }

      lastScrollTop = st;
    }
  });

// выпадающее подменю

$(function() {
  $('.menu__icon').click(function() {
    $('.menu__icon').toggleClass('menu__icon--close');

    //in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
    if( $('.menu__items').hasClass('menu__items--visible') ) {
      $('.menu__items').removeClass('menu__items--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function(){
          $('body').removeClass('overflow-hidden');
        });
    } else {
      $('.menu__items').addClass('menu__items--visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function(){
          $('body').addClass('overflow-hidden');
        });
    }
  });
});

$(".slider").slick({
  // arrows: true,
  dots: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: true,
  adaptiveHeight: true,
  // mobileFirst: true,
  autoplay: false,
  // fade: true,
  speed: 500,
  easing: 'ease-out',
  prevArrow: ".slider__arrow--prev",
  nextArrow: ".slider__arrow--next",
  responsive: [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
  ]
});

//Route

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




// Стилизация SELECT
$(function() {
  $('select').selectric();
});


//Async yandex map loading
$(document).one('scroll', function(){
	setTimeout( function(){
		$('#map').html( '<div class="hidden-xs-down"> <script charset="utf-8" async="" src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Abc8de033ccad85b440e3effd6cae68f1c65fc86e6c60ed84d63420daa76ea4ff&amp;width=100%25&amp;height=570&amp;lang=ru_RU&amp;scroll=false"></script> </div> <div class="hidden-sm-up"> <script charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9b56d2dccc1a9c2d7c4a2288b40b6b28b565495af943f64b026e4ccc72fd012c&amp;width=100%25&amp;height=320&amp;lang=ru_RU&amp;scroll=false"></script> </div>' )
	}, 3000 )
})

});

//Masks init
// $( document ).ready( function(){
// 	//Each data-mask
// 	$( '[data-mask]' ).each( function( i ){
// 		$(this).mask( $(this).data('mask') )
// 	} )
//
//
// } );


/*** VIDEO ***/

  var player; //init
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '365',
      width: '508',
      videoId: '0E9TOPqcttg',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': timerInit
      }
    });
  }

  function onPlayerReady(event) {
    //timerInit()
  }

  function stopVideo() {
    player.stopVideo();
  }

	var labels = [
		{
			time: 0, //seconds
			element: $('.route__step:nth-child(1)'),
		},
		{
			time: 28, //seconds
			element: $('.route__step:nth-child(2)'),
		},
		{
			time: 45, //seconds
			element: $('.route__step:nth-child(3)'),
		},
		{
			time: 75, //seconds
			element: $('.route__step:nth-child(4)'),
		},
		{
			time: 105, //seconds
			element: $('.route__step:nth-child(5)'),
		},
	]
	//Sets handlers for click - video seeking
	for( var i = 0; i < labels.length; i++ ) {

		//console.log(labels[i])

		labels[i].element.on( 'click', labels[i].time, function( e ) {

			player.seekTo( e.data )

		} )

	}

	//Listen to video and activate labels
	var timer

	function timerInit( e )
	{
		//console.log(timer)
		if( e.data == 1 ) {
			$('.route__step--active a').removeClass('paused')
			timer = setInterval( function(){
				switchLabels( player.getCurrentTime() )
			}, 300 )
		}
		else {
			if( e.data == 2 ) {
				$('.route__step--active a').addClass('paused')
			}
			clearInterval( timer )
		}
	}

	var currentLabel;

	function switchLabels( time ) {
		//
		for( var t = labels.length-1; t >= 0; t-- ) {

			if( t == labels.length-1 && time >= labels[t].time ) {
				//console.log('last')
				if( currentLabel != labels.indexOf( labels[t] ) ) {
					currentLabel = labels.indexOf( labels[t] )
					labels[t].element.find( 'a' ).trigger('reached')
				}

			}
			else if( typeof labels[t+1] != 'undefined' && time >= labels[t].time && time < labels[t+1].time ) {
				//console.log('middle:' + labels[t].time)
				if( currentLabel != labels.indexOf( labels[t] ) ) {
					currentLabel = labels.indexOf( labels[t] )
					labels[t].element.find( 'a' ).trigger('reached')
				}
			}
		}
		//
	}

	//Click events - visual changes
	$('.route__step a').on('click', function(e){

		e.preventDefault();

		$(this).parent().trigger('mouseenter')

		$('.route__step').removeClass('route__step--active')
		$('.sep-vert').removeClass('sep-vert--transform')
		$(this).parent().prev().find('.sep-vert').addClass('sep-vert--transform')

		var i = $(this).attr('href')

		labels[i].element.addClass('route__step--active')


	})

	$('.route__step a').on('reached', function(e){

		e.preventDefault();

		$(this).parent().trigger('mouseenter')

		$('.route__step').removeClass('route__step--active')
		$('.sep-vert').removeClass('sep-vert--transform')
		$(this).parent().prev().find('.sep-vert').addClass('sep-vert--transform')

		var i = $(this).attr('href')

		labels[i].element.addClass('route__step--active')


	})
