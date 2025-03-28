import React, { createContext, useContext, useState, JSX } from 'react';

export const langs = ['UA', 'EN', 'DE', 'NE', 'FR'];

interface ILang {
  lang: string;
  setLang: (id: number) => void;
}

export const LangContext = createContext<ILang>({
  lang: window.localStorage.getItem('Lang') || 'UA',
  setLang: (id) => {},
});

export function LangContextProvider(props: { children: JSX.Element }) {
  const [currentLang, setCurrentLang] = useState<string>(
    useContext(LangContext).lang
  );
  return (
    <LangContext.Provider
      value={{
        lang: currentLang,
        setLang: function (id: number) {
          setCurrentLang(langs[id]);
          window.localStorage.setItem('Lang', langs[id]);
        },
      }}>
      {props.children}
    </LangContext.Provider>
  );
}
