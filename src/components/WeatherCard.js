import React from 'react';

const WeatherCard = ({ data }) => {
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
      <img src={iconUrl} alt="weather icon" className="w-24 h-24 mb-2" />
      <p className="text-lg capitalize text-gray-700">{weather[0].description}</p>
      <p className="text-5xl font-semibold text-blue-800 mt-2">{main.temp}°C</p>
      <div className="mt-4 flex gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <span className="text-blue-600">💧</span> {main.humidity}%
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">🌬️</span> {wind.speed} km/h
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
