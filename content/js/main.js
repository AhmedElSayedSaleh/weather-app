let actives = document.body.querySelectorAll(".reviews__cards__card");
let secondItem = actives[1];
let lastItem = actives[actives.length - 1];

// secondItem.style.marginTop = "5%";
// lastItem.style.marginTop = "10%";
window.addEventListener("DOMContentLoaded", () => {
  sliderMarginTop();
});

window.addEventListener("resize", () => {
  sliderMarginTop();
});

window.addEventListener("orientationchange", () => {
  sliderMarginTop();
});

let sliderMarginTop = () => {
  if (outerWidth > 767) {
    secondItem.style.marginTop = "5%";
    lastItem.style.marginTop = "10%";
  } else {
    secondItem.style.marginTop = "0%";
    lastItem.style.marginTop = "0%";
  }
};
