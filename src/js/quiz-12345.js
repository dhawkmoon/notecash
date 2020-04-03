import $ from 'jquery';


$( init );
function init() {
  $('.go-step-2').bind( 'click', goStep2 );
  $('.go-step-3').bind( 'click', goStep3 );
  $('.go-step-4').bind( 'click', goStep4 );
  $('.go-step-5').bind( 'click', goStep5 );
  $('.go-step-1').bind( 'click', goStep1 );
  $('.go-step-5-2').bind( 'click', goStep5_2 );
  $('.cpu .quiz-dropdown__item').bind('click', fCpu );
  $('.graphics .quiz-dropdown__item').bind('click', fGraphics );
  $('.ram .quiz-dropdown__item').bind('click', fRam );
  $('.hard .quiz-dropdown__item').bind('click', fHard );
}

function goStep2() {
  $(".quiz-1").removeClass("quiz-step--active").addClass("quiz-step")
  $(".quiz-2").removeClass("quiz-step").addClass("quiz-step--active");
  var fmark = $(".quiz-dropdown__current--not-empty").text();
  $(".f-mark").html($(".quiz-dropdown__current--not-empty").text());
  if (fmark == "HP"){
    $(".quiz-dropdown-2 .hp").show();
  }
  else if(fmark == "Asus"){
    $(".quiz-dropdown-2 .asus").show();
  }
}

function goStep3() {
  $(".quiz-2").removeClass("quiz-step--active").addClass("quiz-step")
  $(".quiz-3").removeClass("quiz-step").addClass("quiz-step--active");
  $(".f-model").html($(".quiz-dropdown-2 .quiz-dropdown__current--not-empty").text());
}

function goStep4() {
  $(".quiz-3").removeClass("quiz-step--active").addClass("quiz-step")
  $(".quiz-4").removeClass("quiz-step").addClass("quiz-step--active");
}

function goStep5() {
  $(".quiz-2").removeClass("quiz-step--active").addClass("quiz-step")
  $(".quiz-5").removeClass("quiz-step").addClass("quiz-step--active");
}
function goStep1() {
  $(".quiz-2").removeClass("quiz-step--active").addClass("quiz-step")
  $(".quiz-1").removeClass("quiz-step").addClass("quiz-step--active");
}
function goStep5_2() {
  $(".quiz-5").removeClass("quiz-step--active").addClass("quiz-step")
  $(".quiz-2").removeClass("quiz-step").addClass("quiz-step--active");
}

function fCpu() {
  $(".f-cpu").html($(".cpu .quiz-dropdown__item:hover").text());
}

function fGraphics() {
  $(".f-graphics").html($(".graphics .quiz-dropdown__item:hover").text());
}

function fRam() {
  $(".f-ram").html($(".ram .quiz-dropdown__item:hover").text());
}
function fHard() {
  $(".f-hard").html($(".hard .quiz-dropdown__item:hover").text());
}
