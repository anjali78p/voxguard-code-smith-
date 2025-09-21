import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white text-center py-4 mt-8">
    &copy; {new Date().getFullYear()} VoiceGuard. All rights reserved.
  </footer>
);
