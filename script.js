//using async function because it's a more modern way to get instantaneous results
async function fetchWeather() {
    const city = document.getElementById('city-input').value;
    if (city) {
        const apiKey = 'c2887e0473cbf866ba423f7454bff6b8'; // Needed to get the weather data API key from site 
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

// used template literals es6

        try {
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();

            displayWeather(weatherData);
            displayForecast(forecastData);

        } catch (error) {
            alert("Error fetching weather data. Please try again.");
            console.error(error);
        }
    } else {
        alert("For the love of god enter a city's name!!");
    }
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°F`;
    document.getElementById('weather-condition').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} mph`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById('weather-display').classList.remove('hidden');
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    // Forecast data to get entries at 12:00 PM each day
    const forecastItems = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    forecastItems.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        const date = new Date(item.dt_txt).toLocaleDateString();
        const temp = `${item.main.temp}°F`;
        const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        const description = item.weather[0].description;

        forecastItem.innerHTML = `
            <h3>${date}</h3>
            <img src="${icon}" alt="Weather Icon">
            <p>${temp}</p>
            <p>${description}</p>
        `;

        forecastContainer.appendChild(forecastItem);
    });
}
