import React, { useEffect, useContext } from 'react';
import { WeatherContext } from './context/WeatherContext';
import Search from './components/Search';
import WeatherDetails from './components/WeatherDetails';
import Header from './components/Header';
import Loader from './components/Loader';
import Footer from './components/Footer';
import './styles/index.css'; // Ensure this import is present if it's not already

const App = () => {
  const { getWeatherDetails, loading } = useContext(WeatherContext);

  useEffect(() => {
    getWeatherDetails();
  }, [getWeatherDetails]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-weather">
      <Header />
      <div className="w-full p-4">
        <Search />
        {loading ? <Loader /> : <WeatherDetails />}
      </div>
      <Footer />
    </div>
  );
};

export default App;
