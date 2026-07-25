export interface VisualShape {
  type: 'circle' | 'rect' | 'path' | 'ellipse' | 'line';
  props: Record<string, string | number>;
}

export interface KanaVisualEntry {
  bgColor: string;
  shapes: VisualShape[];
}

export const hiraganaVisuals: Record<string, KanaVisualEntry> = {
  'あ': {
    bgColor: '#FFCDD2',
    shapes: [
      { type: 'circle', props: { cx: 70, cy: 75, r: 28, fill: '#EF5350', opacity: 0.75 } },
      { type: 'path', props: { d: 'M66,47 Q70,36 74,47 Q78,37 80,45', stroke: '#66BB6A', strokeWidth: 3, fill: '#81C784', opacity: 0.9 } },
      { type: 'line', props: { x1: 70, y1: 47, x2: 70, y2: 40, stroke: '#5D4037', strokeWidth: 2.5, strokeLinecap: 'round' } },
    ],
  },
  'い': {
    bgColor: '#FFF9C4',
    shapes: [
      { type: 'rect', props: { x: 44, y: 40, width: 6, height: 50, rx: 3, fill: '#FF7043', opacity: 0.8 } },
      { type: 'circle', props: { cx: 47, cy: 32, r: 6, fill: '#FF7043', opacity: 0.8 } },
      { type: 'rect', props: { x: 85, y: 50, width: 6, height: 50, rx: 3, fill: '#FF7043', opacity: 0.7 } },
      { type: 'circle', props: { cx: 88, cy: 42, r: 6, fill: '#FF7043', opacity: 0.7 } },
    ],
  },
  'う': {
    bgColor: '#C8E6C9',
    shapes: [
      { type: 'path', props: { d: 'M40,65 Q70,35 95,60 Q80,80 65,75', stroke: '#66BB6A', strokeWidth: 4, fill: 'none', strokeLinecap: 'round' } },
      { type: 'circle', props: { cx: 70, cy: 52, r: 4, fill: '#388E3C', opacity: 0.6 } },
    ],
  },
  'え': {
    bgColor: '#BBDEFB',
    shapes: [
      { type: 'line', props: { x1: 45, y1: 55, x2: 95, y2: 55, stroke: '#42A5F5', strokeWidth: 2, opacity: 0.7 } },
      { type: 'line', props: { x1: 45, y1: 72, x2: 95, y2: 72, stroke: '#42A5F5', strokeWidth: 2, opacity: 0.7 } },
      { type: 'line', props: { x1: 45, y1: 89, x2: 95, y2: 89, stroke: '#42A5F5', strokeWidth: 2, opacity: 0.7 } },
      { type: 'line', props: { x1: 55, y1: 42, x2: 55, y2: 100, stroke: '#42A5F5', strokeWidth: 2, opacity: 0.7 } },
      { type: 'line', props: { x1: 72, y1: 42, x2: 72, y2: 100, stroke: '#42A5F5', strokeWidth: 2, opacity: 0.7 } },
      { type: 'line', props: { x1: 89, y1: 42, x2: 89, y2: 100, stroke: '#42A5F5', strokeWidth: 2, opacity: 0.7 } },
    ],
  },
  'お': {
    bgColor: '#FFE0B2',
    shapes: [
      { type: 'circle', props: { cx: 70, cy: 70, r: 30, stroke: '#FF7043', strokeWidth: 4, fill: 'none', opacity: 0.8 } },
      { type: 'circle', props: { cx: 70, cy: 70, r: 4, fill: '#FF7043', opacity: 0.6 } },
    ],
  },
  'か': {
    bgColor: '#D7CCC8',
    shapes: [
      { type: 'line', props: { x1: 50, y1: 42, x2: 95, y2: 95, stroke: '#78909C', strokeWidth: 5, strokeLinecap: 'round', opacity: 0.8 } },
      { type: 'line', props: { x1: 50, y1: 42, x2: 38, y2: 38, stroke: '#8D6E63', strokeWidth: 4, strokeLinecap: 'round' } },
      { type: 'line', props: { x1: 44, y1: 42, x2: 48, y2: 36, stroke: '#FFD54F', strokeWidth: 2.5, opacity: 0.8 } },
    ],
  },
  'き': {
    bgColor: '#FFF9C4',
    shapes: [
      { type: 'circle', props: { cx: 58, cy: 42, r: 10, stroke: '#FFA000', strokeWidth: 3, fill: 'none', opacity: 0.8 } },
      { type: 'line', props: { x1: 58, y1: 52, x2: 58, y2: 95, stroke: '#FFA000', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.8 } },
      { type: 'line', props: { x1: 58, y1: 62, x2: 80, y2: 58, stroke: '#FFA000', strokeWidth: 3, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 58, y1: 78, x2: 80, y2: 74, stroke: '#FFA000', strokeWidth: 3, strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'く': {
    bgColor: '#C8E6C9',
    shapes: [
      { type: 'path', props: { d: 'M50,45 Q95,55 70,95', stroke: '#43A047', strokeWidth: 5, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
  'け': {
    bgColor: '#FFE0B2',
    shapes: [
      { type: 'line', props: { x1: 55, y1: 35, x2: 55, y2: 100, stroke: '#EF6C00', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 55, y1: 55, x2: 90, y2: 42, stroke: '#EF6C00', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 55, y1: 65, x2: 85, y2: 85, stroke: '#EF6C00', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'こ': {
    bgColor: '#BBDEFB',
    shapes: [
      { type: 'ellipse', props: { cx: 70, cy: 48, rx: 28, ry: 10, fill: '#5C6BC0', opacity: 0.6 } },
      { type: 'ellipse', props: { cx: 70, cy: 88, rx: 28, ry: 10, fill: '#5C6BC0', opacity: 0.6 } },
    ],
  },
  'さ': {
    bgColor: '#E1BEE7',
    shapes: [
      { type: 'circle', props: { cx: 70, cy: 55, r: 22, fill: '#AB47BC', opacity: 0.5 } },
      { type: 'ellipse', props: { cx: 62, cy: 68, rx: 4, ry: 8, fill: '#7B1FA2', opacity: 0.7 } },
    ],
  },
  'し': {
    bgColor: '#B2DFDB',
    shapes: [
      { type: 'path', props: { d: 'M45,45 Q40,85 70,95 Q100,85 95,60', stroke: '#00897B', strokeWidth: 5, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
  'す': {
    bgColor: '#FFF9C4',
    shapes: [
      { type: 'path', props: { d: 'M50,50 Q50,35 70,35 Q90,35 90,55 Q90,85 70,95 Q50,85 60,70', stroke: '#F9A825', strokeWidth: 4, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
  'せ': {
    bgColor: '#BBDEFB',
    shapes: [
      { type: 'path', props: { d: 'M45,70 Q55,50 70,60 Q85,70 90,55', stroke: '#1E88E5', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
      { type: 'path', props: { d: 'M50,90 L65,70 L80,90 Z', stroke: '#1E88E5', strokeWidth: 3, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', opacity: 0.7 } },
    ],
  },
  'そ': {
    bgColor: '#F8BBD0',
    shapes: [
      { type: 'path', props: { d: 'M80,45 Q50,40 45,65 Q40,90 65,95 Q90,90 85,70 Q80,55 65,60', stroke: '#D81B60', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'た': {
    bgColor: '#FFE0B2',
    shapes: [
      { type: 'line', props: { x1: 50, y1: 50, x2: 90, y2: 50, stroke: '#FB8C00', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 70, y1: 35, x2: 70, y2: 95, stroke: '#FB8C00', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'path', props: { d: 'M50,35 L50,65 L70,80', stroke: '#FB8C00', strokeWidth: 3, fill: 'none', strokeLinecap: 'round', opacity: 0.6 } },
    ],
  },
  'ち': {
    bgColor: '#E1BEE7',
    shapes: [
      { type: 'path', props: { d: 'M85,40 Q55,38 50,55 Q45,75 65,80 Q80,78 75,68', stroke: '#8E24AA', strokeWidth: 4, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
      { type: 'line', props: { x1: 50, y1: 55, x2: 85, y2: 55, stroke: '#8E24AA', strokeWidth: 2.5, opacity: 0.5 } },
    ],
  },
  'つ': {
    bgColor: '#BBDEFB',
    shapes: [
      { type: 'path', props: { d: 'M40,80 Q55,45 85,55 Q105,62 95,80', stroke: '#039BE5', strokeWidth: 5, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
  'て': {
    bgColor: '#C8E6C9',
    shapes: [
      { type: 'line', props: { x1: 50, y1: 50, x2: 90, y2: 50, stroke: '#43A047', strokeWidth: 5, strokeLinecap: 'round', opacity: 0.8 } },
      { type: 'line', props: { x1: 70, y1: 50, x2: 70, y2: 95, stroke: '#43A047', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
  'と': {
    bgColor: '#D7CCC8',
    shapes: [
      { type: 'line', props: { x1: 55, y1: 40, x2: 55, y2: 88, stroke: '#6D4C41', strokeWidth: 5, strokeLinecap: 'round', opacity: 0.8 } },
      { type: 'line', props: { x1: 55, y1: 88, x2: 90, y2: 88, stroke: '#6D4C41', strokeWidth: 5, strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
  'な': {
    bgColor: '#FFF9C4',
    shapes: [
      { type: 'path', props: { d: 'M40,75 Q55,90 85,90 Q105,85 100,75', stroke: '#F9A825', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 48, y1: 55, x2: 48, y2: 95, stroke: '#F57F17', strokeWidth: 3, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 62, y1: 50, x2: 62, y2: 95, stroke: '#F57F17', strokeWidth: 3, strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'に': {
    bgColor: '#B2DFDB',
    shapes: [
      { type: 'line', props: { x1: 40, y1: 52, x2: 100, y2: 52, stroke: '#26C6DA', strokeWidth: 5, strokeLinecap: 'round', opacity: 0.8 } },
      { type: 'line', props: { x1: 40, y1: 78, x2: 100, y2: 78, stroke: '#26C6DA', strokeWidth: 5, strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
  'ぬ': {
    bgColor: '#F8BBD0',
    shapes: [
      { type: 'path', props: { d: 'M50,55 Q50,35 72,35 Q95,35 95,60 Q95,90 65,95 Q45,90 50,70 Q55,55 70,60', stroke: '#D81B60', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'ね': {
    bgColor: '#FFE0B2',
    shapes: [
      { type: 'path', props: { d: 'M70,95 Q45,80 45,55 Q45,35 65,40', stroke: '#FF6F00', strokeWidth: 4, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
      { type: 'path', props: { d: 'M88,45 L78,35 L68,42', stroke: '#FF6F00', strokeWidth: 3, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', opacity: 0.7 } },
    ],
  },
  'の': {
    bgColor: '#FFCDD2',
    shapes: [
      { type: 'circle', props: { cx: 70, cy: 68, r: 28, stroke: '#E53935', strokeWidth: 4, fill: 'none', opacity: 0.7 } },
      { type: 'line', props: { x1: 48, y1: 50, x2: 92, y2: 86, stroke: '#E53935', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'は': {
    bgColor: '#C8E6C9',
    shapes: [
      { type: 'circle', props: { cx: 70, cy: 45, r: 16, fill: '#388E3C', opacity: 0.5 } },
      { type: 'line', props: { x1: 55, y1: 38, x2: 35, y2: 55, stroke: '#388E3C', strokeWidth: 3.5, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 85, y1: 38, x2: 105, y2: 55, stroke: '#388E3C', strokeWidth: 3.5, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 70, y1: 61, x2: 70, y2: 95, stroke: '#388E3C', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'ひ': {
    bgColor: '#FFF9C4',
    shapes: [
      { type: 'path', props: { d: 'M35,65 Q70,40 105,65', stroke: '#FBC02D', strokeWidth: 5, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
  'ふ': {
    bgColor: '#E1BEE7',
    shapes: [
      { type: 'path', props: { d: 'M35,85 L70,40 L105,85', stroke: '#7B1FA2', strokeWidth: 4, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', opacity: 0.7 } },
      { type: 'circle', props: { cx: 70, cy: 65, r: 3, fill: '#7B1FA2', opacity: 0.5 } },
    ],
  },
  'へ': {
    bgColor: '#C8E6C9',
    shapes: [
      { type: 'path', props: { d: 'M40,65 L65,90 L105,45', stroke: '#2E7D32', strokeWidth: 5, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', opacity: 0.8 } },
    ],
  },
  'ほ': {
    bgColor: '#FFE0B2',
    shapes: [
      { type: 'line', props: { x1: 60, y1: 35, x2: 60, y2: 95, stroke: '#E65100', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 40, y1: 52, x2: 80, y2: 52, stroke: '#E65100', strokeWidth: 3.5, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 40, y1: 70, x2: 80, y2: 70, stroke: '#E65100', strokeWidth: 3.5, strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'ま': {
    bgColor: '#FFCDD2',
    shapes: [
      { type: 'circle', props: { cx: 70, cy: 50, r: 14, fill: '#E53935', opacity: 0.5 } },
      { type: 'path', props: { d: 'M56,52 Q40,70 50,85', stroke: '#E53935', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'path', props: { d: 'M84,52 Q100,70 90,85', stroke: '#E53935', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 70, y1: 64, x2: 70, y2: 95, stroke: '#E53935', strokeWidth: 3.5, strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'み': {
    bgColor: '#BBDEFB',
    shapes: [
      { type: 'path', props: { d: 'M50,60 C40,35 60,30 70,50 C80,30 100,35 90,60 C80,85 60,80 70,60', stroke: '#1565C0', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
  'む': {
    bgColor: '#D7CCC8',
    shapes: [
      { type: 'circle', props: { cx: 70, cy: 65, r: 25, fill: '#8D6E63', opacity: 0.4 } },
      { type: 'path', props: { d: 'M50,40 Q70,25 90,40', stroke: '#5D4037', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'ellipse', props: { cx: 70, cy: 70, rx: 8, ry: 5, fill: '#5D4037', opacity: 0.5 } },
    ],
  },
  'め': {
    bgColor: '#FFF9C4',
    shapes: [
      { type: 'ellipse', props: { cx: 70, cy: 68, rx: 28, ry: 18, fill: '#F9A825', opacity: 0.4 } },
      { type: 'circle', props: { cx: 70, cy: 68, r: 8, fill: '#F57F17', opacity: 0.7 } },
      { type: 'circle', props: { cx: 70, cy: 68, r: 3, fill: '#FFF', opacity: 0.9 } },
    ],
  },
  'も': {
    bgColor: '#B2DFDB',
    shapes: [
      { type: 'ellipse', props: { cx: 70, cy: 68, rx: 22, ry: 14, fill: '#00897B', opacity: 0.4 } },
      { type: 'path', props: { d: 'M50,55 L50,42 L60,48', stroke: '#00695C', strokeWidth: 3, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 70, y1: 35, x2: 70, y2: 100, stroke: '#00695C', strokeWidth: 3.5, strokeLinecap: 'round', opacity: 0.5 } },
    ],
  },
  'や': {
    bgColor: '#D7CCC8',
    shapes: [
      { type: 'path', props: { d: 'M48,58 L70,38 L92,58', stroke: '#5D4037', strokeWidth: 4, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', opacity: 0.8 } },
      { type: 'ellipse', props: { cx: 70, cy: 78, rx: 18, ry: 12, fill: '#8D6E63', opacity: 0.3 } },
    ],
  },
  'ゆ': {
    bgColor: '#BBDEFB',
    shapes: [
      { type: 'path', props: { d: 'M50,55 Q55,35 75,35 Q95,35 95,65 Q95,95 70,95 Q50,95 50,78', stroke: '#1E88E5', strokeWidth: 4, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
      { type: 'path', props: { d: 'M55,78 L40,85 L55,90', stroke: '#1E88E5', strokeWidth: 3, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', opacity: 0.7 } },
    ],
  },
  'よ': {
    bgColor: '#FFCDD2',
    shapes: [
      { type: 'line', props: { x1: 70, y1: 30, x2: 70, y2: 72, stroke: '#C62828', strokeWidth: 3, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'circle', props: { cx: 70, cy: 82, r: 16, stroke: '#C62828', strokeWidth: 4, fill: 'none', opacity: 0.8 } },
    ],
  },
  'ら': {
    bgColor: '#F8BBD0',
    shapes: [
      { type: 'ellipse', props: { cx: 55, cy: 55, rx: 8, ry: 22, fill: '#AD1457', opacity: 0.5 } },
      { type: 'ellipse', props: { cx: 88, cy: 55, rx: 8, ry: 22, fill: '#AD1457', opacity: 0.5 } },
    ],
  },
  'り': {
    bgColor: '#C8E6C9',
    shapes: [
      { type: 'line', props: { x1: 50, y1: 35, x2: 50, y2: 95, stroke: '#2E7D32', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'line', props: { x1: 80, y1: 40, x2: 80, y2: 95, stroke: '#2E7D32', strokeWidth: 4, strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'る': {
    bgColor: '#FFE0B2',
    shapes: [
      { type: 'path', props: { d: 'M75,40 Q45,40 45,65 Q45,90 75,90 Q95,90 95,70 Q95,55 80,55 Q65,55 65,70', stroke: '#E65100', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
  'れ': {
    bgColor: '#E1BEE7',
    shapes: [
      { type: 'path', props: { d: 'M85,40 Q50,40 45,65 Q40,90 65,95 Q90,90 95,70', stroke: '#6A1B9A', strokeWidth: 4, fill: 'none', strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'ろ': {
    bgColor: '#D7CCC8',
    shapes: [
      { type: 'line', props: { x1: 40, y1: 70, x2: 100, y2: 70, stroke: '#5D4037', strokeWidth: 6, strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'わ': {
    bgColor: '#BBDEFB',
    shapes: [
      { type: 'path', props: { d: 'M70,38 Q70,30 65,40 Q55,58 55,75 Q55,95 70,100 Q88,95 88,78 Q88,62 78,55 Q70,50 70,60', stroke: '#0D47A1', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.7 } },
    ],
  },
  'を': {
    bgColor: '#C8E6C9',
    shapes: [
      { type: 'path', props: { d: 'M50,50 Q45,35 60,35 Q75,35 80,50 Q85,75 70,90 Q55,95 50,80', stroke: '#2E7D32', strokeWidth: 3.5, fill: 'none', strokeLinecap: 'round', opacity: 0.7 } },
      { type: 'path', props: { d: 'M60,35 Q40,30 35,50 Q32,65 45,68', stroke: '#4CAF50', strokeWidth: 3, fill: 'none', strokeLinecap: 'round', opacity: 0.6 } },
    ],
  },
  'ん': {
    bgColor: '#B2DFDB',
    shapes: [
      { type: 'path', props: { d: 'M85,40 Q75,50 65,45 Q55,40 50,55 Q45,75 60,80 Q80,85 75,65 Q72,55 65,60', stroke: '#00695C', strokeWidth: 4, fill: 'none', strokeLinecap: 'round', opacity: 0.8 } },
    ],
  },
};
