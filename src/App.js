import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastChart from "./components/ForecastChart";
import AirQualityCard from "./components/AirQualityCard";
import UnitSelector from "./components/UnitSelector";
import {
  DEFAULT_CITY,
  TemperatureUnit,
  USER_SELECTED_CITY,
} from "./utils/const";
import "./App.css";

const App = () => {
  const [city, setCity] = useState(
    () => localStorage.getItem(USER_SELECTED_CITY) || DEFAULT_CITY
  );
  const [debouncedCity, setDebouncedCity] = useState(city);
  const [unit, setUnit] = useState(TemperatureUnit.METRIC);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

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
    setLat(null);
    setLon(null);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt của bạn không hỗ trợ định vị.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLon(longitude);
        setCity("");
        setDebouncedCity("");
        setLoadingLocation(false);
      },
      (err) => {
        if (err.code === 1) {
          alert("Bạn đã từ chối quyền truy cập vị trí.");
        } else {
          alert("Không thể lấy vị trí. Thử lại sau.");
        }
        setLoadingLocation(false);
      }
    );
  };

  const isLoading = initialLoading || loadingLocation;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-400 p-8 font-sans">
      <header className="text-center mb-10 py-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-4">
          🌤️ Weather Dashboard
        </h1>

        <div className="flex items-center max-w-fit mx-auto mb-6">
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city (e.g., Hanoi)"
            className="px-6 py-3 w-full max-w-md rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white bg-opacity-80 backdrop-blur-lg text-lg placeholder-gray-400"
          />
          <button
            onClick={handleUseCurrentLocation}
            className="ml-2 flex justify-center items-center mx-auto px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-400 transition duration-200 ease-in-out shadow-md"
            title="Dùng vị trí hiện tại"
          >
            <span className="text-xl">📍</span>
          </button>
        </div>

        <div className="mt-6">
          <UnitSelector unit={unit} onUnitChange={setUnit} />
        </div>
      </header>

      {isLoading ? (
        <p className="text-center text-gray-700 mt-12">Loading data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-lg p-6 h-full">
            <WeatherCard
              city={debouncedCity}
              lat={lat}
              lon={lon}
              unit={unit}
              onResolvedCity={(resolvedName) => setCity(resolvedName)}
            />
          </div>

          <div className="bg-white bg-opacity-50 backdrop-blur-md rounded-2xl shadow-md p-6 h-full">
            <ForecastChart
              city={debouncedCity}
              lat={lat}
              lon={lon}
              unit={unit}
            />
          </div>

          <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-lg p-6 h-full">
            <AirQualityCard city={debouncedCity} lat={lat} lon={lon} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
