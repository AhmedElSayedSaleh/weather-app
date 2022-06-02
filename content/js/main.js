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
}; // end of toggleTemp
toggleTemp();

// Get data from api
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
    // console.log(data);
    // return data;
  } catch (err) {
    console.log(err);
  }
} // end of getData

// get current date
const getDate = () => {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  console.log(date);
  return date;
};
// set date in html
const setDate = () => {
  const date = document.querySelector("#date");
  date.innerHTML = getDate();
};
setDate();
// set data html
// const htmlDisplay = (data) => {
// const {
//   currently: { temperature, summary, icon },
//   daily: { data: dailyData },
//   hourly: { data: hourlyData },
// } = data;
// };

getData().then((data) => {
  // console.log(data);
  const { temperature, summary, icon } = data.currently;
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
});
