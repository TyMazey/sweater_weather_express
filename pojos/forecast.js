var CurrentForecast = require('./currentForecast');
var HourlyForecast = require('./hourlyForecast');
var DailyForecast = require('./dailyForecast');
// import CurrentForecast from './currentForecast';
// var HourlyForecast = require('./hourlyForecast')
// var DailyForecast = require('./dailyForecast')


class Forecast {
  constructor(location, weather) {
    this.location = location
    this.currently = new CurrentForecast(weather.currently)
    this.hourly = this.setHourly(weather)
    this.daily = this.setDaily(weather)
  }

  setHourly(weather) {
    var hourlyArray = []
    for (var i = 0; i < 8; i++) {
      hourlyArray.push(new HourlyForecast(weather.hourly.data[i]))
    }
    var hourly = { summary: weather.hourly.summary,
      icon: weather.hourly.icon,
      data: hourlyArray
    }
    return hourly
  }

  setDaily(weather) {
    var dailyArray = []
    for (var i = 0; i < 7; i++) {
      dailyArray.push(new DailyForecast(weather.daily.data[i]))
    }
    var daily = { summary: weather.daily.summary,
      icon: weather.daily.icon,
      data: dailyArray
    }
    return daily
  }
}

module.exports = Forecast;
