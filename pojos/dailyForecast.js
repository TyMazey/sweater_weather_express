class DailyForecast {
  constructor (weather) {
    this.time = weather.time,
    this.summary = weather.summary,
    this.icon = weather.icon,
    this.sunriseTime = weather.sunriseTime,
    this.sunsetTime = weather.sunsetTime,
    this.precipIntensity = weather.precipIntensity,
    this.precipIntensityMax = weather.precipIntensityMax,
    this.precipIntensityMaxTime = weather.precipIntensityMaxTime,
    this.precipProbability = weather.precipProbability,
    this.precipType = weather.precipType,
    this.temperatureHigh = weather.temperatureHigh,
    this.temperatureLow = weather.temperatureLow,
    this.humidity = weather.humidity,
    this.pressure = weather.pressure,
    this.windSpeed = weather.windSpeed,
    this.windGust = weather.windGust,
    this.cloudCover = weather.cloudCover,
    this.visibility = weather.visibility,
    this.temperatureMin = weather.temperatureMin,
    this.temperatureMax = weather.temperatureMax
  }
}

module.exports = DailyForecast;
