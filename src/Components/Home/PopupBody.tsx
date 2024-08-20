import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { City } from '../../types';
import { Data } from '../../types';
import axios from 'axios';
import { cloudCoverPercent } from '../../utils';
import Loader from '../Loader/Loader';
import LinkArrow from '../LinkArrow/LinkArrow';

export default function PopupBody({ name, lat, lng }: City) {
  let isError = false;
  const [searchResults, setSearchResults] = useState<Partial<Data>>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,cloudcover,windspeed_10m,winddirection_10m&hourly=temperature_2m,rain,showers,snowfall,cloudcover&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant&timezone=Europe%2FKiev&past_days=1&forecast_days=14`
      )
      .then((response) => {
        if(response.data != undefined) {
          setSearchResults({
            current: response.data.current,
            current_units: response.data.current_units,
            daily: response.data.daily,
            daily_units: response.data.daily_units,
          });
          setLoading(false);
        } else {
          isError = true;
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {loading && !isError && <Loader width='50px' height='50px' borderWidth='5px'/>}
      {!isError && <div className='popup-body'>
        <span>
          День {String(searchResults?.daily?.temperature_2m_max[0])}{' '}
          {searchResults?.daily_units?.temperature_2m_max}
        </span>
        <span>
          Ніч {String(searchResults?.daily?.temperature_2m_min[0])}{' '}
          {searchResults?.daily_units?.temperature_2m_min}
        </span>
        <span>{cloudCoverPercent(searchResults?.current?.cloudcover)}</span>
        <span className='apparent'>
          Відчувається як {String(searchResults?.current?.apparent_temperature)}{' '}
          {searchResults?.current_units?.apparent_temperature}
        </span>
        <Link to={`/today?${name}`} className='detailed'>
          Докладніше <LinkArrow size='6px' />
        </Link>
      </div>}
    </>
  );
}
