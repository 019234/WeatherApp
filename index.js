
console.log("Weather app script loaded!");


function getWeather() {

    const apiKey = 'bb824edbb02db5c2e6e68acf8098f26c';
    const city = encodeURIComponent(document.getElementById('city').value.trim());

    if (!city) {
        alert('please enter a City');
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('error fetching current weather data', error);
            alert('Error fetching current weather data. Please try again.');
        })

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('error fetching hourly forecast data', error);
            alert('Error fetching hourly forecast data. Please try again.');
        })

}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // ✅ Clear previous content properly
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    weatherIcon.src = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHTML = `
    <p>${cityName}</p>
    <p>${description}</p>
  `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    weatherIcon.style.display = 'block';

    const background = document.getElementById('background');
    const mainWeather = data.weather[0].main.toLowerCase();

    let gifUrl = '';

    switch (mainWeather) {
        case 'clear':
            gifUrl = 'https://i.gifer.com/Lx0q.gif'; // sunny
            break;
        case 'clouds':
            gifUrl = 'https://i.gifer.com/LSzq.gif'; // cloudy
            break;
        case 'rain':
            gifUrl = 'https://i.gifer.com/6xF.gif'; // rainy
            break;
        case 'thunderstorm':
            gifUrl = 'https://i.gifer.com/DNx.gif'; // storm
            break;
        case 'snow':
            gifUrl = 'https://i.gifer.com/7Ik1.gif'; // snow
            break;
        case 'mist':
        case 'fog':
            gifUrl = 'https://i.gifer.com/9vZL.gif'; // foggy
            break;
        default:
            gifUrl = 'https://i.gifer.com/1pX9.gif'; // default
    }

    background.style.backgroundImage = `url('${gifUrl}')`;
}


function displayHourlyForecast(hourlyData) {

    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {

        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const hourlyItemHtml = `
        <div class= "hourly-item">
           <img src="${iconUrl}" alt="Hourly Weather Icon">
          <span>${temperature}°C</span>

        </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
