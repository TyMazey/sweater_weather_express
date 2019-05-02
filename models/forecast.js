export default class Forecast {
  constructor(location, weather) {
    this.location = location
    this.weather = weather
    this.currently = {}
    this.hourly = {}
    this.daily = {}
  }
}
