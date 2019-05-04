class HourlyForecast {
  constructor (weather) {
    this.time = weather.time,
    this.summary = weather.summary,
    this.icon = weather.icon,
    this.precipIntensity = weather.precipIntensity,
    this.precipProbability = weather.precipProbability,
    this.temperature = weather.temperature,
    this.humidity = weather.humidity,
    this.pressure = weather.pressure,
    this.windSpeed = weather.windSpeed,
    this.windGust = weather.windGust,
    this.windBearing = weather.windBearing,
    this.cloudCover = weather.cloudCover,
    this.visibility = weather.visibility
  }
}

module.exports = HourlyForecast;
