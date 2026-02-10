import { loadingEl, errorMessageElement } from './domRefs.js';
import { updateUI, handleError } from './weatherUI.js';
import { CONFIG } from '../config/config.js';

export async function getWeatherData(query) {
    const API_KEY = CONFIG.WEATHER_API_KEY;
    const URL = `${CONFIG.BASE_URL}?key=${API_KEY}&q=${query}&aqi=no`;

    loadingEl.style.display = 'block';

    const response = await fetch(URL);

    if (!response.ok) {
        handleError(query);
        errorMessageElement.style.display = 'flex';
        loadingEl.style.display = 'none';
    } else {
        updateUI(await response.json());
        errorMessageElement.style.display = 'none';
        loadingEl.style.display = 'none';
    }
}
