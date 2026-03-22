import React, { useState, useEffect } from 'react';
import Card from '../shared/Card';
import { WeatherData, HourlyData, DailyForecast, WeatherAlert } from '../../types';
import { getFarmingAdvice } from '../../services/geminiService';
import Spinner from '../shared/Spinner';
import { SparklesIcon } from '../shared/icons/SparklesIcon';
import { SunIcon } from '../shared/icons/SunIcon';
import { DropletIcon } from '../shared/icons/DropletIcon';
import { WindIcon } from '../shared/icons/WindIcon';
import { ExclamationIcon } from '../shared/icons/ExclamationIcon';

// --- Mock Data ---
const mockWeatherData: WeatherData = {
  location: 'Green Valley, CA',
  temperature: 24,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 10,
  icon: '⛅️',
};

const mockHourlyForecast: HourlyData[] = [
  { time: '3pm', temp: 24, precipChance: 10, icon: '☁️' },
  { time: '4pm', temp: 23, precipChance: 10, icon: '☁️' },
  { time: '5pm', temp: 22, precipChance: 15, icon: '🌦️' },
  { time: '6pm', temp: 21, precipChance: 20, icon: '🌦️' },
  { time: '7pm', temp: 20, precipChance: 10, icon: '☁️' },
  { time: '8pm', temp: 19, precipChance: 5, icon: '☁️' },
];

const mockWeeklyForecast: DailyForecast[] = [
    { day: 'Tue', icon: '☀️', tempHigh: 26, tempLow: 15, precipChance: 10, windSpeed: 12 },
    { day: 'Wed', icon: '🌦️', tempHigh: 22, tempLow: 14, precipChance: 60, windSpeed: 18 },
    { day: 'Thu', icon: '🌧️', tempHigh: 20, tempLow: 13, precipChance: 80, windSpeed: 20 },
    { day: 'Fri', icon: '☀️', tempHigh: 25, tempLow: 16, precipChance: 5, windSpeed: 10 },
    { day: 'Sat', icon: '☁️', tempHigh: 23, tempLow: 15, precipChance: 20, windSpeed: 15 },
];

const mockAlerts: WeatherAlert[] = [
    { title: 'High Wind Advisory', severity: 'Advisory', description: 'Gusts up to 20 km/h expected Wednesday afternoon. Secure loose equipment.' }
];

// --- Helper Components ---
const WeatherIcon: React.FC<{icon: string; className?: string}> = ({icon, className}) => <span className={className}>{icon}</span>

const WeatherPage: React.FC = () => {
    const [advice, setAdvice] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchAdvice = async () => {
            try {
                const generatedAdvice = await getFarmingAdvice(mockWeatherData, mockWeeklyForecast);
                setAdvice(generatedAdvice);
            } catch (err: any) {
                setError(err.message || 'Could not load AI advice.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchAdvice();
    }, []);

    const getSeverityColor = (severity: WeatherAlert['severity']) => {
        switch (severity) {
            case 'Warning': return 'border-red-500 bg-red-50 dark:bg-red-900/50';
            case 'Watch': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/50';
            case 'Advisory': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/50';
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{mockWeatherData.location}</h1>

            {/* AI Farming Advisory */}
            <Card title="AI Farming Advisory" icon={<SparklesIcon />}>
                {isLoading && <Spinner />}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {advice && <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{advice}</p>}
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Weather */}
                <Card title="Current Conditions" className="lg:col-span-1">
                     <div className="flex items-center justify-center my-2">
                        <WeatherIcon icon={mockWeatherData.icon} className="text-6xl" />
                        <p className="text-5xl font-bold text-gray-800 dark:text-white ml-4">{mockWeatherData.temperature}°C</p>
                    </div>
                    <p className="text-center text-lg text-green-600 dark:text-green-400 font-medium">{mockWeatherData.condition}</p>
                     <div className="flex justify-around mt-4 text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-700 pt-4">
                        <div className="text-center"><DropletIcon className="mx-auto" /><span>{mockWeatherData.humidity}%</span></div>
                        <div className="text-center"><WindIcon className="mx-auto" /><span>{mockWeatherData.windSpeed} km/h</span></div>
                    </div>
                </Card>

                {/* Hourly Forecast */}
                <Card title="Hourly Forecast" className="lg:col-span-2">
                    <div className="flex justify-around text-center overflow-x-auto py-2 space-x-4">
                        {mockHourlyForecast.map((hour, index) => (
                            <div key={index} className="flex-shrink-0">
                                <p className="font-semibold text-gray-700 dark:text-gray-300">{hour.time}</p>
                                <WeatherIcon icon={hour.icon} className="text-3xl my-1" />
                                <p className="font-bold text-gray-800 dark:text-white">{hour.temp}°</p>
                                <p className="text-xs text-blue-500">{hour.precipChance}%</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Weekly Outlook */}
            <Card title="Weekly Outlook">
                <div className="space-y-3">
                    {mockWeeklyForecast.map((day) => (
                        <div key={day.day} className="grid grid-cols-5 items-center text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            <p className="text-left font-bold">{day.day}</p>
                            <WeatherIcon icon={day.icon} className="text-2xl mx-auto"/>
                            <p>{day.tempLow}° / {day.tempHigh}°</p>
                            <p className="text-blue-500 flex items-center justify-center gap-1"><DropletIcon className="w-4 h-4" />{day.precipChance}%</p>
                            <p className="flex items-center justify-center gap-1"><WindIcon className="w-4 h-4" />{day.windSpeed} km/h</p>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Alerts */}
            {mockAlerts.length > 0 && (
                 <Card title="Agricultural Alerts">
                    {mockAlerts.map((alert, index) => (
                        <div key={index} className={`p-4 border-l-4 rounded-r-lg ${getSeverityColor(alert.severity)}`}>
                           <div className="flex items-center">
                                <ExclamationIcon className="h-6 w-6 text-current mr-3" />
                                <h4 className="font-bold text-lg text-gray-800 dark:text-white">{alert.title}</h4>
                           </div>
                           <p className="mt-1 ml-9 text-sm text-gray-700 dark:text-gray-300">{alert.description}</p>
                        </div>
                    ))}
                 </Card>
            )}

        </div>
    );
};

export default WeatherPage;
