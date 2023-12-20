let api
var apiKey = "a49f6674d7c42aca933797552831da83";

const forecastApiRootUrl ="https://api.openweathermap.org/data/2.5/forecast?"
const currentWeatherUrl ="https://api.openweathermap.org/data/2.5/weather?"

var search = document.querySelector('.search').value; //search bar
var btn  = document.querySelector('.main-submit'); //Button
var temp = document.querySelector('.temperature'); //for populating the application
var humid = document.querySelector('.humidity'); //for populating the application
var wind = document.querySelector('.winds'); //for populating the application
var press = document.querySelector('.preassure'); //for populating the application
var city = document.getElementById('.city'); //for populating the application
const apiUrl = `${currentWeatherUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${keyAPIWeather}`
const apiUrl2 = `${forecastApiRootUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${keyAPIWeather}`

function obtainApi(city) {
   
  api = `${currentWeatherUrl}${city}&units=metric&appid=${apiKey}`
  fectchWeatherData()
}

function getWeatherData() {
  infoText.innerText="Getting weather info..."
  infoText.classList.add("pending")
//...get server and return api response
  fetch(api).then(response => response.json()).
  then(result => weatherDetails(result)) 
}

function weatherDetails(info){
  infoText.classList.replace("pending", "error") //..our css style changes the text info background 
  if(info.cod == "404"){ //..cod is an object called from the weather api
      infoText.innerText = `You entered ${inputField.value} which isn't a valid city` //..checks for validation
  } else{
       //..get api data to properties in info-text   
      const city = info.name
      const country = info.sys.country
      const {description, id} = info.weather[0]
      const{feels_like,humidity, temp} = info.main

      //..parse the above values into the html elements 
      container.querySelector(".row, .temerature").innerText = Math.floor(temp) //..round up number to nearest Integer
      container.getElementById("#city").innerHTML = `${city}`
      container.querySelector(".date").innerHTML = `${date}`
      container.querySelector(".humidity span").innerHTML = `${humidity}%`
     infoText.classList.remove("pending", "error") //..if we get the correct city from the api we hide pending and error message
     
  }
}

btn.addEventListener("click", ()=>{
  if(navigator.geolocation){ //..if user's browser supports geolocation
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
  } else {
      alert("Browser doesn't support geolocation api")
  }
})

function onSuccess(position){
  const {latitude, longitude} = position.coords //..getting the lat and long from coordinator object
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
  //..addded {&units=metric} to the api to round up the number
  fectchWeatherData()
}

function onError(error){
infoText.innerText = error.message //..html text will display error message
infoText.classList.add("error")
}

inputField.addEventListener("click", e=>{
  //... input value is not empty 
  if(e.key == "Enter" && inputField.value !=""){
      requestApi(inputField.value)
  }
})
