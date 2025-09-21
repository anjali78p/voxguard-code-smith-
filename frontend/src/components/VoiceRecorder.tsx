import React, { useRef, useState } from 'react';

interface VoiceRecorderProps {
  onDetect: (audioData: File | Blob) => Promise<void>;
  isLoading: boolean;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onDetect, isLoading }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        setAudioURL(URL.createObjectURL(audioBlob));
        onDetect(audioBlob);
      };
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      setError('Microphone access denied or not available.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Voice Recorder</h2>
      <div className="flex gap-4 mb-2">
        {!recording ? (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={startRecording}
            disabled={isLoading || recording}
          >
            Start Recording
          </button>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={stopRecording}
            disabled={isLoading}
          >
            Stop Recording
          </button>
        )}
      </div>
      {audioURL && (
        <audio controls src={audioURL} className="mb-2" />
      )}
      {isLoading && <p className="text-blue-500 mt-2">Detecting...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
