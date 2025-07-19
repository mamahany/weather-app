import { parse } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';
import { handleDom } from './dom.js';
const handleUnitGroup = (function () {
    let unitGroup = 'metric';
    function getUnitGroup() {
        return unitGroup;
    }
    function setUnitGroup(newUnitGroup) {
        if (newUnitGroup === 'us' || newUnitGroup === 'metric') {
            unitGroup = newUnitGroup;
        }
    }
    return { getUnitGroup, setUnitGroup };
})();

const handleLocation = (function () {
    let location = null;
    async function getLocation() {
        if (location) return location;
        try {
            let detectedLocation = await autoDetectLocation();
            location = detectedLocation || 'tokyo';
        } catch (err) {
            handleDom.showError('Failed to detect location:', err);
            location = 'tokyo';
        }
        return location;
    }
    function setLocation(newLocation) {
        if (newLocation) {
            location = newLocation;
        }
    }
    return { getLocation, setLocation };
})();

function formatLocalTime(timezone) {
    const now = new Date();
    const zonedDate = toZonedTime(now, timezone);
    return format(zonedDate, 'EEEE d MMMM hh:mm a', { timeZone: timezone });
}

function formatAMPM(timeStr) {
    const parsed = parse(timeStr, 'HH:mm:ss', new Date());
    return format(parsed, 'h:mm a');
}

async function autoDetectLocation() {
    let res = await fetch('https://ipwho.is/', { mode: 'cors' });
    let data = await res.json();
    console.log('location:', data.city + ' ,' + data.country);
    let city = data.city;
    if (data.country == 'United States') {
        handleUnitGroup.setUnitGroup('us');
    }
    document.querySelector('.unit-toggle .active')?.classList.remove('active');
    document
        .querySelector(`.unit-toggle .${handleUnitGroup.getUnitGroup()}`)
        .classList.add('active');
    return city;
}

export {
    handleUnitGroup,
    handleLocation,
    formatLocalTime,
    formatAMPM,
    autoDetectLocation,
};
