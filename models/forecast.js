var Current


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
      dailyArray.push(new HourlyForecast(weather.hourly.data[i]))
    }
    return var hourly = { summary: "placeholder",
      icon: "placeholder",
      data: hourlyArray
    }
  };

  setDaily(weather) {
    var dailyArray = []
    for (var i = 0; i < 7; i++) {
      dailyArray.push(new DailyForecast(weather.daily.data[i]))
    }
    return var daily = { summary: "placeholder",
      icon: "placeholder",
      data: dailyArray
    }
  };
}
