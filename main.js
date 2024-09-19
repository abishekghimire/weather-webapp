const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-icon");

const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");

const locationText = document.querySelector(".location");
const tempText = document.querySelector(".temperature");
const feelsLikeText = document.querySelector(".feels-like");
const conditionText = document.querySelector(".condition");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const dateTimeText = document.querySelector(".date-time");

const apiKey = "7a28bd357a496ca21f14cd9c08f04186";

//handling search button
searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

//Key Event
cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

//fetching data from api
async function getData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  return response.json();
}
//function to change weather icon acc. to weather
function getWeatherIcon(id) {
  if (id <= 232) return "thunderstorm.png";
  if (id <= 321) return "drizzle.png";
  if (id <= 531) return "rain.png";
  if (id <= 622) return "snow.png";
  if (id <= 781) return "atmosphere.png";
  if (id <= 800) return "clear.png";
  else return "clouds.png";
}
//function to update weather info acc. to city
async function updateWeatherInfo(city) {
  const weatherData = await getData("weather", city);
  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection);
    return;
  }

  //creating object
  const {
    name: location,
    main: { temp, feels_like },
    weather: [{ id, main }],
    timezone,
  } = weatherData;

  //updating data to view
  locationText.innerHTML = `<i class="fa-solid fa-location-dot fa-xs" style="color: #000000"></i> ${location}
`;
  tempText.textContent = Math.round(temp) + "°C";
  feelsLikeText.textContent = "Feels like " + Math.round(feels_like) + "°C";
  conditionText.textContent = main;
  weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;

  const localTime = getLocalTime(timezone);
  dateTimeText.innerHTML = `<p>${localTime}`;

  showDisplaySection(weatherInfoSection);
}

//function to get time acc. to timezone
function getLocalTime(timezoneOffset) {
  const utcTime = new Date().getTime();
  const localTimeInMs = utcTime + timezoneOffset * 1000;
  const localTime = new Date(localTimeInMs);

  return localTime.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

//function to handle different sections
function showDisplaySection(sectionToShow) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    (section) => (section.style.display = "none")
  );

  sectionToShow.style.display = "block";
}
