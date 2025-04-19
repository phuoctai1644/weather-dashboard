import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
import AirQualityCard from "./components/AirQualityCard";
import { DEFAULT_CITY, USER_SELECTED_CITY } from "./utils/const";
import "./App.css";

const App = () => {
  const [city, setCity] = useState(() => localStorage.getItem(USER_SELECTED_CITY) || DEFAULT_CITY);
  const [debouncedCity, setDebouncedCity] = useState(city);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(USER_SELECTED_CITY, city);
    const timer = setTimeout(() => setDebouncedCity(city), 500);
    return () => clearTimeout(timer);
  }, [city]);

  useEffect(() => {
    const timeout = setTimeout(() => setInitialLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-400 p-8 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🌤️ Weather Dashboard</h1>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city (e.g., Hanoi)"
          className="px-5 py-3 w-full max-w-md rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white bg-opacity-50 backdrop-blur-md"
        />
      </header>

      {initialLoading ? (
        <p className="text-center text-gray-700 mt-12">Loading data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-lg p-6 h-full">
            <WeatherCard city={debouncedCity} />
          </div>

          <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-2xl shadow-md p-6 h-full">
            <ForecastChart city={debouncedCity} />
          </div>

          <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-lg p-6 h-full">
            <AirQualityCard city={debouncedCity} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
