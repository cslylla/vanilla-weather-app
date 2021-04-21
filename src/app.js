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
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    
}

function search(city){
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
    search(city);
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

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Solothurn");