const apiKey = '8da89f7837af791a0e983b0b54e93e75';
const weatherInfoContainer = document.getElementById('weather-info');
const cityHeading = document.getElementById('city-heading');

function searchWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const countryInput = document.getElementById('countryInput').value;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput},${countryInput}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    weatherInfoContainer.innerHTML = '';

    // Display today's weather
    const todayWeather = data.list[0];
    const todayCard = createWeatherCard(todayWeather, 'Today');
    weatherInfoContainer.appendChild(todayCard);

    // Display next 5 days' weather
    for (let i = 1; i <= 5; i++) {
        const nextDayWeather = data.list[i * 8]; // Skip 8 timestamps for each next day
        const nextDayCard = createWeatherCard(nextDayWeather, `Day ${i}`);
        weatherInfoContainer.appendChild(nextDayCard);
    }

    // Set city heading
    cityHeading.textContent = `${data.city.name}, ${data.city.country}`;
}

function createWeatherCard(weather, day) {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');
    
    weatherCard.innerHTML = `
        <h2>${day}</h2>
        <p>${weather.weather[0].description}</p>
        <p>Temperature: ${Math.round(weather.main.temp - 273.15)}°C</p>
        <p>Humidity: ${weather.main.humidity}%</p>
    `;

    return weatherCard;
}
