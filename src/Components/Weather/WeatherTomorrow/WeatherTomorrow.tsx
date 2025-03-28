import { Data } from '../../../types';
import { Link } from 'react-router-dom';
import DateRange from '../../DateRange/DateRange';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { centers } from '../../Home/centers';
import './WeatherTomorrow.css';
import {
  cloudCoverPercent,
  cloudCoverImage,
  measureTemperature,
  calcPrecipitation,
  windDirectionImage,
} from '../../../utils';
import Loader from '../../Loader/Loader';
import LinkArrow from '../../LinkArrow/LinkArrow';
import NotFound from '../../NotFound/NotFound';

export default function WeatherToday() {
  let notFound = false;
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

  const [responseData, setResponseData] = useState<Partial<Data>>({});
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(0);

  const infoRef = useRef<HTMLDivElement>(null);
  const detailedInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,cloudcover,windspeed_10m,winddirection_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,rain,showers,snowfall,cloudcover,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&wind_speed_unit=ms&timezone=Europe%2FKiev&past_days=1&forecast_days=14`
      )
      .then((response) => {
        if(response.data !== '' && response.data !== undefined) {
          setResponseData({
            current_units: response.data.current_units,
            current: response.data.current,
            hourly_units: response.data.hourly_units,
            hourly: response.data.hourly,
            daily_units: response.data.daily_units,
            daily: response.data.daily,
          });
          setLoading(false);
          if(infoRef.current !== null && detailedInfoRef.current !== null) {
            setWidth(infoRef.current?.offsetWidth);
            detailedInfoRef.current.style.width = width + 'px';
          }
        } else {
          notFound = true;
          return <NotFound />
        }
      })
      .catch((error) => {
        return (<NotFound />)
      });
  }, [loading, width]);

  return (
    <>
    {loading && !notFound && <Loader width='50px' height='50px' borderWidth='7px'/>}
    {!loading && !notFound &&
      <>
        <DateRange range='1' city={name} />
        <main>
          <div className='main-info' ref={infoRef}>
            <div className='top'>{langName}, погода на завтра</div>
            <div className='middle'>
              <div className='left-info-container'>
                <div className='today-date'>
                  {setDate(responseData.hourly?.time[48])}
                </div>
                <div className='left-info'>
                  <div className='current-t'>
                    <span>
                      {Math.round(responseData.hourly?.temperature_2m[61]!)}
                      {responseData.current_units?.temperature_2m.charAt(0)}
                    </span>
                    {cloudCoverImage(responseData?.hourly?.cloudcover[61])}
                  </div>
                  <div className='apparent-t'>
                    Відчувається як{' '}
                    {Math.round(responseData.hourly?.apparent_temperature[61]!)}
                    {responseData.current_units?.apparent_temperature.charAt(0)}
                  </div>
                </div>
              </div>
              <div className='separate-line'></div>
              <div className='right-info'>
                <div className='period'>
                  <span className='period-name'>Ранок</span>
                  <span className='period-t'>
                    {Math.round(responseData.hourly?.temperature_2m[32]!)}
                    {responseData.hourly_units?.temperature_2m.charAt(0)}
                  </span>
                  {cloudCoverImage(responseData.hourly?.cloudcover[32])}
                  <span className='apparent-feel'>
                    {measureTemperature(
                      responseData.hourly?.apparent_temperature[32]!
                    )}
                  </span>
                </div>
                <div className='period'>
                  <span className='period-name'>День</span>
                  <span className='period-t'>
                    {Math.round(responseData.hourly?.temperature_2m[37]!)}
                    {responseData.hourly_units?.temperature_2m.charAt(0)}
                  </span>
                  {cloudCoverImage(responseData.hourly?.cloudcover[37])}
                  <span className='apparent-feel'>
                    {measureTemperature(
                      responseData.hourly?.apparent_temperature[37]!
                    )}
                  </span>
                </div>
                <div className='period'>
                  <span className='period-name'>Вечір</span>
                  <span className='period-t'>
                    {Math.round(responseData.hourly?.temperature_2m[42]!)}
                    {responseData.hourly_units?.temperature_2m.charAt(0)}
                  </span>
                  {cloudCoverImage(responseData.hourly?.cloudcover[42])}
                  <span className='apparent-feel'>
                    {measureTemperature(
                      responseData.hourly?.apparent_temperature[42]!
                    )}
                  </span>
                </div>
                <div className='period'>
                  <span className='period-name'>Ніч</span>
                  <span className='period-t'>
                    {Math.round(responseData.hourly?.temperature_2m[47]!)}
                    {responseData.hourly_units?.temperature_2m.charAt(0)}
                  </span>
                  {cloudCoverImage(responseData.hourly?.cloudcover[47])}
                  <span className='apparent-feel'>
                    {measureTemperature(
                      responseData.hourly?.apparent_temperature[47]!
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
              {cloudCoverPercent(responseData.current?.cloudcover)}
            </div>
          </div>

          <div className="detailed-info" ref={detailedInfoRef}>
            <div className="period-container">
              <div className="period-detailed">
              <span className='period-name-detailed'>Ранок</span>
                  {cloudCoverImage(responseData.hourly?.cloudcover[32])}
                  <span className='period-t-detailed'>
                    {Math.round(responseData.hourly?.temperature_2m[32]!)}
                    {responseData.hourly_units?.temperature_2m.charAt(0)}
                  </span>
                  <span className='apparent-t-detailed'>
                  Відчувається як
                  </span>
                  <span className="apparent-t-detailed-b">
                    {Math.round(responseData.hourly?.apparent_temperature[32]!)}
                    {responseData.hourly_units?.apparent_temperature.charAt(0)}
                  </span>
                  <div className="other">
                    <span className="probability-detailed">
                      <img src="./img/weather/icon-precipitation-probability.png" alt="" />
                      {responseData.hourly?.precipitation_probability[32]}{responseData.hourly_units?.precipitation_probability}
                    </span>
                    <span className="precipitation">
                    <img src="./img/weather/icon-precipitation.png" alt="" />
                      {calcPrecipitation(responseData.hourly?.rain[32]!, responseData.hourly?.snowfall[32]!)} 
                      <small>&nbsp;{responseData.hourly_units?.rain}</small>
                    </span>
                    <span className="wind-speed">
                      {windDirectionImage(responseData.hourly?.wind_direction_10m[32]!)}
                      {responseData.hourly?.wind_speed_10m[32]} <small>&nbsp;{responseData.hourly_units?.wind_speed_10m}</small></span>
                    <span className="relative-humidity">
                      <img src="./img/weather/icon-humidity.png" alt="" />
                      {responseData.hourly?.relative_humidity_2m[32]} {responseData.hourly_units?.relative_humidity_2m}
                    </span>
                  </div>
              </div>
              
              <div className="period-detailed">
                <span className='period-name-detailed'>День</span>
                {cloudCoverImage(responseData.hourly?.cloudcover[37])}
                <span className='period-t-detailed'>
                  {Math.round(responseData.hourly?.temperature_2m[37]!)}
                  {responseData.hourly_units?.temperature_2m.charAt(0)}
                </span>
                <span className='apparent-t-detailed'>
                  Відчувається як
                </span>
                <span className="apparent-t-detailed-b">
                  {Math.round(responseData.hourly?.apparent_temperature[37]!)}
                  {responseData.hourly_units?.apparent_temperature.charAt(0)}
                </span>
                <div className="other">
                  <span className="probability-detailed">
                    <img src="./img/weather/icon-precipitation-probability.png" alt="" />
                    {responseData.hourly?.precipitation_probability[37]}{responseData.hourly_units?.precipitation_probability}
                  </span>
                  <span className="precipitation">
                    <img src="./img/weather/icon-precipitation.png" alt="" />
                    {calcPrecipitation(responseData.hourly?.rain[37]!, responseData.hourly?.snowfall[32]!)} 
                    <small>&nbsp;{responseData.hourly_units?.rain}</small>
                  </span>
                  <span className="wind-speed">
                    {windDirectionImage(responseData.hourly?.wind_direction_10m[37]!)}
                    {responseData.hourly?.wind_speed_10m[37]} <small>&nbsp;{responseData.hourly_units?.wind_speed_10m}</small></span>
                  <span className="relative-humidity">
                    <img src="./img/weather/icon-humidity.png" alt="" />
                    {responseData.hourly?.relative_humidity_2m[37]} {responseData.hourly_units?.relative_humidity_2m}
                  </span>
                </div>
              </div>

              <div className="period-detailed">
                <span className='period-name-detailed'>Вечір</span>
                {cloudCoverImage(responseData.hourly?.cloudcover[42])}
                <span className='period-t-detailed'>
                  {Math.round(responseData.hourly?.temperature_2m[42]!)}
                  {responseData.hourly_units?.temperature_2m.charAt(0)}
                </span>
                <span className='apparent-t-detailed'>
                  Відчувається як
                </span>
                <span className="apparent-t-detailed-b">
                  {Math.round(responseData.hourly?.apparent_temperature[42]!)}
                  {responseData.hourly_units?.apparent_temperature.charAt(0)}
                </span>
                <div className="other">
                  <span className="probability-detailed">
                    <img src="./img/weather/icon-precipitation-probability.png" alt="" />
                    {responseData.hourly?.precipitation_probability[42]}{responseData.hourly_units?.precipitation_probability}
                  </span>
                  <span className="precipitation">
                    <img src="./img/weather/icon-precipitation.png" alt="" />
                    {calcPrecipitation(responseData.hourly?.rain[42]!, responseData.hourly?.snowfall[32]!)} 
                    <small>&nbsp;{responseData.hourly_units?.rain}</small>
                  </span>
                  <span className="wind-speed">
                    {windDirectionImage(responseData.hourly?.wind_direction_10m[42]!)}
                    {responseData.hourly?.wind_speed_10m[42]} <small>&nbsp;{responseData.hourly_units?.wind_speed_10m}</small></span>
                  <span className="relative-humidity">
                    <img src="./img/weather/icon-humidity.png" alt="" />
                    {responseData.hourly?.relative_humidity_2m[42]} {responseData.hourly_units?.relative_humidity_2m}
                  </span>
                </div>
              </div>

              <div className="period-detailed">
                <span className='period-name-detailed'>Ніч</span>
                {cloudCoverImage(responseData.hourly?.cloudcover[47])}
                <span className='period-t-detailed'>
                  {Math.round(responseData.hourly?.temperature_2m[47]!)}
                  {responseData.hourly_units?.temperature_2m.charAt(0)}
                </span>
                <span className='apparent-t-detailed'>
                  Відчувається як
                </span>
                <span className="apparent-t-detailed-b">
                  {Math.round(responseData.hourly?.apparent_temperature[47]!)}
                  {responseData.hourly_units?.apparent_temperature.charAt(0)}
                </span>
                <div className="other">
                  <span className="probability-detailed">
                    <img src="./img/weather/icon-precipitation-probability.png" alt="" />
                    {responseData.hourly?.precipitation_probability[47]}{responseData.hourly_units?.precipitation_probability}
                  </span>
                  <span className="precipitation">
                    <img src="./img/weather/icon-precipitation.png" alt="" />
                    {calcPrecipitation(responseData.hourly?.rain[47]!, responseData.hourly?.snowfall[32]!)} 
                    <small>&nbsp;{responseData.hourly_units?.rain}</small>
                  </span>
                  <span className="wind-speed">
                    {windDirectionImage(responseData.hourly?.wind_direction_10m[47]!)}
                    {responseData.hourly?.wind_speed_10m[47]} <small>&nbsp;{responseData.hourly_units?.wind_speed_10m}</small></span>
                  <span className="relative-humidity">
                    <img src="./img/weather/icon-humidity.png" alt="" />
                    {responseData.hourly?.relative_humidity_2m[47]} {responseData.hourly_units?.relative_humidity_2m}
                  </span>
                </div>
              </div>
            </div>
            <Link className='other-page' to={`/hourly?${name}`}>Погодинно <LinkArrow size='6px' /></Link>
          </div>
        </main>
      </>}
    </>
  );
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
