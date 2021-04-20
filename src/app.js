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
}

let apiKey = "dae43417d2ff1d99a68e276b41145b89";
let unit="metric"
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=Solothurn&units=${unit}&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);