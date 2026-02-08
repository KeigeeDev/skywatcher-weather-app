const errorMessageElement = document.getElementById('error-message');
const tempDisplay = document.getElementById('temperature');
const cityDisplay = document.getElementById('city-name');
const conditionDisplay = document.getElementById('condition');
const humidityDisplay = document.getElementById('humidity');
const windSpeedDisplay = document.getElementById('wind-speed');
const weatherIcon = document.getElementById('weather-icon');

async function getWeatherData(city) {
    const API_KEY = CONFIG.WEATHER_API_KEY;
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    const response = await fetch(URL);
    if (!response.ok) {
        handleError(city);
    } else {
        updateUI(await response.json());
    }
}

function updateUI(data) {
    errorMessageElement.textContent = '';
    tempDisplay.innerText = `Temperature: ${Math.round(data.current.temp_c)}°C`;
    cityDisplay.innerText = `City: ${data.location.name}`;
    conditionDisplay.innerText = `Condition: ${data.current.condition.text}`;
    humidityDisplay.innerText = `Humidity: ${data.current.humidity}%`;
    windSpeedDisplay.innerText = `Wind Speed: ${data.current.wind_kph} km/h`;
    weatherIcon.src = data.current.condition.icon;
    weatherIcon.style.display = 'block';
    const condition = data.current.condition.text.toLowerCase();
    // updateBackground(condition);
}

function handleError(city) {
    errorMessageElement.innerText = `Uh oh! We couldn't find that "${city}".`;
}