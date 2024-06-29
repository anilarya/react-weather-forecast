import React, { createContext, useState, useCallback } from 'react';
import { BASE_URI, API_KEY } from '../utils/constants';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [searchKey, setSearchKey] = useState('Bangalore');
  const [searchMode, setSearchMode] = useState('city_name');
  const [errorMessage, setErrorMessage] = useState('');
  const [weatherDetails, setWeatherDetails] = useState([]);
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = React.useRef(null);

  const constructQParams = useCallback(() => {
    switch (searchMode) {
      case 'city_id':
        return `id=${searchKey}`;
      case 'zip_code':
        return `zip=${searchKey}`;
      case 'city_name':
        return `q=${searchKey}`;
      case 'geo_ordinates':
        return `lat=${latitude}&lon=${longitude}`;
      default:
        return '';
    }
  }, [searchKey, searchMode, latitude, longitude]);

  const getWeatherDetails = useCallback(async () => {
    const qParams = constructQParams();
    if(qParams === "q=")return;
    if (!qParams) {
      setErrorMessage('Please provide valid search parameters.');
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Cancel the previous request
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const url = `${BASE_URI}${qParams}&appid=${API_KEY}`;
    setLoading(true);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherDetails(data);
      setLoading(false);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
  }, [constructQParams]);

  return (
    <WeatherContext.Provider value={{
      searchKey,
      setSearchKey,
      searchMode,
      setSearchMode,
      errorMessage,
      setErrorMessage,
      weatherDetails,
      setWeatherDetails,
      latitude,
      setLatitude,
      longitude,
      setLongitude,
      getWeatherDetails,
      loading,
      setLoading
    }}>
      {children}
    </WeatherContext.Provider>
  );
};
