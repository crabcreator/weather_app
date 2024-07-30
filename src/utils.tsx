export function cloudCoverPercent(
  coverPercent: number | undefined
): string | undefined {
  if (coverPercent || coverPercent === 0) {
    if (coverPercent <= 20) {
      return 'Ясно';
    }
    if (coverPercent <= 70 && coverPercent > 20) {
      return 'Незначна хмарність';
    }
    if (coverPercent > 70) {
      return 'Хмарно';
    }
  } else {
    return 'Помилка обробки даних';
  }
}

export function cloudCoverImage(coverPercent: number | undefined) {
  if (coverPercent || coverPercent === 0) {
    if (coverPercent <= 20) {
      return <img src='./img/weather/no-clouds.png' alt="" />;
    }
    if (coverPercent <= 70 && coverPercent > 20) {
      return <img src='./img/weather/partly-cloudy.png' alt="" />;
    }
    if (coverPercent > 70) {
      return <img src='./img/weather/cloudy.png' alt="" />;
    }
  } else {
    return 'Помилка обробки даних';
  }
}

export function measureTemperature(
  apparent_temperature: number
): string | undefined {
  if (apparent_temperature || apparent_temperature === 0) {
    if (apparent_temperature <= 0) {
      return 'морозно';
    }
    if (apparent_temperature > 0 && apparent_temperature < 10) {
      return 'Холодно';
    }
    if (apparent_temperature >= 10 && apparent_temperature < 15) {
      return 'Прохолодно';
    }
    if (apparent_temperature >= 15 && apparent_temperature < 20) {
      return 'Нормально';
    }
    if (apparent_temperature >= 20 && apparent_temperature < 26) {
      return 'Тепло';
    }
    if (apparent_temperature >= 26) {
      return 'Спекотно';
    }
  }
}

export function calcPrecipitation(rain: number, snowfall: number) {
  if (rain || snowfall) {
    if (rain < snowfall) {
      return snowfall + 'mm';
    }
    if (rain >= snowfall) {
      return rain + 'mm';
    }
  } else {
    return '--';
  }
}

export function windDirectionImage(degrees: number) {
  if((degrees >= 0 && degrees <= 23) || (degrees >= 337 && degrees <= 360)) {
    return <img src="./img/weather/icon-winddirection-north.png" alt="" />
  }
  if(degrees >= 24 && degrees <= 68) {
    return <img src="./img/weather/icon-winddirection-ne.png" alt="" />
  }
  if(degrees >= 69 && degrees <= 113) {
    return <img src="./img/weather/icon-winddirection-east.png" alt="" />
  }
  if(degrees >= 114 && degrees <= 158) {
    return <img src="./img/weather/icon-winddirection-se.png" alt="" />
  }
  if(degrees >= 159 && degrees <= 203) {
    return <img src="./img/weather/icon-winddirection-south.png" alt="" />
  }
  if(degrees >= 204 && degrees <= 248) {
    return <img src="./img/weather/icon-winddirection-sw.png" alt="" />
  }
  if(degrees >= 249 && degrees <= 293) {
    return <img src="./img/weather/icon-winddirection-west.png" alt="" />
  }
  if(degrees >= 294 && degrees <= 336) {
    return <img src="./img/weather/icon-winddirection-nw.png" alt="" />
  }
  else {
    return <img src="" alt="" />
  }
}