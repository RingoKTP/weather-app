let currentDate = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = date.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;

  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let day = days[date.getDay()];

  let formatDate = `${day} ${hours}:${minutes} ${ampm}`;
  return formatDate;
}

function searchCity(city) {
  event.preventDefault();
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let cityB = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityB}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = document.querySelector("#city-input").value;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperture);
}

function showCelcius() {
  event.preventDefault();
  let celciusValue = document.querySelector("#current-temperature");
  celciusValue.innerHTML = "35";
}

function showFahrenheit() {
  event.preventDefault();
  let fahrenheitValue = document.querySelector("#current-temperature");
  let temperature = fahrenheitValue.innerHTML;
  temperature = Number(temperature);
  fahrenheitValue.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

//Feature 1//
let todayDate = document.querySelector("#todayDate");
todayDate.innerHTML = formatDate(currentDate);

//Feature 2//
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// Bonus Feature//
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showTemperture(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = temperature;
}

// Current Location //
function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperture);
}

navigator.geolocation.getCurrentPosition(showCurrentLocation);
