import React, { useContext, useState, useEffect } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const Search = () => {
  const { setSearchKey, setSearchMode, searchMode, getWeatherDetails, setLatitude, setLongitude, latitude, longitude } = useContext(WeatherContext);
  const [placeholder, setPlaceholder] = useState('<City Name>');
  const [inputValue, setInputValue] = useState('');

  const onSearchKeyChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSearchModeChange = (e) => {
    const mode = e.target.value;
    setSearchMode(mode);
    setInputValue('');
    switch (mode) {
      case 'city_id':
        setPlaceholder('<City Id>');
        break;
      case 'zip_code':
        setPlaceholder('<Zip code>');
        break;
      case 'city_name':
        setPlaceholder('<City Name>');
        break;
      case 'geo_ordinates':
        setPlaceholder('<latitude> & <longitude>');
        break;
      default:
        break;
    }
  };

  const onLatitudeChange = (e) => setLatitude(e.target.value);
  const onLongitudeChange = (e) => setLongitude(e.target.value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchKey(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearchKey]);

  useEffect(() => {
    if (inputValue || (latitude && longitude)) {
      getWeatherDetails();
    }
  }, [inputValue, latitude, longitude, getWeatherDetails]);

  return (
    <div className="container mx-auto my-4 p-6 bg-white rounded-lg shadow-lg bg-opacity-80 backdrop-filter backdrop-blur-lg">
      <h2 className="text-xl font-bold mb-4">5-Day / 3-Hour Interval Forecast</h2>
      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchMode">
            Mode of search:
          </label> */}
          <select id="searchMode" onChange={onSearchModeChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            <option value='city_name'>City Name</option>
            <option value='city_id'>City Id</option>
            <option value='geo_ordinates'>Geographic Coordinates</option>
            <option value='zip_code'>ZIP code</option>
          </select>
        </div>
        <div className="w-full md:w-2/3 px-2">
          {searchMode !== 'geo_ordinates' ? (
            <div>
              {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchKey">
                Search Key
              </label> */}
              <div className="flex items-center">
                <input id="searchKey" type="text" onChange={onSearchKeyChange} placeholder={placeholder} value={inputValue} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300" onClick={getWeatherDetails}>Fetch</button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
                Latitude
              </label>
              <input id="latitude" type="text" onChange={onLatitudeChange} placeholder="<latitude>" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" value={latitude} />
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
                Longitude
              </label>
              <input id="longitude" type="text" onChange={onLongitudeChange} placeholder="<longitude>" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" value={longitude} />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300" onClick={getWeatherDetails}>Fetch</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
