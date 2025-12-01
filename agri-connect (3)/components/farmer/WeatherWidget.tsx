
import React from 'react';
import Card from '../shared/Card';
import { WeatherIcon } from '../shared/icons/WeatherIcon';
import { WeatherData } from '../../types';

const mockWeatherData: WeatherData = {
  location: 'Green Valley, CA',
  temperature: 24,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 10,
  icon: '⛅️',
};

const mockForecast = [
    { day: 'Tue', icon: '☀️', temp: 26 },
    { day: 'Wed', icon: '🌦️', temp: 22 },
    { day: 'Thu', icon: '🌧️', temp: 20 },
    { day: 'Fri', icon: '☀️', temp: 25 },
    { day: 'Sat', icon: '☁️', temp: 23 },
]

const WeatherWidget: React.FC = () => {
  return (
    <Card title="Weather Forecast" icon={<WeatherIcon />}>
      <div className="text-center border-b pb-4 mb-4 dark:border-gray-700">
        <p className="text-sm text-gray-500">{mockWeatherData.location}</p>
        <div className="flex items-center justify-center my-2">
          <span className="text-6xl">{mockWeatherData.icon}</span>
          <p className="text-5xl font-bold text-gray-800 dark:text-white ml-4">{mockWeatherData.temperature}°C</p>
        </div>
        <p className="text-lg text-green-600 dark:text-green-400 font-medium">{mockWeatherData.condition}</p>
        <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500">
          <span>Humidity: {mockWeatherData.humidity}%</span>
          <span>Wind: {mockWeatherData.windSpeed} km/h</span>
        </div>
      </div>
      <div className="flex justify-around text-center">
          {mockForecast.map(f => (
            <div key={f.day}>
                <p className="font-semibold text-gray-700 dark:text-gray-300">{f.day}</p>
                <p className="text-2xl my-1">{f.icon}</p>
                <p className="text-gray-800 dark:text-white">{f.temp}°</p>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default WeatherWidget;
