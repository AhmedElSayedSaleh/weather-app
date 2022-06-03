// ################# forecasts times & dates scroll ###################

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    loop: false,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 6,
      },
      1000: {
        items: 9,
      },
    },
  });
});
