export interface GrammarPoint {
  id: string;
  title: string;
  pattern: string;
  patternReading?: string;
  meaning: string;
  usage: string;
  examples: { japanese: string; reading: string; english: string }[];
  notes?: string;
}
