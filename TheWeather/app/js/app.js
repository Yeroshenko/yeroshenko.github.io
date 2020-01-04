document.addEventListener('DOMContentLoaded', () => {

  const iconEl = document.querySelector('.weather__icon'),
        tempEl = document.querySelector('.weather__temperature'),
        descEl = document.querySelector('.weather__descr'),
        locationEl = document.querySelector('.weather__location'),
        notificationEl = document.querySelector('.notification');

  const weather = {};

  weather.temperature = {
    unit: 'celsius'
  };

  const KELVIN = 273;

  // API KEY
  const key = "82005d27a116c2880c8f0fcb866998a0";

  // CHECK IF BROWSER SUPPORTS GEOLOCATION
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    notificationEl.style.display = 'block';
    notificationEl.innerHTML = `Browser doesn't Support Geolocation`;
  }

  // SET USER'S POSITION
  function setPosition(position) {
    let latitude = position.coords.latitude,
        longitude = position.coords.longitude;

    getWeather(latitude, longitude);

  }

  // SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
  function showError(error) {
    notificationEl.style.display = 'block';
    notificationEl.innerHTML = `${error.message}`;
  }
  
  // GET WEATHER FROM API PROVIDER
  function getWeather(latitude, longitude) {
    
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api) 
      .then((responce) => {
        let data = responce.json();
        return data;
      })
      .then((data) => {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
      })
      .then(() => {
        displayWeather();
      });
  }

  // DISPLAY WEATHER TO UI
  function displayWeather() {
    iconEl.innerHTML =`<img src="img/icons/${weather.iconId}.svg" class="weather__icon-img">`;
    tempEl.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descEl.innerHTML = `${weather.description}`;
    locationEl.innerHTML = `${weather.city}, ${weather.country}`;
  }

  // C TO F CONVERSION 
  function celsiusToFarenheit(temperature) {
    return (temperature * 9 / 5) + 32;
  }

  // USER CLICKS ON THE TEMPERATURE ELEMENET
  tempEl.addEventListener('click', () => {
    if (weather.temperature.value === undefined) { return; }

    if (weather.temperature.unit === 'celsius') {

      const farenheitValue = celsiusToFarenheit(weather.temperature.value);

      tempEl.innerHTML = `${farenheitValue}°<span>F</span>`;
      weather.temperature.unit = 'farenheit';
    } else {

      tempEl.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      weather.temperature.unit = 'celsius';      
    }
  });
});
