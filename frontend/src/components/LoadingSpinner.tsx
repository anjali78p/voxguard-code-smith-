import React from 'react';
export const Header: React.FC = () => (
  <header className="bg-gradient-to-r from-primary-blue to-blue-600 text-white shadow-lg py-12 px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
      VoiceGuard 🛡️ – AI Voice Deepfake Detection
    </h1>
    <p className="text-lg md:text-xl font-light opacity-90">
      Upload or record a voice sample to instantly verify its authenticity.
    </p>
  </header>
);
