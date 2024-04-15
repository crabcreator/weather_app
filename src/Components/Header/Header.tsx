import React, { useState, useEffect, useRef, useContext } from 'react';
import { CityContext } from '../../Contexts/CityContext';
import { LangContext, langs } from '../../Contexts/LangContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

export default function Header() {
  const {
    cityName,
    // cityId,
    setCity,
  } = useContext(CityContext);
  const { lang, setLang } = useContext(LangContext);

  const [searchIsOpen, setSearchOpen] = useState(false);
  const [langIsOpen, setLangOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState({ name: '', id: 0 });

  const jsonString = window.localStorage.getItem('LastCities');
  let lastCitiesArray: LastCity[] = [{ name: '', id: undefined }];
  if (jsonString) {
    lastCitiesArray = JSON.parse(jsonString);
  }
  const [lastCities, setLastCities] = useState(lastCitiesArray);

  let menuRef = useRef<HTMLDivElement>(null);
  let langRef = useRef<HTMLDivElement>(null);
  let resultsRef = useRef<HTMLDivElement>(null);

  const changeValue = (
    e: React.ChangeEvent<HTMLElement> & { target: HTMLInputElement }
  ) => {
    setSearchValue(e.target.value);
  };

  type LastCity = {
    name: string;
    id: number | undefined;
  };

  const updateLastCities = (newCity: LastCity) => {
    let isInList = false;
    for (let i = 0; i < lastCities.length; i++) {
      if (lastCities[i].name === newCity.name) {
        isInList = true;
      }
    }
    if (!isInList) {
      let tempArray: LastCity[] = lastCities;
      tempArray.push({ name: newCity.name, id: newCity.id });
      setLastCities(tempArray);
      console.log(lastCities);
      window.localStorage.setItem('LastCities', JSON.stringify(lastCities));
    }
  };

  useEffect(() => {
    if (searchValue) {
      axios
        .get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchValue}&count=1&language=ua&format=json`
        )
        .then((response) => {
          if (response.data.results[0].country === 'Ukraine') {
            setSearchResults({
              name: response.data.results[0].name,
              id: response.data.results[0].id,
            });
          }
        })
        .catch((error) => console.log(error));
    }
  }, [searchValue, searchResults]);

  useEffect(() => {
    let handler = (
      e: React.MouseEvent<HTMLElement> & { target: HTMLElement }
    ) => {
      if (!menuRef.current?.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler as any);
    return () => document.removeEventListener('mousedown', handler as any);
  }, []);
  useEffect(() => {
    let handler = (
      e: React.MouseEvent<HTMLElement> & { target: HTMLElement }
    ) => {
      if (!langRef.current?.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler as any);
    return () => document.removeEventListener('mousedown', handler as any);
  }, []);

  return (
    <div className='navigation'>
      <header>
        <div className='burger'>
          <img src='./img/header/burger-icon.png' alt='Menu' />
        </div>
        <div className='logo'>
          <Link to='/'>
            <img src='./img/header/Logo.png' alt='Logo' />
          </Link>
        </div>
        <div className='search'>
          <div
            className='main-search'
            onClick={() => setSearchOpen(!searchIsOpen)}>
            <div className='location-sign'>
              <img src='/img/header/location-sign.png' alt='' />
            </div>
            <span className='select-city'>{cityName || 'Вибрати місто'}</span>
            <div className='drop-arrow'>
              <img src='/img/header/menu-drop-arrow.png' alt='' />
            </div>
          </div>
          <div
            className={`dropdown-search ${searchIsOpen ? 'active' : ''}`}
            ref={menuRef}>
            <div className='select-city-drop'>
              <img src='/img/header/active-search.png' alt='' />
              <input
                type='text'
                placeholder='Місто, область'
                onChange={(e) => changeValue(e)}
                value={searchValue}
              />
            </div>
            <div
              className='search-results'
              ref={resultsRef}
              style={{
                padding: `${
                  resultsRef.current?.innerText === '' ? 0 : '16px 0 16px 10px'
                }`,
              }}>
              <ul className='res-cities-list'>
                <li className='res-cities-list-el'>
                  {searchResults.name !== '' ? (
                    <button
                      onClick={() => {
                        setCity(searchResults.name, searchResults.id);
                        console.log(cityName);
                        setSearchValue('');
                        setSearchOpen(false);
                        updateLastCities({
                          name: searchResults.name,
                          id: searchResults.id,
                        });
                        setSearchResults({ name: '', id: 0 });
                      }}>
                      {searchResults.name}
                    </button>
                  ) : (
                    ''
                  )}
                </li>
              </ul>
            </div>
            <div className='turn-on-gps'>
              <img src='/img/header/gps.png' alt='' />
              <span>Моє місцезнаходження</span>
            </div>
            <div className='previous-cities'>
              <span>Ви нещодавно дивилися</span>
              <ul className='last-cities-list'>
                {lastCities.map((el, index) => (
                  <li className='last-cities-list-el' key={index}>
                    <button
                      onClick={() => {
                        setCity(el.name, el.id);
                        console.log(cityName);
                        setSearchValue('');
                        setSearchOpen(false);
                        updateLastCities({ name: el.name, id: el.id });
                      }}>
                      {el.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className='lang' onClick={() => setLangOpen(!langIsOpen)}>
          <div className='earth-sign'>
            <img src='/img/header/earth.png' alt='' />
          </div>
          <span className='selected-lang'>{lang}</span>
          <div className='drop-arrow'>
            <img src='/img/header/menu-drop-arrow.png' alt='' />
          </div>
        </div>
        <div
          className={`dropdown-lang ${langIsOpen ? 'active' : ''}`}
          ref={langRef}>
          <ul className='lang-list'>
            {langs.map((el, index) => (
              <li key={el} className='lang-list-el'>
                <button
                  onClick={() => {
                    setLang(index);
                    setLangOpen(false);
                  }}>
                  {el}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}
