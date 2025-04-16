import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const ForecastChart = ({ data }) => {
  if (!data || !data.list) {
    return <div>Loading...</div>;
  }

  // Nhóm dữ liệu theo ngày
  const daysMap = data.list.reduce((acc, item) => {
    const dateObj = new Date(item.dt * 1000);
    const dayString = dateObj.toLocaleDateString('vi-VN', { weekday: 'short' });

    if (!acc[dayString]) {
      acc[dayString] = [];
    }
    acc[dayString].push(item.main.temp);

    return acc;
  }, {});

  // Tạo mảng labels và tính min/max cho mỗi ngày
  const dayLabels = Object.keys(daysMap);
  const tempsMax = dayLabels.map(day => Math.max(...daysMap[day]));
  const tempsMin = dayLabels.map(day => Math.min(...daysMap[day]));

  // Cấu hình dữ liệu cho chart
  const chartData = {
    labels: dayLabels,
    datasets: [
      {
        label: 'Nhiệt độ cao nhất (°C)',
        data: tempsMax,
        fill: false,
        borderColor: '#FF0000',
        tension: 0.4,
      },
      {
        label: 'Nhiệt độ thấp nhất (°C)',
        data: tempsMin,
        fill: false,
        borderColor: '#0000FF',
        tension: 0.4,
      }
    ],
  };

  return (
    <div className="p-6 mt-6 bg-white rounded-2xl shadow-md max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center">Dự báo (nhóm theo ngày)</h3>
      <Line data={chartData} />
    </div>
  );
};

export default ForecastChart;
