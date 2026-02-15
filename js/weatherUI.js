import {
    errorMessageElement,
    tempDisplay,
    cityDisplay,
    conditionDisplay,
    humidityDisplay,
    windSpeedDisplay,
    weatherIcon,
    weatherInfo
} from './domRefs.js';

import { getWeatherCategory } from './weatherUtils.js';

export function updateUI(data) {
    errorMessageElement.textContent = '';
    weatherInfo.classList.add('show');

    tempDisplay.innerText = `${Math.round(data.current.temp_c)}°C`;
    cityDisplay.innerText = `${data.location.name}`;
    conditionDisplay.innerText = `${data.current.condition.text}`;
    humidityDisplay.innerText = `${data.current.humidity}%`;
    windSpeedDisplay.innerText = `${data.current.wind_kph} km/h`;

    weatherIcon.src = data.current.condition.icon;
    weatherIcon.style.display = 'block';

    const condition = data.current.condition.text.toLowerCase();
    const weatherCategory = getWeatherCategory(condition);

    const backgroundMap = {
        clear: '../assets/images/clear.jpg',
        cloudy: '../assets/images/cloudy.jpg',
        rain: '../assets/images/rain.jpg',
        snow: '../assets/images/snow.jpg',
        thunder: '../assets/images/thunder.jpg',
        fog: '../assets/images/fog.jpg',
        default: '../assets/images/default.jpg'
    };

    const backgroundUrl = backgroundMap[weatherCategory] || backgroundMap.default;

    const img = new Image();
    img.onload = function () {
        const styleSheet = document.styleSheets[0];
        const beforeRule = Array.from(styleSheet.cssRules).find(
            rule => rule.selectorText === 'body::before'
        );

        if (beforeRule) {
            beforeRule.style.backgroundImage = `url('${backgroundUrl}')`;
        }

        document.body.classList.add('transitioning');

        setTimeout(() => {
            document.body.className = `weather-${weatherCategory}`;
            document.body.classList.remove('transitioning');

            if (beforeRule) {
                beforeRule.style.backgroundImage = '';
            }
        }, 800);
    };

    img.src = backgroundUrl;
}

export function handleError(city) {
    errorMessageElement.innerHTML = `
    <span>
      <svg xmlns="http://www.w3.org/2000/svg" class="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
    <p>Uh oh! We couldn't find that "${city}".</p>
  `;
}
