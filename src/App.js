import React, { useState, useEffect } from 'react';
import { getWeather, getForecast, getAirQuality } from './utils/api';
import WeatherCard from './components/WeatherCard';
import ForecastChart from './components/ForecastChart';
import AirQualityCard from './components/AirQualityCard';

const App = () => {
  const [city, setCity] = useState('Hanoi');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const weather = await getWeather(city);
      setWeatherData(weather);

      if (weather?.coord) {
        const { lat, lon } = weather.coord;

        const [forecast, airQuality] = await Promise.all([
          getForecast(lat, lon),
          getAirQuality(lat, lon)
        ]);

        setForecastData(forecast);
        setAirQualityData(airQuality);
      }

      setLoading(false);
    };

    fetchData();
  }, [city]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Weather Dashboard</h1>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name (e.g., Hanoi)"
          className="px-5 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </header>

      {loading ? (
        <p className="text-center text-gray-700 mt-12">Loading data...</p>
      ) : (
        <>
          {weatherData && <WeatherCard data={weatherData} />}
          {forecastData && <ForecastChart data={forecastData} />}
          {airQualityData && <AirQualityCard data={airQualityData} />}
        </>
      )}
    </div>
  );
};

export default App;
