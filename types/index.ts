export interface VocabularyWord {
  id: string;
  japanese: string;
  reading: string;
  english: string;
  category: string;
  example?: string;
  exampleReading?: string;
  exampleEnglish?: string;
}

export interface Kanji {
  id: string;
  kanji: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  strokes: number;
  jlpt: string;
  examples?: { word: string; reading: string; meaning: string }[];
}

export interface KanaEntry {
  character: string;
  romanji: string;
  strokes?: number;
  mnemonic?: string;
  mnemonicEmoji?: string;
}
