
import { GoogleGenAI, Type } from "@google/genai";
import { DiseasePrediction, WeatherData, DailyForecast } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const diseasePredictionSchema = {
    type: Type.OBJECT,
    properties: {
        diseaseName: { type: Type.STRING, description: "The common name of the plant disease. If no disease is detected, respond with 'Healthy'." },
        description: { type: Type.STRING, description: "A brief, easy-to-understand description of the disease and its symptoms." },
        severity: { type: Type.STRING, description: "The estimated severity of the disease. Can be 'Low', 'Medium', or 'High'." },
        confidence: { type: Type.NUMBER, description: "A confidence score (0.0 to 1.0) for the prediction." },
        fertilizerRecommendation: { type: Type.STRING, description: "Specific fertilizer recommendations to help the plant recover or stay healthy. Suggest organic options if possible." },
        pesticideRecommendation: { type: Type.STRING, description: "Specific pesticide recommendations to treat the disease. Suggest organic or non-chemical options first." },
    },
    required: ["diseaseName", "description", "severity", "confidence", "fertilizerRecommendation", "pesticideRecommendation"],
};


export const predictCropDisease = async (
  base64ImageData: string,
  mimeType: string
): Promise<DiseasePrediction> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64ImageData,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: "Analyze this image of a plant leaf. Identify any diseases, their severity, and recommend specific fertilizers and pesticides. Respond with 'Healthy' if no disease is found. Provide your analysis in the requested JSON format.",
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: diseasePredictionSchema,
      },
    });

    const jsonString = response.text;
    const parsedJson = JSON.parse(jsonString);
    
    // Validate that the parsed object matches the DiseasePrediction interface
    if (
      typeof parsedJson.diseaseName === 'string' &&
      typeof parsedJson.description === 'string' &&
      ['Low', 'Medium', 'High'].includes(parsedJson.severity) &&
      typeof parsedJson.confidence === 'number' &&
      typeof parsedJson.fertilizerRecommendation === 'string' &&
      typeof parsedJson.pesticideRecommendation === 'string'
    ) {
      return parsedJson as DiseasePrediction;
    } else {
      throw new Error("AI response did not match the expected format.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get crop disease prediction. Please check your API key and try again.");
  }
};


export const getFarmingAdvice = async (
  weather: WeatherData,
  forecast: DailyForecast[]
): Promise<string> => {
  try {
     if (!process.env.API_KEY) {
        throw new Error("API_KEY is not configured. Please set the environment variable.");
      }
    const prompt = `
      As an expert agronomist, provide a brief, actionable farming advisory based on the following weather data.
      Focus on recommendations for today and the next 2-3 days.
      Mention irrigation needs, suitability for spraying pesticides (considering wind and rain), and any potential pest/disease risks due to humidity or temperature changes.
      Keep the advice concise and easy to read.

      Current Weather:
      - Condition: ${weather.condition}
      - Temperature: ${weather.temperature}°C
      - Humidity: ${weather.humidity}%
      - Wind: ${weather.windSpeed} km/h

      Forecast:
      ${forecast.map(f => `- ${f.day}: High ${f.tempHigh}°C, Low ${f.tempLow}°C, ${f.precipChance}% chance of rain, Wind ${f.windSpeed} km/h`).join('\n')}
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error getting farming advice from Gemini API:", error);
    throw new Error("Failed to generate farming advice.");
  }
};