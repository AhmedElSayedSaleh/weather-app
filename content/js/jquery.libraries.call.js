// ################# forecasts times & dates scroll ###################

$(document).ready(function () {
  $("#hourly").owlCarousel({
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

  $("#daily").owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    loop: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 5,
      },
      1000: {
        items: 8,
      },
    },
  });
});
