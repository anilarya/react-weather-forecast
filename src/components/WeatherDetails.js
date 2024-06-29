import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { ICON_BASE_URL } from '../utils/constants';

const WeatherDetails = () => {
  const { weatherDetails, errorMessage } = useContext(WeatherContext);

  const getTemperature = (temp) => (temp - 273.15).toFixed(2);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[date.getUTCDay()];
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  };

  const groupedByDate = weatherDetails.list ? weatherDetails.list.reduce((acc, detail) => {
    const date = formatDate(detail.dt_txt);
    if (!acc[date]) acc[date] = [];
    acc[date].push(detail);
    return acc;
  }, {}) : {};

  return (
    <div className="container mx-auto my-4 p-4">
      {errorMessage && <div className="alert alert-danger"><strong>Oops!</strong> {errorMessage}</div>}
      {weatherDetails.city && <h2 className="text-2xl text-white font-bold mb-4 text-center">{weatherDetails.city.name}, {weatherDetails.city.country}</h2>}
      {Object.keys(groupedByDate).length > 0 ? (
        Object.keys(groupedByDate).map((date) => (
          <div key={date} className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-white">{date}</h3>
            <div className="flex flex-wrap -mx-2">
              {groupedByDate[date].map((detail, index) => (
                <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
                  <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4">
                    <div className="flex items-center mb-4">
                      <img src={`${ICON_BASE_URL}${detail.weather[0].icon}.png`} alt="weather icon" className="w-12 h-12 mr-4" />
                      <p className="text-lg font-bold">{formatTime(detail.dt_txt)}</p>
                    </div>
                    <div className="p-4">
                      {detail.weather.map((weather, idx) => (
                        <div key={idx} className="mb-2">
                          <p className="text-xl font-bold">
                            {getTemperature(detail.main.temp)}°C, {weather.main}
                          </p>
                          <p className="text-sm">{weather.description}</p>
                          <p className="text-sm">High: {getTemperature(detail.main.temp_max)}°C ~ Low: {getTemperature(detail.main.temp_min)}°C</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gray-100 rounded-b-lg p-2">
                      <p className="text-sm">Pressure: {detail.main.pressure} hPa</p>
                      <p className="text-sm">Humidity: {detail.main.humidity}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherDetails;
