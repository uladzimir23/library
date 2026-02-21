
import { LayerConfig } from './types';

export const LAYERS: LayerConfig[] = [
  {
    id: 'surface',
    label: 'Surface · Foundation',
    description: 'The base glass layer providing depth via backdrop-filter and subtle gradients.',
    color: 'rgba(99, 102, 241, 0.3)',
    icon: 'Layers'
  },
  {
    id: 'content',
    label: 'Content · Information',
    description: 'Crisp typography and interactive elements positioned for maximum legibility.',
    color: 'rgba(236, 72, 153, 0.3)',
    icon: 'Type'
  },
  {
    id: 'accent',
    label: 'Accent · Branding',
    description: 'Strategic glows and borders that define the visual hierarchy and brand identity.',
    color: 'rgba(34, 197, 94, 0.3)',
    icon: 'Sparkles'
  },
  {
    id: 'interaction',
    label: 'Interaction · Feedback',
    description: 'Dynamic response layer that communicates focus and hover states to users.',
    color: 'rgba(234, 179, 8, 0.3)',
    icon: 'MousePointer'
  },
  {
    id: 'indicator',
    label: 'Indicator · Status',
    description: 'Real-time state signals like notifications, unread counts, or system status.',
    color: 'rgba(239, 68, 68, 0.3)',
    icon: 'Bell'
  },
  {
    id: 'overlay',
    label: 'Overlay · Control',
    description: 'The final protective layer for modal dimming, loading skeletons, or disabled states.',
    color: 'rgba(0, 0, 0, 0.5)',
    icon: 'Shield'
  }
];
