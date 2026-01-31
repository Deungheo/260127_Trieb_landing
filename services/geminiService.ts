
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Use process.env.API_KEY directly and avoid initializing until needed
let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Always use the latest API_KEY from process.env
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    // Updated to the recommended model for basic text/chat tasks
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the Trieb Concierge. Trieb is a high-end wellness brand. 
      Our flagship product is 'Praxis', a 3-in-1 Synbiotic (Pre, Pro, Post-biotics).
      
      Tone: Sophisticated, scientific, empathetic, and minimalist. 
      Key Features: 11B CFU, Dual-capsule technology, Clean label, Made Traceable.
      
      Answer questions about gut health and Praxis specifically. Keep responses under 60 words.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!process.env.API_KEY) return "시스템이 오프라인입니다.";
  try {
    const chat = initializeChat();
    // sendMessage returns a GenerateContentResponse
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    // Use the .text property (not a method) to extract the response
    return response.text || "통신이 중단되었습니다.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "신호가 불안정합니다. 다시 시도해주세요.";
  }
};
