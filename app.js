// select element
const iconELement = document.querySelector('.weather-icon')
const tempELement = document.querySelector('.temperature-value p')
const descELement = document.querySelector('.temperature-description p')
const locationELement = document.querySelector('.location p')

// ap data

const weather = {}
weather.temperature= {
  unit: 'celsius'
}

const KELVIN = 273

const key = '5a58188830ae0515a2b1d18e9aca7c6a'

//get Weather
function getWeather() {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=Ho%20Chi%20Minh%20City,VN&APPID=${key}`

  fetch(api).then(function(response) {
    let data = response.json()
    return data
  }).then(function(data) {
    weather.temperature.value = Math.floor(data.main.temp - KELVIN)
    weather.description = data.weather[0].description
    weather.iconId = data.weather[0].icon
    weather.city = data.name
    weather.country = data.sys.country
  }).then(function() {
    displayWeather()
  })
}

//Display Weather UI
function displayWeather() {
  iconELement.innerHTML = `<img src="icons/${weather.iconId}.png" alt="">`
  tempELement.innerHTML = `${weather.temperature.value}°<span>C</span>`
  descELement.innerHTML = weather.description
  locationELement.innerHTML = `${weather.city}, ${weather.country}`
}

// convert °C to °F
function celsiusToFahrenheit(temperature) {
  return (temperature * 9/5) + 32
}

tempELement.addEventListener('click', function() {
  if(weather.temperature.value === 'underfined') return
    if(weather.temperature.unit == 'celsius') {
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
      fahrenheit = Math.floor(fahrenheit)
      tempELement.innerHTML = `${fahrenheit}°<span>F</span>`
      weather.temperature.unit = 'fahrenheit'
    } else {
      tempELement.innerHTML = `${weather.temperature.value}°<span>C</span>`
      weather.temperature.unit = 'celsius'
    }
})

getWeather()