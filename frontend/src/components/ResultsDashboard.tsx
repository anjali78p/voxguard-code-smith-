import React from 'react';
import { DetectionResult } from '../types';

interface ResultsDashboardProps {
  result: DetectionResult | null;
  isLoading: boolean;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, isLoading }) => (
  <div className="p-4 border rounded bg-white shadow">
    <h2 className="text-xl font-bold mb-2">Results Dashboard</h2>
    {isLoading ? (
      <p className="text-blue-500">Detecting...</p>
    ) : result ? (
      <div>
        <p className="text-lg">Status: <span className="font-semibold">{result.status}</span></p>
        {result.confidence !== undefined && <p>Confidence: {result.confidence}%</p>}
        {result.reasoning && <p>Reasoning: {result.reasoning}</p>}
        {result.message && <p>Message: {result.message}</p>}
      </div>
    ) : (
      <p>No results yet.</p>
    )}
  </div>
);
