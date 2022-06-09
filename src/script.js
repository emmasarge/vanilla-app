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
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  let dateElement = document.querySelector("#date-time");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  function showWeather(response) {
    let displayCity = document.querySelector("#city-name");
    let temperature = Math.round(response.data.main.temp);
    let toFarenheit = Math.round(9 * temperature + 160) / 5;
    let description = response.data.weather[0].description;
    let displayDescription = document.querySelector("#weather-condition");
    let displayTemp = document.querySelector("#showTemp");
    displayTemp.innerHTML = `${temperature}º`;
    displayDescription.innerHTML = `${description}`;
    displayCity.innerHTML = `${response.data.name}`;
    function convertToCelsius(event) {
      event.preventDefault();
      let displayTemp = document.querySelector("#showTemp");
      displayTemp.innerHTML = `${temperature}º`;
    }
    function convertToFahrenheit(event) {
      event.preventDefault();
      let displayTemp = document.querySelector("#showTemp");
      displayTemp.innerHTML = `${toFarenheit}º`;
    }
    let clickFarenheit = document.querySelector("#showF");
    clickFarenheit.addEventListener("click", convertToFahrenheit);
  
    let clickCelsius = document.querySelector("#showC");
    clickCelsius.addEventListener("click", convertToCelsius);


    if (temperature > 14) {
        document.querySelector(".weather-icon").style.filter= "invert(0.9) sepia(1) saturate(9) hue-rotate(307deg)";
     
    } else {
        document.querySelector(".weather-icon").style.filter= "invert(0.7) sepia(1) saturate(5) hue-rotate(2deg)";
    }

}
  
  
  function searchCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#search-input");
    let city = cityInput.value;
    let key = "2de1414d2167da92d347476a4e1097e6";
    let units = "metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
    axios.get(url).then(showWeather);
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
  searchForm.addEventListener("click", searchCity);
  
  let button = document.querySelector("#location-btn");
  button.addEventListener("click", showCity);
  