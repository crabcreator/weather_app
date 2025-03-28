import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './Components/Home/Home';
import WeatherToday from './Components/Weather/WeatherToday/WeatherToday';
import WeatherTomorrow from './Components/Weather/WeatherTomorrow/WeatherTomorrow'
import { StrictMode } from 'react';
import NotFound from './Components/NotFound/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='/today' element={<WeatherToday />} />
        <Route path='/tomorrow' element={<WeatherTomorrow />} />
        <Route path='*' element={<NotFound />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </StrictMode>
);
