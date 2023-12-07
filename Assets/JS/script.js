var search = document.getElementById('search');
var mainSubmit = document.querySelector('main-submit');
var city = document.querySelector('city')
var date = document.querySelector('date');
var humidity = document.querySelector('humidity');
var wind = document.querySelector('wind');
var temp = document.querySelector('termperature');


var weatherAPIKey = '4edbc2e4e408c4f8b63a6eb2e13be206';
var weatherEndPoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + weatherAPIKey;


// search.addEventListener('keydown', async (e) => {
//     if(e.keyCode === 13) {
//         let currentWeather = await byCityNameWeather(search.value);
//         console.log(e);
//     }
// });

// mainSubmit.addEventListener('click', function() {
//     alert('hello');
// });

// var byCityNameWeather = async (city) => {
//     let end = weatherEndPoint + '&q=' + city;
//     let response = await fetch (end);
//     let currentWeather = await response.json();
//     return currentWeather;
    
// }

// byCityNameWeather();


// from AI - Still doesn't work except the button.
const apiKey = '4edbc2e4e408c4f8b63a6eb2e13be206';
const weatherResult = document.querySelector('left-Box');

function getWeather() {
    const city = document.querySelector('city').value;

    // Check if the city is provided
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    // Fetch weather data from OpenWeatherMap API
    fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}')
        .then(response => response.json())
        .then(data => {
            // Display weather information on the page
            const weatherInfo = `City: ${data.name}, Temperature: ${data.main.temp}°C, Description: ${data.weather[0].description}`;
            weatherResult.textContent = weatherInfo;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}