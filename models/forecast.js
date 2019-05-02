export default class Forecast {
  constructor(location, weather) {
    this.location = location
    this.currently = new CurrentForecast(weather)
    this.hourly = setHourly(weather)
    this.daily = setDaily(weather)
  }

  setHourly(weather) {
    var hourlyArray = []
    for (var i = 0; i < 8; i++) {
      dailyArray.push(new HourlyWeather(weather.hourly.data[i]))
    }
  }

  setDaily(weather) {
    var dailyArray = []
    for (var i = 0; i < 7; i++) {
      dailyArray.push(new DailyWeather(weather.daily.data[i]))
    }
  }
}
