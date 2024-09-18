const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-icon");

searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") {
    updateWeatherInfo();
    cityInput.value = "";
    cityInput.blur();
  }
});
//Key Event
cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityInput.value.trim() != "") {
    updateWeatherInfo();
    cityInput.value = "";
    cityInput.blur();
  }
});
