import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { getForecast } from "../utils/api";
import useWeather from "../hooks/useWeather";
import useSmoothLoading from "../hooks/useSmoothLoading";
import { convertTemperature } from "../utils/helper";
import { TEMPERATURE_UNITS } from "../utils/const";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const ForecastChart = ({ city, unit }) => {
  const { coord, loading: coordLoading, error: coordError } = useWeather(city);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoading = useSmoothLoading(coordLoading || loading);

  useEffect(() => {
    if (!coord) return;

    const fetchForecast = async () => {
      setLoading(true);
      const data = await getForecast(coord.lat, coord.lon);
      setForecast(data);
      setLoading(false);
    };

    fetchForecast();
  }, [coord]);

  const loadingSkeleton = (
    <div className="p-6 rounded-2xl max-w-3xl mx-auto min-h-[300px] flex flex-col justify-center items-center animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4" />
      <div className="w-full h-48 bg-gray-300 rounded mb-4" />
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-2" />
    </div>
  );

  if (isLoading) return loadingSkeleton;
  if (coordError) return <div className="text-red-500">{coordError}</div>;
  if (!forecast || !forecast.list) return null;

  const daysMap = forecast.list.reduce((acc, item) => {
    const dateObj = new Date(item.dt * 1000);
    const dayString = dateObj.toLocaleDateString("vi-VN", { weekday: "short" });

    if (!acc[dayString]) acc[dayString] = [];
    acc[dayString].push(item.main.temp);

    return acc;
  }, {});

  const dayLabels = Object.keys(daysMap);
  const tempsMax = dayLabels.map((day) =>
    convertTemperature(Math.max(...daysMap[day]), unit)
  );
  const tempsMin = dayLabels.map((day) =>
    convertTemperature(Math.min(...daysMap[day]), unit)
  );

  const unitInfo = TEMPERATURE_UNITS.find((u) => u.value === unit);

  const chartData = {
    labels: dayLabels,
    datasets: [
      {
        label: `Nhiệt độ cao nhất (${unitInfo?.symbol})`,
        data: tempsMax,
        fill: false,
        borderColor: "#FF0000",
        tension: 0.4,
      },
      {
        label: `Nhiệt độ thấp nhất (${unitInfo?.symbol})`,
        data: tempsMin,
        fill: false,
        borderColor: "#0000FF",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 rounded-2xl max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center">Dự báo (nhóm theo ngày)</h3>
      <Line data={chartData} />
    </div>
  );
};

export default ForecastChart;
