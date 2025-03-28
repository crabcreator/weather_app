import React, { createContext, useState, useContext, JSX } from 'react';

interface ICity {
      cityName: string,
      cityId: number | undefined,
      setCity: (cityName:string, cityId: number | undefined) => void,
}

export const CityContext = createContext<ICity>({cityName: window.localStorage.getItem('City')?.split(',')[0] || '', cityId: Number(window.localStorage.getItem('City')?.split(',')[1]) || undefined, setCity: (id) => {},});

export function CityContextProvider(props:{children:JSX.Element}) {
      const [currentCity, setCurrentCity] = useState<string>(useContext(CityContext).cityName || '');
      const [currentId, setCurrentId] = useState<number | undefined>(useContext(CityContext).cityId);
      return (
            <CityContext.Provider value={{cityName: currentCity, cityId: currentId, setCity: function(cityName: string, cityId: number | undefined) {
                  if(cityId) {
                        setCurrentCity(cityName);
                        setCurrentId(cityId);
                        window.localStorage.setItem('City', String([cityName, cityId]));
                  }
            }}}>
                  {props.children}
            </CityContext.Provider>
      )
}