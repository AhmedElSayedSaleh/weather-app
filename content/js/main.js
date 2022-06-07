document.addEventListener("DOMContentLoaded", () => {
  const temp = document.querySelector("#temp");
  const minTemp = document.querySelector("#min-temp");
  const maxTemp = document.querySelector("#max-temp");

  const allTemp = [];

  const cityName = document.querySelector("#cityName");
  const showCity = document.querySelector("#showCity");
  let cityData = {
    lat: "30.007414",
    lon: "31.491318",
    address: "new cairo, cairo, egypt",
  };

  // Get weather from api

  async function getData() {
    const url = `https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/${cityData.lat},${cityData.lon}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        "Access-Control-Allow-Origin": "*",
        headers: headers,
      });
      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  displayWeather();

  // get city location
  cityName.addEventListener("keyup", async (e) => {
    if (e.keyCode === 13) {
      const city = cityName.value;
      const data = await getCityLocation(city);

      cityData.lat = data.lat;
      cityData.lon = data.lon;
      cityData.address = data.address;

      displayWeather();

      showCity.innerHTML = cityData.address;
      cityName.value = "";
    }
  });

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

  // display weather in html
  function displayWeather() {
    getData().then((data) => {
      const { currently, daily, hourly } = data;
      const { temperature, summary, icon } = currently;
      const { data: hourlyData } = hourly;
      const { data: dailyData } = daily;

      // display current weather temperature

      temp.innerHTML = `${Math.round(temperature)}`;

      // display min temperature
      const getMinTemp = () => {
        minTemp.innerHTML = `${Math.round(Math.min(...allTemp))}`;
      };

      // display max temperature
      const getMaxTemp = () => {
        maxTemp.innerHTML = `${Math.round(Math.max(...allTemp))}`;
      };

      // display current weather icon
      const iconImg = document.querySelector("#icon");
      iconImg.src = `https://darksky.net/images/weather-icons/${icon}.png`;

      // display current weather summary
      const summaryEl = document.querySelector("#summary");
      summaryEl.innerHTML = summary;

      const hourlySummary = document.querySelector("#hourly-summary");
      hourlySummary.innerHTML = hourly.summary;

      // create html temp div
      const createTempDiv = (time, icon, temperature, dataLen) => {
        const weatherContainer = document.createElement("div");
        weatherContainer.classList.add(
          "item",
          "d-flex",
          "flex-column",
          "align-items-center"
        );

        // create weather time
        const timeEl = document.createElement("p");
        timeEl.classList.add("weather__forecasts__time");

        if (dataLen.length > 8) {
          if (new Date(time * 1000).getHours() === new Date().getHours()) {
            timeEl.innerHTML = "Now";
          } else {
            timeEl.innerHTML = new Date(time * 1000).toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              }
            );
          }
        } else {
          timeEl.innerHTML = new Date(time * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          });
        }

        // create weather icon
        const iconEl = document.createElement("img");
        iconEl.classList.add("weather__forecasts__img");
        iconEl.src = `https://darksky.net/images/weather-icons/${icon}.png`;

        // create weather temp
        const tempDiv = document.createElement("div");
        tempDiv.classList.add("weather__forecasts__temperature");

        const tempEl = document.createElement("span");
        tempEl.classList.add("weather__forecasts__temperature__value");
        tempEl.innerHTML = `${Math.round(temperature)}`;

        const tempDeg = document.createElement("span");
        tempDeg.classList.add("temperature-degree");
        tempDeg.innerHTML = "&#176;";

        tempDiv.appendChild(tempEl);
        tempDiv.appendChild(tempDeg);

        weatherContainer.appendChild(timeEl);
        weatherContainer.appendChild(iconEl);
        weatherContainer.appendChild(tempDiv);

        return weatherContainer;
      };

      // display hourly weather
      hourlyData.forEach((hour) => {
        const weatherContainer = createTempDiv(
          hour.time,
          hour.icon,
          hour.temperature,
          hourlyData
        );
        allTemp.push(hour.temperature);

        // append hourly weather to html by owl carousel
        $("#hourly").owlCarousel();
        $("#hourly").data("owl.carousel").add([weatherContainer, 0]);
        $("#hourly").data("owl.carousel").refresh();
      });

      // min & max temperature calling methods
      getMinTemp();
      getMaxTemp();

      // display daily weather
      dailyData.forEach((day) => {
        const weatherContainer = createTempDiv(
          day.time,
          day.icon,
          day.temperatureLow,
          dailyData
        );

        // append daily weather to html by owl carousel
        $("#daily").owlCarousel();
        $("#daily").data("owl.carousel").add([weatherContainer, 0]);
        $("#daily").data("owl.carousel").refresh();
      });

      // Celsius/Fahrenheit buttons toggle
      const toggleTemp = () => {
        const tempBtn = document.querySelectorAll(".temperature-btn");

        tempBtn.forEach((btn) => {
          btn.addEventListener("click", () => {
            const temps = document.querySelectorAll(
              ".weather__forecasts__temperature__value"
            );

            tempBtn.forEach((btn) => {
              btn.classList.remove("temperature-btn--right-active");
              btn.classList.remove("temperature-btn--left-active");
            });
            if (btn.firstElementChild.innerHTML === "C") {
              btn.classList.add("temperature-btn--left-active");

              // main temp
              temp.innerHTML = `${Math.round(((temp.innerHTML - 32) * 5) / 9)}`;

              // min temp
              minTemp.innerHTML = `${Math.round(
                ((minTemp.innerHTML - 32) * 5) / 9
              )}`;

              // max temp
              maxTemp.innerHTML = `${Math.round(
                ((maxTemp.innerHTML - 32) * 5) / 9
              )}`;

              // hourly temp
              temps.forEach((temp) => {
                temp.innerHTML = `${Math.round(
                  ((temp.innerHTML - 32) * 5) / 9
                )}`;
              });
            } else {
              btn.classList.add("temperature-btn--right-active");

              // main temp
              temp.innerHTML = `${Math.round((temp.innerHTML * 9) / 5 + 32)}`;

              // min temp
              minTemp.innerHTML = `${Math.round(
                (minTemp.innerHTML * 9) / 5 + 32
              )}`;

              // max temp
              maxTemp.innerHTML = `${Math.round(
                (maxTemp.innerHTML * 9) / 5 + 32
              )}`;

              // hourly temp
              temps.forEach((temp) => {
                temp.innerHTML = `${Math.round((temp.innerHTML * 9) / 5 + 32)}`;
              });
            }
          });
          // if (tempBtnText.innerHTML === "C") {
          //   tempBtnText.innerHTML = "F";
          // temp.innerHTML = `${Math.round((temp.innerHTML * 9) / 5 + 32)}&deg;F`;
          // } else {
          //   tempBtnText.innerHTML = "C";
          // temp.innerHTML = `${Math.round(((temp.innerHTML - 32) * 5) / 9)}&deg;C`;
          // }
        });
      };
      toggleTemp();
    });
  }
});
