// Celsius/Fahrenheit buttons toggle
const toggleTemp = () => {
  const tempBtn = document.querySelectorAll(".temperature-btn");

  tempBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      tempBtn.forEach((btn) => {
        btn.classListNaNpxove("temperature-btn--right-active");
        btn.classListNaNpxove("temperature-btn--left-active");
      });
      if (btn.firstElementChild.innerHTML === "C") {
        btn.classList.add("temperature-btn--left-active");
      } else {
        btn.classList.add("temperature-btn--right-active");
      }
    });
    // if (tempBtnText.innerHTML === "C") {
    //   tempBtnText.innerHTML = "F";
    //   // temp.innerHTML = `${Math.round(temp.innerHTML * 9 / 5 + 32)}&deg;F`;
    // } else {
    //   tempBtnText.innerHTML = "C";
    //   // temp.innerHTML = `${Math.round((temp.innerHTML - 32) * 5 / 9)}&deg;C`;
    // }
  });
};
toggleTemp();

// get current date
const getDate = () => {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return date;
};
// display date in html
const setDate = () => {
  const date = document.querySelector("#date");
  date.innerHTML = getDate();
};
setDate();

// Get weather from api
const url =
  "https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/30.007414,31.491318";

async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // const {
    //   currently: { temperature, summary, icon },
    //   hourly: { data: hourlyData },
    //   daily: { data: dailyData },
    // } = data;
    return data;
  } catch (err) {
    console.log(err);
  }
}

// display weather in html
getData().then((data) => {
  console.log(data);
  const { currently, daily, hourly } = data;
  const { temperature, summary, icon } = currently;
  const { data: hourlyData } = hourly;
  const { data: dailyData } = daily;

  // display current weather
  const temp = document.querySelector("#temp");
  temp.innerHTML = `${Math.round(
    temperature
  )}<span class="temperature-degree">&#176;</span>`;

  const iconImg = document.querySelector("#icon");
  iconImg.src = `https://darksky.net/images/weather-icons/${icon}.png`;

  const summaryEl = document.querySelector("#summary");
  summaryEl.innerHTML = summary;

  const hourlySummary = document.querySelector("#hourly-summary");
  hourlySummary.innerHTML = hourly.summary;

  // display hourly weather
  const hourlyEl = document.querySelector("#hourly");
  hourlyData.forEach((hour) => {
    const { time, icon, temperature } = hour;
    const hourlyContainer = document.createElement("div");
    hourlyContainer.classList.add(
      "item",
      "d-flex",
      "flex-column",
      "align-items-center"
    );
    const timeEl = document.createElement("p");
    timeEl.classList.add("weather__forecasts__time");
    timeEl.innerHTML = new Date(time * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const iconEl = document.createElement("img");
    iconEl.classList.add("weather__forecasts__img");
    iconEl.src = `https://darksky.net/images/weather-icons/${icon}.png`;

    const tempEl = document.createElement("span");
    tempEl.classList.add("weather__forecasts__temperature");
    tempEl.innerHTML = `${Math.round(
      temperature
    )}<span class="temperature-degree">&#176;</span>`;
    hourlyContainer.appendChild(timeEl);
    hourlyContainer.appendChild(iconEl);
    hourlyContainer.appendChild(tempEl);
    hourlyEl.appendChild(hourlyContainer);

    console.log(hourlyContainer);

    $(".owl-carousel").owlCarousel();
    $(".owl-carousel").data("owl.carousel").add([hourlyContainer, 0]);
    $(".owl-carousel").data("owl.carousel").refresh();
  });
});
// hourlyEl.innerHTML = hourlyData.map((hour) => {
//   const { time, icon, temperature } = hour;
// return `<div class="item d-flex flex-column align-items-center">
//                 <p class="weather__forecasts__time">${time}</p>
//                 <img class="weather__forecasts__img" src="https://darksky.net/images/weather-icons/${icon}.png" alt="">
//                 <span class="weather__forecasts__temperature">${Math.round(
//                   temperature
//                 )}<span
//                     class="temperature-degree">&#176;</span></span>
//               </div>`;
// });

// display daily weather
//   const dailyEl = document.querySelector("#daily");
//   dailyEl.innerHTML = dailyData.map((day) => {
//     const { time, icon, temperatureHigh, temperatureLow } = day;
//     return `
//     <div class="daily-item">
//       <div class="daily-item__time">${time}</div>
//       <div class="daily-item__icon">${icon}</div>
//       <div class="daily-item__temp">${Math.round(temperatureHigh)}&deg;C</div>
//       <div class="daily-item__temp">${Math.round(temperatureLow)}&deg;C</div>
//     </div>
//     `;
//   });
// });

// // Change temperature to Celsius/Fahrenheit
// temperatureSection.addEventListener("click", () => {
//   if (temperatureSpan.textContent === "F") {
//     temperatureSpan.textContent = "C";
//     temperatureDegree.textContent = Math.floor((temperature - 32) * (5 / 9));
//   } else {
//     temperatureSpan.textContent = "F";
//     temperatureDegree.textContent = temperature;
//   }
// });
// });
