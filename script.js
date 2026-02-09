const errorMessageElement = document.getElementById('error-message');
const tempDisplay = document.getElementById('temperature');
const cityDisplay = document.getElementById('city-name');
const conditionDisplay = document.getElementById('condition');
const humidityDisplay = document.getElementById('humidity');
const windSpeedDisplay = document.getElementById('wind-speed');
const weatherIcon = document.getElementById('weather-icon');

document.getElementById('error-message').style.display = 'none';

document.getElementById('city-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        getWeatherData(this.value);
    }
});

async function getWeatherData(city) {
    const API_KEY = CONFIG.WEATHER_API_KEY;
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    document.getElementById('loading').style.display = 'block';


    const response = await fetch(URL);
    if (!response.ok) {
        handleError(city);
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        updateUI(await response.json());
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('loading').style.display = 'none';
    }
}

function updateUI(data) {
    errorMessageElement.textContent = '';
    document.getElementById('weather-info').classList.add('show');
    tempDisplay.innerText = `Temperature: ${Math.round(data.current.temp_c)}°C`;
    cityDisplay.innerText = `City: ${data.location.name}`;
    conditionDisplay.innerText = `Condition: ${data.current.condition.text}`;
    humidityDisplay.innerText = `Humidity: ${data.current.humidity}%`;
    windSpeedDisplay.innerText = `Wind Speed: ${data.current.wind_kph} km/h`;
    weatherIcon.src = data.current.condition.icon;
    weatherIcon.style.display = 'block';
    const condition = data.current.condition.text.toLowerCase();
    const weatherCategory = getWeatherCategory(condition);
    document.body.className = `weather-${weatherCategory}`;
}

function getWeatherCategory(condition) {
    const lowerCaseCondition = condition.toLowerCase();
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
        return 'rain';
    } else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice') || condition.includes('blizzard')) {
        return 'snow';
    } else if (condition.includes('thunder')) {
        return 'thunder';
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
        return 'cloudy';
    } else if (condition.includes('mist') || condition.includes('fog')) {
        return 'fog';
    } else if (condition.includes('sunny') || condition.includes('clear')) {
        return 'clear';
    } else {
        return 'default';
    }
}

function handleError(city) {
    errorMessageElement.innerText = `Uh oh! We couldn't find that "${city}".`;
}