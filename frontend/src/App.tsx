import React, { useState } from 'react'; 
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { VoiceRecorder } from './components/VoiceRecorder';
import { ResultsDashboard } from './components/ResultsDashboard';
import { FeaturesHighlight } from './components/FeaturesHighlight';
import { Footer } from './components/Footer';
import { DetectionResult, DetectionStatus } from './types';
import { detectVoice } from './services/apiService';
import { toBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDetection = async (audioData: File | Blob) => {
    setIsLoading(true);
    setDetectionResult(null);

    try {
      const audioBase64 = await toBase64(audioData);
      const mimeType = audioData.type || 'audio/wav';
      const result = await detectVoice(audioBase64, mimeType);
      setDetectionResult(result);
    } catch (error) {
      console.error("Detection handling failed:", error);
      setDetectionResult({
         status: DetectionStatus.ERROR, 
         message: "Failed to process audio file. Please check the file format and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-bg text-gray-800 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <FileUpload onDetect={handleDetection} isLoading={isLoading} />
            <VoiceRecorder onDetect={handleDetection} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-1">
            <ResultsDashboard result={detectionResult} isLoading={isLoading} />
          </div>
        </section>
        <FeaturesHighlight />
      </main>
      <Footer />
    </div>
  );
};

export default App;
