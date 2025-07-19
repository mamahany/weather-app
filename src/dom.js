import * as utils from './utils.js';
import { format } from 'date-fns-tz';
export const handleDom = (function () {
    const sidebar = document.querySelector('.sidebar');
    const contentDiv = document.querySelector('.main');
    function displayWeatherInfo(obj) {
        sidebar.innerHTML = ``;
        const desc = document.createElement('p');
        desc.textContent = obj.description;
        let sidebarData = [
            {
                name: 'Wind Speed',
                value:
                    obj.windSpeed +
                    (utils.handleUnitGroup.getUnitGroup() == 'us'
                        ? ' mph'
                        : ' km/h'),
            },
            { name: 'Wind Direction', value: obj.windDir + '°' },
            { name: 'Sunrise', value: utils.formatAMPM(obj.sunrise) },
            { name: 'Sunset', value: utils.formatAMPM(obj.sunset) },
            {
                name: 'Dew Point',
                value:
                    obj.dew +
                    (utils.handleUnitGroup.getUnitGroup() == 'us'
                        ? ' °F'
                        : ' °C'),
            },
            {
                name: 'Visibility',
                value:
                    obj.visibility +
                    (utils.handleUnitGroup.getUnitGroup() == 'us'
                        ? ' miles'
                        : ' km'),
            },
            {
                name: 'Pressure',
                value:
                    obj.pressure +
                    (utils.handleUnitGroup.getUnitGroup() == 'us'
                        ? ' inHg'
                        : ' hPa (mb)'),
            },
            { name: 'Moon Phase', value: obj.moonphase },
            {
                name: 'Solar Energy',
                value:
                    obj.solarenergy +
                    (utils.handleUnitGroup.getUnitGroup() == 'us'
                        ? ' BTU/ft²'
                        : ' MJ/m²'),
            },
            { name: 'Cloud Cover', value: obj.cloudcover + ' %' },
            {
                name: 'Snow',
                value:
                    obj.snow +
                    (utils.handleUnitGroup.getUnitGroup() == 'us'
                        ? ' inches'
                        : ' cm'),
            },
        ];
        const sidebarDataGrid = document.createElement('div');
        sidebarDataGrid.classList.add('sidebar-data-grid');
        sidebarData.forEach((element) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const cellName = document.createElement('p');
            const cellValue = document.createElement('p');
            cellName.classList.add('name');
            cellValue.classList.add('value');
            cellName.textContent = element.name;
            cellValue.textContent = element.value;
            cell.appendChild(cellName);
            cell.appendChild(cellValue);
            sidebarDataGrid.appendChild(cell);
        });
        sidebar.appendChild(desc);
        sidebar.appendChild(sidebarDataGrid);

        contentDiv.innerHTML = ``;
        const todayDiv = document.createElement('div');
        todayDiv.classList.add('today-div');
        const contentData = [
            { name: 'Humidity', value: obj.humidity + ' %' },
            {
                name: 'Feels Like',
                value:
                    obj.feelslike +
                    (utils.handleUnitGroup.getUnitGroup() == 'us'
                        ? ' °F'
                        : ' °C'),
            },
            { name: 'Conditions', value: obj.conditions },
            { name: 'Rain Chance', value: obj.precip + ' %' },
        ];
        const img = document.createElement('img');
        import(`./assets/svg/${iconMap[obj.icon]}`).then((icon) => {
            img.src = icon.default;
        });
        const contentDataGrid = document.createElement('div');
        contentDataGrid.classList.add('today-data-grid');
        contentData.forEach((element) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const cellName = document.createElement('p');
            const cellValue = document.createElement('p');
            cellName.classList.add('name');
            cellValue.classList.add('value');
            cellName.textContent = element.name;
            cellValue.textContent = element.value;
            cell.appendChild(cellName);
            cell.appendChild(cellValue);
            contentDataGrid.appendChild(cell);
        });
        const tempDiv = document.createElement('div');
        tempDiv.classList.add('temp-div');
        const tempH = document.createElement('h1');
        const tempUnit = document.createElement('span');
        tempUnit.textContent =
            utils.handleUnitGroup.getUnitGroup() == 'us' ? ' °F' : ' °C';
        const tempValue = document.createElement('div');
        tempValue.appendChild(tempH);
        tempValue.appendChild(tempUnit);
        tempH.textContent = obj.temp;
        const locationP = document.createElement('p');
        locationP.textContent =
            obj.address + ' | ' + utils.formatLocalTime(obj.timezone);
        tempDiv.appendChild(tempValue);
        tempDiv.appendChild(locationP);

        const visual = document.createElement('div');
        visual.appendChild(tempDiv);
        visual.appendChild(contentDataGrid);
        todayDiv.appendChild(img);
        todayDiv.appendChild(visual);

        const forcastDiv = document.createElement('div');
        forcastDiv.classList.add('forecast-div');
        obj.forecastDays.forEach((day) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const dayName = document.createElement('h3');
            dayName.textContent = format(new Date(day.datetime), 'EEE');
            const dayIcon = document.createElement('img');
            import(`./assets/svg/${iconMap[day.icon]}`).then((icon) => {
                dayIcon.src = icon.default;
            });
            const tempMaxMin = document.createElement('p');
            tempMaxMin.textContent = day.tempmax + '° / ' + day.tempmin + '°';
            cell.appendChild(dayName);
            cell.appendChild(dayIcon);
            cell.appendChild(tempMaxMin);
            forcastDiv.appendChild(cell);
        });
        contentDiv.appendChild(todayDiv);
        contentDiv.appendChild(forcastDiv);
    }
    function showError(str) {
        const errorBox = document.querySelector('.error-box');
        errorBox.innerHTML = '';
        const errorMsg = document.createElement('p');
        errorMsg.textContent = str;
        errorBox.appendChild(errorMsg);
        errorBox.style.display = 'block';
        setTimeout(() => {
            errorBox.style.display = 'none';
        }, 3500);
    }
    function loadSkeletons() {
        sidebar.innerHTML = `                <div class="sidebar-skeleton">
              <div class="skeleton-text short"></div>
              <div class="skeleton-grid">
                  <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
                      <div class="skeleton-cell"></div>
              </div>
            </div>   `;
        contentDiv.innerHTML = `                <div class="main-skeleton">
                            <div class="top-section">
                              <div class="icon-skeleton skeleton-box"></div>
                          
                              <div class="info-skeleton">
                                <div class="temp-skeleton skeleton-box"></div>
                                <div class="location-skeleton skeleton-box"></div>
                                <div class="stats-skeleton">
                                  <div class="stat-box skeleton-box"></div>
                                  <div class="stat-box skeleton-box"></div>
                                  <div class="stat-box skeleton-box"></div>
                                  <div class="stat-box skeleton-box"></div>
                                </div>
                              </div>
                            </div>
                          
                            <div class="forecast-skeleton">
                              <div class="forecast-card-skeleton skeleton-box"></div>
                              <div class="forecast-card-skeleton skeleton-box"></div>
                              <div class="forecast-card-skeleton skeleton-box"></div>
                              <div class="forecast-card-skeleton skeleton-box"></div>
                              <div class="forecast-card-skeleton skeleton-box"></div>
                              <div class="forecast-card-skeleton skeleton-box"></div>
                              <div class="forecast-card-skeleton skeleton-box"></div>
                            </div>
                          </div>`;
    }

    return { showError, displayWeatherInfo, loadSkeletons };
})();
const iconMap = {
    'clear-day': 'day_clear.svg',
    'clear-night': 'night_half_moon_clear.svg',
    'partly-cloudy-day': 'day_partial_cloud.svg',
    'partly-cloudy-night': 'night_full_moon_partial_cloud.svg',
    cloudy: 'cloudy.svg',
    fog: 'fog.svg',
    wind: 'wind.svg',
    rain: 'rain.svg',
    snow: 'snow.svg',
    sleet: 'sleet.svg',
    hail: 'day_snow.svg',
    thunderstorm: 'day_rain_thunder.svg',
    tornado: 'angry_clouds.svg',
    'rain-thunder': 'day_rain_thunder.svg',
    'snow-thunder': 'day_snow_thunder.svg',
    'night-rain': 'night_full_moon_rain.svg',
    'night-snow': 'night_full_moon_snow.svg',
    'night-sleet': 'night_full_moon_sleet.svg',
    'night-rain-thunder': 'night_full_moon_rain_thunder.svg',
    'night-snow-thunder': 'night_full_moon_snow_thunder.svg',
};
