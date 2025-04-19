import React from 'react';

const aqiDescriptions = {
  1: { label: 'Tốt', color: 'bg-green-500' },
  2: { label: 'Khá', color: 'bg-lime-500' },
  3: { label: 'Trung bình', color: 'bg-yellow-500' },
  4: { label: 'Kém', color: 'bg-orange-500' },
  5: { label: 'Rất kém', color: 'bg-red-500' },
};

const AirQualityCard = ({ data }) => {
  if (!data || !data.list || data.list.length === 0) return <div>Đang tải chất lượng không khí...</div>;

  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components;
  const { label, color } = aqiDescriptions[aqi];

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h3 className="text-lg font-semibold mb-4 text-center">Chất lượng không khí</h3>
      <div className={`flex items-center justify-center text-xl text-white w-1/2 py-2 font-bold rounded ${color}`}>
        {label} (AQI: {aqi})
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-700">
        <div>PM2.5: {components.pm2_5} µg/m³</div>
        <div>PM10: {components.pm10} µg/m³</div>
        <div>CO: {components.co} µg/m³</div>
        <div>NO₂: {components.no2} µg/m³</div>
        <div>O₃: {components.o3} µg/m³</div>
        <div>SO₂: {components.so2} µg/m³</div>
      </div>
    </div>
  );
};

export default AirQualityCard;
