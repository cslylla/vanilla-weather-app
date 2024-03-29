function formatDate(timestamp){
    let date = new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturdayday", 
    ]
    let day = days[date.getDay()];
    return `${day}`
}

function formatForecastDay (timestamp){
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat", 
    ]
    return days[day];


}

function displayForecast(response){
   
    let forecast = response.data.daily;
    
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML =`<div class="row">`;
    forecast.forEach(function (forecastDay, index){
    if (index < 6) {
    function displayForecastIcon(iconCode){
    if(iconCode === "01d") {return `<i class="fas fa-sun forecastIcon"></i>`}
    else if (iconCode === "01n") {return `<i class="fas fa-moon forecastIcon"></i>`}
    else if (iconCode === "02d") {return `<i class="fas fa-cloud-sun forecastIcon"></i>`}
    else if (iconCode === "02n") {return`<i class="fas fa-cloud-moon forecastIcon"></i>`}
    else if (iconCode === "03d" ||
            iconCode === "03n" ||
            iconCode === "04d" ||
            iconCode === "04n") {return `<i class="fas fa-cloud forecastIcon"></i>`}
    else if (iconCode === "09d" || iconCode === "09n") {return `<i class="fas fa-cloud-showers-heavy forecastIcon"></i>`}
    else if (iconCode === "10d") {return `<i class="fas fa-cloud-sun-rain forecastIcon"></i>`}
    else if (iconCode === "10n") {return `<i class="fas fa-cloud-moon-rain forecastIcon"></i>`}
    else if (iconCode === "11d" || iconCode === "11n") {return `<i class="fas fa-bolt forecastIcon"></i>`}
    else if (iconCode === "13d" || iconCode === "13n") {return `<i class="fas fa-snowflake forecastIcon"></i>` }
    else if (iconCode === "50d" || iconCode === "50n") {return`<i class="fas fa-smogforecastIcon"></i>`}    
    }    

    forecastHTML = forecastHTML +
    `
        <div class="col-sm-2">
        <div class="weather-forecast-day">${formatForecastDay(forecastDay.dt)}</div>
        <div class="weather-forecast-picture">${displayForecastIcon(forecastDay.weather[0].icon)}</div>
        <div class="weather-forecast-temperature">
        <span class="weather-forecast-tempreature-max">${Math.round(forecastDay.temp.max)}°C</span> | <span
                        class="weather-forecast-tempreature-min">${Math.round(forecastDay.temp.min)}°C</span>
        </div>
        </div>
    `
    
    }})
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function formatTime(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes<10){
        minutes = `0${minutes}`
    }
    if (hours<10){
        hours = `0${hours}`
    }
    return `${hours}:${minutes}`
}

function getForecast(coordinates){
    let apiKey = "dae43417d2ff1d99a68e276b41145b89";
    let unit="metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}

function displayData(response){
    let temperatureElement = document.querySelector("#temperature");
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML =response.data.name; 
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML =formatDate(response.data.dt *1000);
    let timeElement = document.querySelector("#time");
    timeElement.innerHTML =formatTime(response.data.dt *1000);
    let iconElement = document.querySelector("#icon");
    if(response.data.weather[0].icon === "01d") {iconElement.innerHTML = `<i class="fas fa-sun"></i>`}
    else if (response.data.weather[0].icon === "01n") {iconElement.innerHTML = `<i class="fas fa-moon"></i>`}
    else if (response.data.weather[0].icon === "02d") {iconElement.innerHTML = `<i class="fas fa-cloud-sun"></i>`}
    else if (response.data.weather[0].icon === "02n") {iconElement.innerHTML = `<i class="fas fa-cloud-moon"></i>`}
    else if (response.data.weather[0].icon === "03d" ||
            response.data.weather[0].icon === "03n" ||
            response.data.weather[0].icon === "04d" ||
            response.data.weather[0].icon === "04n") {iconElement.innerHTML = `<i class="fas fa-cloud"></i>`}
    else if (response.data.weather[0].icon === "09d" || response.data.weather[0].icon === "09n") {iconElement.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`}
    else if (response.data.weather[0].icon === "10d") {iconElement.innerHTML = `<i class="fas fa-cloud-sun-rain"></i>`}
    else if (response.data.weather[0].icon === "10n") {iconElement.innerHTML = `<i class="fas fa-cloud-moon-rain"></i>`}
    else if (response.data.weather[0].icon === "11d" || response.data.weather[0].icon === "11n") {iconElement.innerHTML = `<i class="fas fa-bolt"></i>`}
    else if (response.data.weather[0].icon === "13d" || response.data.weather[0].icon === "13n") {iconElement.innerHTML = `<i class="fas fa-snowflake"></i>` }
    else if (response.data.weather[0].icon === "50d" || response.data.weather[0].icon === "50n") {iconElement.innerHTML = `<i class="fas fa-smog"></i>`}
    let sunriseElement = document.querySelector("#sunrise"); 
    sunriseElement.innerHTML = formatTime(response.data.sys.sunrise*1000);
    let sunsetElement = document.querySelector("#sunset");
    sunsetElement.innerHTML = formatTime(response.data.sys.sunset*1000);
    let feelsLikeElement = document.querySelector("#feelsLike");
    feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
    console.log(response.data.main.feels_like)

    getForecast(response.data.coord);
}

function searchCity(city){
    let apiKey = "dae43417d2ff1d99a68e276b41145b89";
    let unit="metric";
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayData);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input"); 
    if (cityInputElement.value !== "") {
    let city ="";
    city = cityInputElement.value.trim();
    city = city[0].toUpperCase() + city.substring(1);
    searchCity(city);
  }
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = Math.round((celsiusTemperature * 9)/5+32);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = fahrenheitTemperature;
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature); 
}

function searchLocation(position){
    let latitude =position.coords.latitude;
    let longitude = position.coords.longitude;
    let unit =`metric`;
    let apiKey = `dae43417d2ff1d99a68e276b41145b89`;
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayData);
}

function getCurrentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


let currentLocationElement = document.querySelector("#current-location-button");
currentLocationElement.addEventListener("click", getCurrentLocation);


searchCity("Solothurn");