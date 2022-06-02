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
// const htmlDisplay = (data) => {
// const {
//   currently: { temperature, summary, icon },
//   daily: { data: dailyData },
//   hourly: { data: hourlyData },
// } = data;
// };

getData().then((data) => {
  console.log(data);
  const { currently, daily, hourly } = data;
  const { temperature, summary, icon } = currently;
  const { data: dailyData } = daily;
  const { data: hourlyData } = hourly;

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

  const hourlyEl = document.querySelector("#hourly");
  hourlyEl.innerHTML = hourlyData.map((hour) => {
    const { time, icon, temperature } = hour;
    return `
    <div class="hourly-item">
      <div class="hourly-item__time">${time}</div>
      <div class="hourly-item__icon">${icon}</div>
      <div class="hourly-item__temp">${Math.round(temperature)}&deg;C</div>
    </div>
    `;
  });

  const dailyEl = document.querySelector("#daily");
  dailyEl.innerHTML = dailyData.map((day) => {
    const { time, icon, temperatureHigh, temperatureLow } = day;
    return `
    <div class="daily-item">
      <div class="daily-item__time">${time}</div>
      <div class="daily-item__icon">${icon}</div>
      <div class="daily-item__temp">${Math.round(temperatureHigh)}&deg;C</div>
      <div class="daily-item__temp">${Math.round(temperatureLow)}&deg;C</div>
    </div>
    `;
  });
});

// const { temperature, summary, icon } = data.hourly;
// const temp = document.querySelector("#temp");
// temp.innerHTML = `${Math.round(temperature)}&deg;`;

// const weather = document.querySelector("#weather");
// weather.innerHTML = summary;

// const iconImg = document.querySelector("#icon");
// iconImg.src = `https://darksky.net/images/weather-icons/${icon}.png`;

// Set DOM elements from the API
// temperatureDegree.textContent = temperature;
// temperatureDescription.textContent = summary;
// locationTimezone.textContent = data.timezone;
// // Set icon
// setIcons(icon, document.querySelector(".icon"));
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
