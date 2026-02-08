async function getWeatherData(city) {
    const API_KEY = CONFIG.WEATHER_API_KEY;
    const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error('City not found');
    }

    return await response.json();
}