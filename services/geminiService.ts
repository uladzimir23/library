import { GoogleGenAI, Type } from "@google/genai";
import { AICssResponse } from "../types";

export const generateGlassStyle = async (prompt: string): Promise<AICssResponse> => {
  // Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Design a professional glassmorphism card style based on this description: "${prompt}". 
               Provide Tailwind classes AND exact numeric values for a constructor.
               The output MUST be a valid JSON object.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tailwindClasses: { type: Type.STRING },
          explanation: { type: Type.STRING },
          styleObject: {
            type: Type.OBJECT,
            properties: {
              backgroundColor: { type: Type.STRING },
              backdropFilter: { type: Type.STRING },
              border: { type: Type.STRING },
              borderRadius: { type: Type.STRING }
            }
          },
          studioValues: {
            type: Type.OBJECT,
            properties: {
              opacity: { type: Type.NUMBER, description: "0 to 1" },
              // Fixed: Use Type.NUMBER instead of Number constructor
              blur: { type: Type.NUMBER, description: "0 to 40" },
              borderAlpha: { type: Type.NUMBER, description: "0 to 1" },
              radius: { type: Type.NUMBER, description: "0 to 50" },
              accentColor: { type: Type.STRING }
            }
          }
        },
        required: ["tailwindClasses", "explanation", "styleObject", "studioValues"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response text from Gemini");
  }

  try {
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Could not generate design style");
  }
};
