
import { GoogleGenAI, Type } from "@google/genai";
import { MikrotikData, AiAnalysisResult } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will not work.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A concise, one-sentence summary of the overall network health.",
        },
        recommendations: {
            type: Type.ARRAY,
            description: "An array of 2-4 actionable recommendations for the network administrator.",
            items: { type: Type.STRING },
        },
        preventiveActions: {
            type: Type.ARRAY,
            description: "An array of 2-3 suggested preventive actions with an associated risk level.",
            items: {
                type: Type.OBJECT,
                properties: {
                    action: {
                        type: Type.STRING,
                        description: "The suggested preventive action.",
                    },
                    risk: {
                        type: Type.STRING,
                        description: "The risk level of the action: Low, Medium, or High.",
                    },
                },
                required: ['action', 'risk'],
            },
        },
    },
    required: ['summary', 'recommendations', 'preventiveActions'],
};


export const analyzeMikrotikData = async (data: MikrotikData): Promise<AiAnalysisResult> => {
    if (!API_KEY) {
      throw new Error("Gemini API key is not configured.");
    }
    const model = 'gemini-2.5-flash';

    const prompt = `
        You are an expert Mikrotik network administrator and security analyst.
        Analyze the following JSON object containing the current status of a RouterBoard.
        Identify potential issues, performance bottlenecks, security risks, or anomalies.
        Provide a concise summary, actionable recommendations, and preventive actions.
        Prioritize critical issues like high CPU/memory usage, critical log entries, and unusual traffic patterns.

        Current Router Data:
        ${JSON.stringify(data, null, 2)}
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.5,
            },
        });

        const text = response.text.trim();
        const result: AiAnalysisResult = JSON.parse(text);

        // Basic validation of the parsed object
        if (!result.summary || !Array.isArray(result.recommendations) || !Array.isArray(result.preventiveActions)) {
            throw new Error("AI response is missing required fields.");
        }

        return result;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get analysis from AI. Please check API key and network.");
    }
};
