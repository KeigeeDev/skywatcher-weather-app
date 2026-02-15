export default async function handler(req, res) {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    const baseUrl = process.env.BASE_URL;

    if (!apiKey || !baseUrl) {
        console.error('Missing environment variables:', { apiKey: !!apiKey, baseUrl: !!baseUrl });
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(city)}`;
        console.log(`Fetching weather from: ${url.replace(apiKey, 'HIDDEN')}`);

        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Weather API responded with status ${response.status}: ${errorText}`);
            return res.status(response.status).json({ error: 'Failed to fetch weather data' });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in weather handler:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}