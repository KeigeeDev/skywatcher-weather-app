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
        document.getElementById('error-message').style.display = 'flex';
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

    // Get the background image URL for this weather category
    const backgroundMap = {
        'clear': 'images/clear.jpg',
        'cloudy': 'images/cloudy.jpg',
        'rain': 'images/rain.jpg',
        'snow': 'images/snow.jpg',
        'thunder': 'images/thunder.jpg',
        'fog': 'images/fog.jpg',
        'default': 'images/default.jpg'
    };

    const backgroundUrl = backgroundMap[weatherCategory] || backgroundMap['default'];

    // Crossfade implementation using ::before pseudo-element
    const img = new Image();
    img.onload = function () {
        // Set the new background on the ::before layer
        const styleSheet = document.styleSheets[0];
        const beforeRule = Array.from(styleSheet.cssRules).find(
            rule => rule.selectorText === 'body::before'
        );
        if (beforeRule) {
            beforeRule.style.backgroundImage = `url('${backgroundUrl}')`;
        }

        // Trigger fade-in by adding transitioning class
        document.body.classList.add('transitioning');

        // After transition completes, swap backgrounds and reset
        setTimeout(() => {
            document.body.className = `weather-${weatherCategory}`;
            document.body.classList.remove('transitioning');
            // Reset ::before opacity for next transition
            if (beforeRule) {
                beforeRule.style.backgroundImage = '';
            }
        }, 800); // Match the CSS transition duration
    };
    img.src = backgroundUrl;
}

function getWeatherCategory(condition) {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle') || lowerCaseCondition.includes('shower')) {
        return 'rain';
    } else if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('sleet') || lowerCaseCondition.includes('ice') || lowerCaseCondition.includes('blizzard')) {
        return 'snow';
    } else if (lowerCaseCondition.includes('thunder')) {
        return 'thunder';
    } else if (lowerCaseCondition.includes('cloud') || lowerCaseCondition.includes('overcast')) {
        return 'cloudy';
    } else if (lowerCaseCondition.includes('mist') || lowerCaseCondition.includes('fog')) {
        return 'fog';
    } else if (lowerCaseCondition.includes('sunny') || lowerCaseCondition.includes('clear')) {
        return 'clear';
    } else {
        return 'default';
    }
}


function handleError(city) {
    errorMessageElement.innerHTML = `
        <span>
        <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </span>
        <p>Uh oh! We couldn't find that "${city}".</p>
        
    `;
}