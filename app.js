function formatDate(timestamp){
    //calculate the date
    let date = new Date(timestamp);
    
    //return time with 2 digits
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10 ){
        minutes = `0${minutes}`;
    }
    //return time with 2 digits

    //return day of week not number
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];
    //return day of week not number
    return `${day} ${hours}:${minutes}`;
}
//replicate first day of forecast to expand to five days using a LOOP (looping through an array)
function displayForecast(){
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Thu","Fri","Sat", "Sun"];
    days.forEach(function(day) {
        forecastHTML = forecastHTML + `
        <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img 
            src="http://openweathermap.org/img/wn/02d@2x.png" 
            alt="cloudy" 
            width="30"
         />
        <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">70°</span>
            <span class="weather-forecast-temp-min">50°</span>
        </div>
        </div> 
        `;
    })

   
forecastHTML = forecastHTML + `</div>`;   
forecastElement.innerHTML = forecastHTML;
}
















//pull weather data from Openweather API
function getForecast(coordinates){
    let apiKey = "701f06352d61835bc4fc894e7b084629";
    let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);


}

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");


//Storing F temp inside variable for use later
//Calling 8 day forecast weather API
fahrenheitTemp = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    iconElement.setAttribute("alt", response.data.weather[0].description)

getForecast(response.data.coord);




}

//Make search button work and use the input city to pull weather data from API (1 of 3)
function search(city){
    let apiKey = "5aac6d0188c6f17d6d2bbe6591b6fef0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event){
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}
//Convert from fahrenheit to celsius (1 of 3)
function showCelsiusTemp(event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
//remove active class
fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
let celsiusTemp = ((fahrenheitTemp-32) * 5/9);
temperatureElement.innerHTML = Math.round(celsiusTemp);
}

//Below is continuation from fahrenheit to celsius (2 of 3)
function showFahrenheitTemp(event){
event.preventDefault();
//remove and add active class
fahrenheitLink.classList.add("active");
celsiusLink.classList.remove("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;



//Below is continuation of search button (2 of 3)
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Below is continuation from fahrenheit to celsius (3 of 3)
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

//Below is continuation of search button (3 of 3)
search("Malibu");
displayForecast();