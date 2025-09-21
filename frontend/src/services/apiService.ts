import { DetectionResult, DetectionStatus } from '../types';

export const detectVoice = async (audioBase64: string, mimeType: string): Promise<DetectionResult> => {
  try {
    const formData = new FormData();
    const blob = new Blob([Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0))], { type: mimeType });
    formData.append("file", blob, "audio.wav");

    const response = await fetch("http://localhost:8000/detect", {  // Your FastAPI backend URL
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Backend error");

    return await response.json();
  } catch (error) {
    console.error(error);
    return { status: DetectionStatus.ERROR, message: "Failed to process audio" };
  }
};
