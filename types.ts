
import React from 'react';

export type LayerKey = 'surface' | 'content' | 'accent' | 'interaction' | 'indicator' | 'overlay';

export interface LayerConfig {
  id: LayerKey;
  label: string;
  description: string;
  color: string;
  icon: string;
}

export interface GlassStudioState {
  opacity: number;
  blur: number;
  borderAlpha: number;
  radius: number;
  zMultiplier: number;
  is3D: boolean;
  isFloating: boolean;
  accentColor: string;
  title: string;
}

export interface AICssResponse {
  tailwindClasses: string;
  explanation: string;
  styleObject: React.CSSProperties;
  studioValues?: Partial<GlassStudioState>;
}
