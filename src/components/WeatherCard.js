import React from 'react';

const WeatherCard = ({ data }) => {
  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <img src={iconUrl} alt="weather icon" className="mx-auto mb-2" />
      <p className="text-xl">{weather[0].description}</p>
      <p className="text-3xl font-semibold">{main.temp}°C</p>
      <div className="mt-4 flex justify-around text-sm text-gray-600">
        <div>💧 Độ ẩm: {main.humidity}%</div>
        <div>💨 Gió: {wind.speed} km/h</div>
      </div>
    </div>
  );
};

export default WeatherCard;
