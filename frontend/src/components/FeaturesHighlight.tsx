import React from 'react';

export const FeaturesHighlight: React.FC = () => (
  <section className="p-4 border rounded bg-white shadow">
    <h2 className="text-xl font-bold mb-2">Features Highlight</h2>
    {/* Features highlight UI goes here */}
    <ul className="list-disc pl-5">
      <li>AI-powered deepfake detection</li>
      <li>Instant results</li>
      <li>Easy file upload & recording</li>
    </ul>
  </section>
);
