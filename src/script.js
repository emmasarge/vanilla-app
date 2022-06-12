function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function getDatefromCoords(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed","Thurs", "Fri", "Sat"]
    return days[day];

}
function displayForecast(response) {
    let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="d-flex row justify-content-center w-100 mt-3">`;
  forecast.forEach(function (forecastDay, index) {
      if(index < 6 ){
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2 text-center">
        <div class="weather-forecast-date">${getDatefromCoords(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures col">
          <div class="weather-forecast-temperature-max" style="font-size: 10px; font-weight: 200;">Max temp: ${Math.round(forecastDay.temp.max)}º </div>
          <div class="weather-forecast-temperature-min"style="font-size: 10px; font-weight: 200;">Min temp: ${Math.round(forecastDay.temp.min)}º  </div>
        </div>
      </div>
  `;
  }});

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
    let apiKey = "2de1414d2167da92d347476a4e1097e6";
    let url =  `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayForecast)
}
function showWeather(response) {
  let displayCity = document.querySelector("#city-name");
  let temperature = Math.round(response.data.main.temp);
  let toFarenheit = Math.round(9 * temperature + 160) / 5;
  let description = response.data.weather[0].description;
  let displayDescription = document.querySelector("#weather-condition");
  let displayTemp = document.querySelector("#showTemp");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  displayTemp.innerHTML = `${temperature}º `;
  displayDescription.innerHTML = `${description}`;
  displayCity.innerHTML = `${response.data.name}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("width", "150px");
  iconElement.setAttribute("alt", response.data.weather[0].description);
  function convertToCelsius(event) {
    event.preventDefault();
    let displayTemp = document.querySelector("#showTemp");
    displayTemp.innerHTML = `${temperature}º `;
  }
  function convertToFahrenheit(event) {
    event.preventDefault();
    let displayTemp = document.querySelector("#showTemp");
    displayTemp.innerHTML = `${toFarenheit}º `;
  }
  let clickFarenheit = document.querySelector("#showF");
  clickFarenheit.addEventListener("click", convertToFahrenheit);

  let clickCelsius = document.querySelector("#showC");
  clickCelsius.addEventListener("click", convertToCelsius);

  // if (temperature < 25) {
  //     document.querySelector(".weather-icon").style.filter= "invert(0.6) sepia(1) saturate(3) hue-rotate(4deg)";

  // } else {
  //     document.querySelector(".weather-icon").style.filter= "0";
  // }
  getForecast(response.data.coord);
}

function search(city) {
  let key = "2de1414d2167da92d347476a4e1097e6";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function searchCity(city) {
  let key = "2de1414d2167da92d347476a4e1097e6";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(url).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  searchCity(cityInput.value);
}
function showCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let key = "2de1414d2167da92d347476a4e1097e6";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    axios.get(url).then(showWeather);
  });
}

let searchForm = document.querySelector("#search-btn");
searchForm.addEventListener("click", handleSubmit);

let button = document.querySelector("#location-btn");
button.addEventListener("click", showCity);

searchCity("Paris");
