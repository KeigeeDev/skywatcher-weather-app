export function getWeatherCategory(condition) {
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
