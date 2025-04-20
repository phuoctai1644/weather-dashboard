import useSmoothLoading from "../hooks/useSmoothLoading";
import useWeather from "../hooks/useWeather";
import { convertTemperature } from "../utils/helper";
import { TEMPERATURE_UNITS } from "../utils/const";

const WeatherCard = ({ city, unit }) => {
  const { weather, loading, error } = useWeather(city, unit);
  const isLoading = useSmoothLoading(loading);

  const loadingSkeleton = (
    <div className="min-h-[300px] flex flex-col justify-center items-center animate-pulse text-center">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4" />
      <div className="w-24 h-24 bg-gray-300 rounded-full mb-4" />
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
      <div className="h-10 bg-gray-300 rounded w-1/2 mb-4" />
      <div className="flex gap-6">
        <div className="h-4 w-12 bg-gray-300 rounded" />
        <div className="h-4 w-12 bg-gray-300 rounded" />
      </div>
    </div>
  );

  if (isLoading) return loadingSkeleton;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!weather) return null;

  const { name, main, weather: weatherArr, wind } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherArr[0].icon}@4x.png`;

  const temperature = convertTemperature(main.temp, unit);
  const unitInfo = TEMPERATURE_UNITS.find((u) => u.value === unit);

  return (
    <div className="h-full flex flex-col justify-center items-center text-center min-h-[320px]">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
      <img src={iconUrl} alt="weather icon" className="w-24 h-24 mb-2" />
      <p className="text-lg capitalize text-gray-700">{weatherArr[0].description}</p>
      <p className="text-5xl font-semibold text-blue-800 mt-2">
        {temperature}
        {unitInfo?.symbol}
      </p>
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
