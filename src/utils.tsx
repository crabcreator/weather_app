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
      return <img src='./img/clouds/no-clouds.png' />;
    }
    if (coverPercent <= 70 && coverPercent > 20) {
      return <img src='./img/clouds/partly-cloudy.png' />;
    }
    if (coverPercent > 70) {
      return <img src='./img/clouds/cloudy.png' />;
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

// TEST
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
