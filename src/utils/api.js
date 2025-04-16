import axios from 'axios';

const API_KEY = '77e8b7756760fcc4531d4fb93070edaf';

const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

export const getWeather = async (city) => {
  try {
    const response = await apiClient.get('/weather', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const getForecast = async (lat, lon) => {
  try {
    const response = await apiClient.get('/forecast', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
};

export const getAirQuality = async (lat, lon) => {
  try {
    const response = await apiClient.get('/air_pollution', {
      params: { lat, lon },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return null;
  }
};
