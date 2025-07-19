export default class WeatherInfo {
    constructor(
        description,
        temp,
        address,
        conditions,
        icon,
        humidity,
        feelslike,
        windSpeed,
        windDir,
        uvindex,
        sunrise,
        sunset,
        forecastDays,
        dew,
        snow,
        visibility,
        pressure,
        moonphase,
        solarenergy,
        precip,
        cloudcover,
        alerts,
        timezone
    ) {
        this.description = description;
        this.temp = temp;
        this.address = address;
        this.conditions = conditions;
        this.icon = icon;
        this.humidity = humidity;
        this.feelslike = feelslike;
        this.windSpeed = windSpeed;
        this.windDir = windDir;
        this.uvindex = uvindex;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.forecastDays = forecastDays;
        this.dew = dew;
        this.snow = snow;
        this.visibility = visibility;
        this.pressure = pressure;
        this.moonphase = moonphase;
        this.solarenergy = solarenergy;
        this.precip = precip;
        this.cloudcover = cloudcover;
        this.alerts = alerts;
        this.timezone = timezone;
    }
}
