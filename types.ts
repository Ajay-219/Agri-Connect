import { UserRole } from './constants';
export interface User {
  name: string;
  role: UserRole;
  avatar: string;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

export interface Post {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string; 
}

export interface HourlyData {
  time: string;
  temp: number;
  precipChance: number;
  icon: '☀️' | '☁️' | '🌦️' | '🌧️';
}

export interface DailyForecast {
    day: string;
    icon: '☀️' | '☁️' | '🌦️' | '🌧️';
    tempHigh: number;
    tempLow: number;
    precipChance: number;
    windSpeed: number;
}

export interface WeatherAlert {
    title: string;
    severity: 'Warning' | 'Watch' | 'Advisory';
    description: string;
}

export interface CropStage {
  name: string;
  status: 'completed' | 'current' | 'upcoming';
  duration?: number;
}

export interface DiseasePrediction {
  diseaseName: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  confidence: number;
  fertilizerRecommendation: string;
  pesticideRecommendation: string;
}

export interface Pest {
  name: string;
  description: string;
  prevention: string;
}

export interface Disease {
  name: string;
  description: string;
  fertilizerRecommendation: string;
  pesticideRecommendation: string;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  category: 'Labor' | 'Fertilizer' | 'Pesticide' | 'Fuel' | 'Other';
  amount: number;
}

export interface Sale {
  id: string;
  date: string;
  quantitySold: number;
  pricePerUnit: number;
  totalAmount: number;
}

export interface Crop {
  id: string;
  name: string;
  variety: string;
  plantingDate: string;
  expectedHarvest: string;
  expectedYield: string;
  imageUrl: string;
  stages: CropStage[];
  commonPests: Pest[];
  commonDiseases: Disease[];
  expenses: Expense[];
  sales: Sale[];
}

export interface ChatMessage {
  id: number;
  text: string;
  timestamp: string;
  sender: 'me' | 'other';
}

export interface Conversation {
  id: string;
  contact: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  messages: ChatMessage[];
}

export interface Market {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  commodities: string[];
  description: string;
  contactPerson: string;
  phone: string;
}