import { cityInput, errorMessageElement, searchButton } from './domRefs.js';
import { getWeatherData } from './weatherService.js';
import { getUserLocation } from './locationService.js';

errorMessageElement.style.display = 'none';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const locationQuery = await getUserLocation();
        getWeatherData(locationQuery);
    } catch (err) {
        // Fallback city
        getWeatherData('Manila');
    }
});

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) return;

    getWeatherData(city);
});
cityInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (!city) return;
        getWeatherData(city);
    }
});
