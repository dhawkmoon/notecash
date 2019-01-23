(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/js/routes-slider.js":
/*!*********************************!*\
  !*** ./src/js/routes-slider.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(/*! jquery */ "jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _swiper = __webpack_require__(/*! swiper */ "./node_modules/swiper/dist/js/swiper.esm.bundle.js");

var _swiper2 = _interopRequireDefault(_swiper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RoutesSlider() {
  this.render = function () {
    (0, _jquery2.default)('#routes-slider-container').load('/routes-slider.html #planshet-video', function () {
      this.init();
    }.bind(this));
  };

  this.init = function () {
    (0, _jquery2.default)('.route__step>a').click(function (e) {
      e.preventDefault;
    });
    var routesSlider = new _swiper2.default('#routes-slider', {
      slidesPerView: 1,
      //spaceBetween: 51,
      // If we need pagination
      pagination: {
        el: '#mobile-routes-pagination',
        clickable: true
      },
      //slideClass: 'note-books-slide',
      // Navigation arrows
      navigation: {
        nextEl: '#route-slider-arrow-right',
        prevEl: '#route-slider-arrow-left'
      }
    });
    routesSlider.on('slideChange', function () {
      console.log(this.activeIndex);
      var n = this.activeIndex + 1;
      console.log(n);
      (0, _jquery2.default)('.route-slide').removeClass('route-slide--active');
      (0, _jquery2.default)('.route-slide:nth-child(' + n + ')').addClass('route-slide--active');
    }); //Change slide on tap

    (0, _jquery2.default)('.route-slide-next').on('click', function (e) {
      e.preventDefault();
      routesSlider.slideNext();
    });
    (0, _jquery2.default)('.route-slide-prev').on('click', function (e) {
      e.preventDefault();
      routesSlider.slidePrev();
    });
  };

  return this;
}

module.exports = new RoutesSlider();

/***/ })

}]);
//# sourceMappingURL=0.bundle.js.map