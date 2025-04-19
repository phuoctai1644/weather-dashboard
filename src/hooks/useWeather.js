// hooks/useWeather.js
import { useState, useEffect } from "react";
import { getWeather } from "../utils/api";

const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await getWeather(city);
        if (!cancelled) {
          if (data) {
            setWeather(data);
            setError(null);
          } else {
            setError("Không tìm thấy dữ liệu.");
            setWeather(null);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError("Lỗi khi gọi API.");
          setWeather(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWeather();

    return () => {
      cancelled = true;
    };
  }, [city]);

  return {
    weather,
    coord: weather?.coord || null,
    loading,
    error,
  };
};

export default useWeather;
