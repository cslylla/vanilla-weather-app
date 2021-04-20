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

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
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

let apiKey = "dae43417d2ff1d99a68e276b41145b89";
let unit="metric";
let city= "Paris";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);