import './main.css';
import WeatherInfo from './class';
import { handleDom } from './dom';
import * as utils from './utils.js';
const API_KEY = '5MCQESZNU5WX7MXQAR4T6T8JH';
const submitBtn = document.querySelector(
    '#location-form button[type="submit"]'
);

const locationForm = document.querySelector('#location-form');
const searchInput = document.querySelector('#search');

async function getWeather(city, unitGroup) {
    submitBtn.disabled = true;
    try {
        handleDom.loadSkeletons();
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=${API_KEY}`
        );
        if (!response.ok) {
            switch (response.status) {
                case 400:
                    handleDom.showError(
                        'Bad request — please check the location you entered.'
                    );
                    return;
                case 401:
                    handleDom.showError(
                        'Unauthorized — please check your API key.'
                    );
                    return;
                case 403:
                    handleDom.showError(
                        'Forbidden — quota exceeded or access denied.'
                    );
                    return;
                case 404:
                    handleDom.showError(`Location "${city}" not found.`);
                    return;
                case 429:
                    handleDom.showError(
                        'Rate limit exceeded — please try again later.'
                    );
                    return;
                default:
                    if (response.status >= 500) {
                        handleDom.showError(
                            'Server error — please try again later.'
                        );
                        return;
                    }
                    handleDom.showError(`Unexpected error: ${response.status}`);
                    return;
            }
        }
        const data = await response.json();
        const currentWeather = new WeatherInfo(
            data.description,
            data.currentConditions.temp,
            data.resolvedAddress,
            data.currentConditions.conditions,
            data.currentConditions.icon,
            data.currentConditions.humidity,
            data.currentConditions.feelslike,
            data.currentConditions.windspeed,
            data.currentConditions.winddir,
            data.currentConditions.uvindex,
            data.currentConditions.sunrise,
            data.currentConditions.sunset,
            data.days.slice(1, 8),
            data.currentConditions.dew,
            data.currentConditions.snow,
            data.currentConditions.visibility,
            data.currentConditions.pressure,
            data.currentConditions.moonphase,
            data.currentConditions.solarenergy,
            data.currentConditions.precipprob,
            data.currentConditions.cloudcover,
            data.alerts,
            data.timezone
        );
        handleDom.displayWeatherInfo(currentWeather);
    } catch {
        handleDom.showError('Network error — please try again.');
    } finally {
        submitBtn.disabled = false;
    }
}
async function initApp() {
    // get weather for the detected location
    getWeather(
        await utils.handleLocation.getLocation(),
        utils.handleUnitGroup.getUnitGroup()
    );

    // Add event listeners
    locationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (searchInput.value) {
            getWeather(searchInput.value, utils.handleUnitGroup.getUnitGroup());
            utils.handleLocation.setLocation(searchInput.value);
        }
    });
    document.querySelectorAll('.unit-toggle .unit').forEach((btn) => {
        btn.addEventListener('click', async () => {
            document
                .querySelector('.unit-toggle .active')
                ?.classList.remove('active');
            btn.classList.add('active');
            if (btn.textContent == '°C') {
                utils.handleUnitGroup.setUnitGroup('metric');
            } else {
                utils.handleUnitGroup.setUnitGroup('us');
            }
            getWeather(
                await utils.handleLocation.getLocation(),
                utils.handleUnitGroup.getUnitGroup()
            );
        });
    });

    document.querySelectorAll('.theme-option').forEach((btn) => {
        btn.addEventListener('click', () => {
            document
                .querySelector('.theme-option.active')
                ?.classList.remove('active');
            btn.classList.add('active');

            const selectedTheme = btn.dataset.theme;
            document.documentElement.setAttribute('data-theme', selectedTheme);

            // Store preference
            localStorage.setItem('theme', selectedTheme);
        });
    });

    // Load saved theme on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.querySelectorAll('.theme-option').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.theme === savedTheme);
        });
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

initApp();
