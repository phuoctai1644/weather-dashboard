import React, { useEffect, useState } from "react";
import { getAirQuality } from "../utils/api";
import useWeather from "../hooks/useWeather";
import useSmoothLoading from "../hooks/useSmoothLoading";

const aqiDescriptions = {
  1: { label: "Tốt", color: "bg-green-500" },
  2: { label: "Khá", color: "bg-lime-500" },
  3: { label: "Trung bình", color: "bg-yellow-500" },
  4: { label: "Kém", color: "bg-orange-500" },
  5: { label: "Rất kém", color: "bg-red-500" },
};

const AirQualityCard = ({ city, lat = null, lon = null }) => {
  const { coord, loading: coordLoading, error: coordError } = useWeather(city, lat, lon);
  const [airData, setAirData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoading = useSmoothLoading(coordLoading || loading);

  useEffect(() => {
    if (!coord) return;

    const fetchAirQuality = async () => {
      setLoading(true);
      const data = await getAirQuality(coord.lat, coord.lon);
      setAirData(data);
      setLoading(false);
    };

    fetchAirQuality();
  }, [coord]);

  const loadingSkeleton = (
    <div className="h-full flex flex-col justify-center items-center text-center min-h-[320px] animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4" />
      <div className="w-1/2 h-8 bg-gray-300 rounded mb-4" />
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
    </div>
  );

  if (isLoading) return loadingSkeleton;
  if (coordError) return <div className="text-red-500">{coordError}</div>;
  if (!airData || !airData.list || airData.list.length === 0) return null;

  const aqi = airData.list[0].main.aqi;
  const components = airData.list[0].components;
  const { label, color } = aqiDescriptions[aqi];

  return (
    <div className="h-full flex flex-col justify-center items-center text-center min-h-[320px]">
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
