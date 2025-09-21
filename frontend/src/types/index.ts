export enum DetectionStatus {
  REAL = 'real',
  SPOOF = 'spoof',
  SUSPICIOUS = 'suspicious',
  ERROR = 'error',
  NONE = 'none',
}

export interface DetectionResult {
  status: DetectionStatus;
  confidence?: number;
  reasoning?: string;
  message?: string;
}
