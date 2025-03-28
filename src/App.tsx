import { CityContextProvider } from './Contexts/CityContext';
import { LangContextProvider } from './Contexts/LangContext';
import { Outlet } from 'react-router';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

export default function App() {
  return (
    <CityContextProvider>
      <LangContextProvider>
        <div className='App'>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </LangContextProvider>
    </CityContextProvider>
  );
}
