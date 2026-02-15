import { loadingEl, errorMessageElement } from './domRefs.js';
import { updateUI, handleError } from './weatherUI.js';

export async function getWeatherData(query) {
    loadingEl.style.display = 'block';

    try {
        // Call the Vercel API endpoint instead of importing the handler
        const response = await fetch(`/api/weather?city=${encodeURIComponent(query)}`);

        if (!response.ok) {
            handleError(query);
            errorMessageElement.style.display = 'flex';
            loadingEl.style.display = 'none';
            return;
        }

        const data = await response.json();
        updateUI(data);
        errorMessageElement.style.display = 'none';
        loadingEl.style.display = 'none';
    } catch (error) {
        console.error('Error fetching weather:', error);
        handleError(query);
        errorMessageElement.style.display = 'flex';
        loadingEl.style.display = 'none';
    }
}
