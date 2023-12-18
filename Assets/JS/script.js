var keyAPIWeather = "a49f6674d7c42aca933797552831da83";
// https://api.openweathermap.org/data/3.0/onecall?lat=


var search = document.querySelector('.search');
var btn  = document.querySelector('.main-submit');
var temp = document.querySelector('.temperature');
var humid = document.querySelector('.humidity');
var wind = document.querySelector('.winds');
var press = document.querySelector('.preassure');


// Add an event listener for the button click
btn.addEventListener('click', function () {
  var cityInput = search.value.trim();
  if (cityInput !== '') {
    citySubmit(cityInput);
  } else {
    alert('Please enter a city name.');
  }
});

function citySubmit(cityInput) {
  // Convert city name to coordinates using a geocoding API or another method
  // Replace the placeholders below with the actual latitude and longitude coordinates
  var latitude = 0; // Replace with actual latitude
  var longitude = 0; // Replace with actual longitude

  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${keyAPIWeather}&units=metric;`

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var currentWeather = data.current;

      // Extract the relevant information from the API response
      var temperature = currentWeather.temp;
      var humidity = currentWeather.humidity;
      var winds = currentWeather.wind_speed;
      var pressure = currentWeather.pressure;

      // Update the DOM with the retrieved data
      temp.textContent = `Temperature: ${temperature}°C`;
      humid.textContent = `Humidity: ${humidity}%`;
      wind.textContent = `Wind Speed: ${winds} m/s`;
      press.textContent = `Pressure: ${pressure} hPa`;
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Unable to fetch weather data. Please try again later.');
    });
}