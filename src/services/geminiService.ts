import { GoogleGenAI } from "@google/genai";
import type { Movie } from '../types';

// Helper to safely get the API key in various environments (Vite, Next, etc)
const getApiKey = (): string => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {}

  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {}
  
  return '';
};

// Initialize Gemini Client only if key exists, otherwise we handle it in the function
const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getGeminiRecommendations = async (query: string): Promise<Movie[]> => {
  if (!ai || !apiKey) {
      console.warn("Gemini API Key missing. Falling back to local search.");
      return [];
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a movie recommendation engine for a streaming app.
      The user searched for: "${query}".
      Return a list of 5 movies that match this vibe.
      Provide the response in pure JSON format:
      [
        {
          "id": "unique_string",
          "title": "Movie Title",
          "year": "YYYY",
          "rating": 8.5,
          "image": "https://picsum.photos/seed/{movie_title_slug}/300/450"
        }
      ]
      Ensure the image URL uses picsum.photos/seed/{slug}/300/450 so it generates a consistent image.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) return [];

    const movies = JSON.parse(text) as Movie[];
    return movies;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};