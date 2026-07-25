import { hiragana, katakana } from '../data/kana';

const hiraganaMap = new Map<string, string>();
const katakanaMap = new Map<string, string>();

function buildMaps() {
  if (hiraganaMap.size > 0) return;

  const mapKana = (entries: { character: string; romanji: string }[], map: Map<string, string>) => {
    for (const e of entries) {
      map.set(e.character, e.romanji);
    }
  };

  for (const key of ['gojuuon', 'dakuon'] as const) {
    mapKana(hiragana[key], hiraganaMap);
    mapKana(katakana[key], katakanaMap);
  }

  for (const key of ['youon'] as const) {
    mapKana(hiragana[key], hiraganaMap);
    mapKana(katakana[key], katakanaMap);
  }
}

const specialKana: Record<string, string> = {
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja',  'じゅ': 'ju',  'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
  'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
  'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
  'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
  'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
  'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
  'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
  'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
  'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
  'ジャ': 'ja',  'ジュ': 'ju',  'ジョ': 'jo',
  'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
  'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',
};

function isHiraganaChar(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return code >= 0x3041 && code <= 0x309F;
}

function isKatakanaChar(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return code >= 0x30A0 && code <= 0x30FF;
}

function getKanaMap(ch: string): Map<string, string> | null {
  if (isHiraganaChar(ch)) return hiraganaMap;
  if (isKatakanaChar(ch)) return katakanaMap;
  return null;
}

const SOKUON_HIRA = 'っ';
const SOKUON_KATA = 'ッ';
const LONG_VOWEL = 'ー';

const voicelessConsonants = new Set(['k', 's', 't', 'c', 'p', 'f']);

export function kanaToRomaji(text: string): string {
  buildMaps();

  let result = '';
  let i = 0;

  while (i < text.length) {
    if (text[i] === SOKUON_HIRA || text[i] === SOKUON_KATA) {
      const next = i + 1;
      if (next < text.length) {
        const nextRomaji = getKanaMap(text[next])?.get(text[next]);
        if (nextRomaji && voicelessConsonants.has(nextRomaji[0])) {
          result += nextRomaji[0];
        } else {
          result += 't';
        }
      } else {
        result += 't';
      }
      i++;
      continue;
    }

    if (text[i] === LONG_VOWEL) {
      if (result.length > 0) {
        const last = result[result.length - 1];
        if ('aeiou'.includes(last)) {
          result += last;
        } else {
          result += 'ō';
        }
      } else {
        result += 'ō';
      }
      i++;
      continue;
    }

    if (i + 1 < text.length) {
      const twoChars = text.substring(i, i + 2);
      if (specialKana[twoChars]) {
        result += specialKana[twoChars];
        i += 2;
        continue;
      }

      const map = getKanaMap(twoChars[0]);
      if (map) {
        if (twoChars[1] === 'ゃ' || twoChars[1] === 'ゅ' || twoChars[1] === 'ょ' ||
            twoChars[1] === 'ャ' || twoChars[1] === 'ュ' || twoChars[1] === 'ョ') {
          const base = map.get(twoChars[0]);
          if (base) {
            const small = specialKana[twoChars];
            if (small) {
              result += small;
              i += 2;
              continue;
            }
          }
        }
      }
    }

    const map = getKanaMap(text[i]);
    if (map) {
      const romaji = map.get(text[i]);
      if (romaji) {
        result += romaji;
      } else {
        result += text[i];
      }
    } else {
      result += text[i];
    }
    i++;
  }

  return result;
}

export function toRomajiArray(text: string, reading: string): { text: string; reading: string }[] {
  buildMaps();
  const result: { text: string; reading: string }[] = [];
  let readIdx = 0;
  let word = '';
  let wordReading = '';

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const isKana = isHiraganaChar(ch) || isKatakanaChar(ch);
    const isKanji = !isKana && !/[ 　、。！？「」・,.!?()\s]/.test(ch);

    if (isKanji || isKana) {
      word += ch;
      if (isKana && readIdx < reading.length) {
        wordReading += reading[readIdx];
        readIdx++;
      }
    } else {
      if (word) {
        result.push({ text: word, reading: toRomajiArrayReading(word, reading.substring(0, reading.length)) || '' });
        word = '';
        wordReading = '';
      }
      result.push({ text: ch, reading: '' });
    }
  }
  if (word) {
    result.push({ text: word, reading: '' });
  }
  return result;
}

function toRomajiArrayReading(text: string, reading: string): string {
  if (!reading) {
    let converted = '';
    for (let i = 0; i < text.length; i++) {
      if (isHiraganaChar(text[i]) || isKatakanaChar(text[i])) {
        const map = getKanaMap(text[i]);
        if (map) converted += map.get(text[i]) || text[i];
        else converted += text[i];
      } else {
        converted += text[i];
      }
    }
    return converted;
  }
  return kanaToRomaji(reading);
}
