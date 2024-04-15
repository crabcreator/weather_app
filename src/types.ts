export type Data = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relativehumidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    precipitation: string;
    rain: string;
    showers: string;
    snowfall: string;
    cloudcover: string;
    windspeed_10m: string;
    winddirection_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relativehumidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    cloudcover: number;
    windspeed_10m: number;
    winddirection_10m: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
    apparent_temperature: string;
    rain: string;
    showers: string;
    snowfall: string;
    cloudcover: string;
  };
  hourly: {
    time: Array<string>;
    temperature_2m: Array<number>;
    apparent_temperature: Array<number>;
    rain: Array<number>;
    showers: Array<number>;
    snowfall: Array<number>;
    cloudcover: Array<number>;
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
    rain_sum: string;
    showers_sum: string;
    snowfall_sum: string;
    precipitation_hours: string;
    precipitation_probability_max: string;
    windspeed_10m_max: string;
    winddirection_10m_dominant: string;
  };
  daily: {
    time: Array<string>;
    temperature_2m_max: Array<number>;
    temperature_2m_min: Array<number>;
    sunrise: Array<string>;
    sunset: Array<string>;
    uv_index_max: Array<number>;
    rain_sum: Array<number>;
    showers_sum: Array<number>;
    snowfall_sum: Array<number>;
    precipitation_hours: Array<number>;
    precipitation_probability_max: Array<number>;
    windspeed_10m_max: Array<number>;
    winddirection_10m_dominant: Array<number>;
  };
};

export type City = {
  name: string;
  lat: string;
  lng: string;
};
