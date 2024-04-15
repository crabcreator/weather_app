import { Data } from '../../../types';
import { Link } from 'react-router-dom';
import DateRange from '../../DateRange/DateRange';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { centers } from '../../Home/centers';
import './WeatherToday.css';
import {
  cloudCoverPercent,
  cloudCoverImage,
  measureTemperature,
  calcPrecipitation,
} from '../../../utils';

export default function WeatherToday() {
  const name = document.location.href.split('?')[1];
  let langName = '';
  let lat = '';
  let lng = '';
  centers.forEach((city) => {
    if (city.city_en === name) {
      lat = city.lat;
      lng = city.lng;
      langName = city.city_ua;
    }
  });

  const [responseData, setResponseData] = useState<Partial<Data>>();

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,cloudcover,windspeed_10m,winddirection_10m&hourly=temperature_2m,apparent_temperature,rain,showers,snowfall,cloudcover&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&timezone=Europe%2FKiev&past_days=1&forecast_days=14`
      )
      .then((response) => {
        if (response.data !== '') {
          setResponseData({
            current_units: response.data.current_units,
            current: response.data.current,
            hourly_units: response.data.hourly_units,
            hourly: response.data.hourly,
            daily_units: response.data.daily_units,
            daily: response.data.daily,
          });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  if (responseData) {
    return (
      <>
        <DateRange range='0' />
        <main>
          <div className='main-info'>
            <div className='top'>{langName}, погода сьогодні</div>
            <div className='middle'>
              <div className='left-info-container'>
                <div className='today-date'>
                  {setDate(responseData?.current?.time)}
                </div>
                <div className='left-info'>
                  <div className='current-t'>
                    <span>
                      {Math.round(responseData.current?.temperature_2m!)}
                      {responseData.current_units?.temperature_2m.charAt(0)}
                    </span>
                    {cloudCoverImage(responseData?.current?.cloudcover)}
                  </div>
                  <div className='apparent-t'>
                    Відчувається як{' '}
                    {Math.round(responseData.current?.apparent_temperature!)}
                    {responseData.current_units?.apparent_temperature.charAt(0)}
                  </div>
                </div>
              </div>
              <div className='separate-line'></div>
              <div className='right-info'>
                <div className='period'>
                  <span className='period-name'>Ранок</span>
                  <span className='period-t'>
                    {Math.round(responseData.hourly?.temperature_2m[8]!)}
                    {responseData.hourly_units?.temperature_2m.charAt(0)}
                  </span>
                  {cloudCoverImage(responseData.hourly?.cloudcover[8])}
                  <span className='apparent-feel'>
                    {measureTemperature(
                      responseData.hourly?.apparent_temperature[8]!
                    )}
                  </span>
                </div>
                <div className='period'>
                  <span className='period-name'>День</span>
                  <span className='period-t'>
                    {Math.round(responseData.hourly?.temperature_2m[13]!)}
                    {responseData.hourly_units?.temperature_2m.charAt(0)}
                  </span>
                  {cloudCoverImage(responseData.hourly?.cloudcover[13])}
                  <span className='apparent-feel'>
                    {measureTemperature(
                      responseData.hourly?.apparent_temperature[13]!
                    )}
                  </span>
                </div>
                <div className='period'>
                  <span className='period-name'>Вечір</span>
                  <span className='period-t'>
                    {Math.round(responseData.hourly?.temperature_2m[18]!)}
                    {responseData.hourly_units?.temperature_2m.charAt(0)}
                  </span>
                  {cloudCoverImage(responseData.hourly?.cloudcover[18])}
                  <span className='apparent-feel'>
                    {measureTemperature(
                      responseData.hourly?.apparent_temperature[18]!
                    )}
                  </span>
                </div>
                <div className='period'>
                  <span className='period-name'>Ніч</span>
                  <span className='period-t'>
                    {Math.round(responseData.hourly?.temperature_2m[23]!)}
                    {responseData.hourly_units?.temperature_2m.charAt(0)}
                  </span>
                  {cloudCoverImage(responseData.hourly?.cloudcover[23])}
                  <span className='apparent-feel'>
                    {measureTemperature(
                      responseData.hourly?.apparent_temperature[23]!
                    )}
                  </span>
                </div>
                <div className='current-weather-summary'>
                  <div className='sum-precipitation-probability'></div>
                  <div className='sum-wind-speed'></div>
                  <div className='sum-pressure'></div>
                  <div className='sum-uv-index'></div>
                </div>
              </div>
            </div>
            <div className='bottom'>
              {cloudCoverPercent(responseData?.current?.cloudcover)}
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <div className='not-found'>404: Not Found</div>
        <Link className='return' to='/'>
          Return to main page
        </Link>
      </>
    );
  }
}

function setDate(time: String | undefined) {
  let day = time?.split('T')[0].split('-')[2];
  let month = time?.split('T')[0].split('-')[1];
  switch (month) {
    case '01':
      return day + ' січня';
    case '02':
      return day + ' лютого';
    case '03':
      return day + ' березня';
    case '04':
      return day + ' квітня';
    case '05':
      return day + ' травня';
    case '06':
      return day + ' червня';
    case '07':
      return day + ' липня';
    case '08':
      return day + ' серпня';
    case '09':
      return day + ' вересня';
    case '10':
      return day + ' жовтня';
    case '11':
      return day + ' листопада';
    case '12':
      return day + ' грудня';
    default:
      return `${day} ${month}`;
  }
}
