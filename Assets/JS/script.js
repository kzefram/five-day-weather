var keyAPIWeather = "a49f6674d7c42aca933797552831da83";
var forecastApiRootUrl ="https://api.openweathermap.org/data/2.5/forecast?"
var currentWeatherUrl ="https://api.openweathermap.org/data/2.5/weather?"


var search = document.querySelector('.search');
var btn  = document.querySelector('.main-submit');
var temp = document.querySelector('.temperature');
var humid = document.querySelector('.humidity');
var wind = document.querySelector('.winds');
var press = document.querySelector('.preassure');
var city = document.querySelector('.city');


// Adding an event listener for the button click
btn.addEventListener('click', function () {
  var cityInput = search.value.trim();
  if (cityInput !== '') {
    citySubmit(cityInput);
  } else {
    alert('Please enter a city name.');
  }
});

function citySubmit(cityInput) {
  // Convert city name to coordinates
  var latitude = 20.98; 
  var longitude = -71.98; 

  var apiUrl = `${currentWeatherUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${keyAPIWeather}`


  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var currentWeather = data.current;
      console.log(data);

      // Extracting the relevant information from the API response
      var temperature = currentWeather.temp;
      var humidity = currentWeather.humidity;
      var winds = currentWeather.wind_speed;
      var pressure = currentWeather.pressure;

      function cityL1(cityInput) {
        localStorage.setItem('city', cityInput);
        const city = localStorage.getItme('city');
      }

      cityL1(cityInput);

      // Update the DOM with the retrieved data
      //city.textContent = 'City: ${city}';
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