import { View, Text, StyleSheet } from 'react-native';
import { kanaToRomaji } from '../utils/kanaToRomaji';

interface Props {
  japanese: string;
  reading?: string;
  english?: string;
}

export default function SentenceReader({ japanese, reading, english }: Props) {
  const romaji = reading ? kanaToRomaji(reading) : kanaToRomaji(japanese);

  return (
    <View style={s.wrap}>
      <Text style={s.japanese}>{japanese}</Text>
      {reading && <Text style={s.reading}>{reading}</Text>}
      <Text style={s.romaji}>{romaji}</Text>
      {english && (
        <Text style={s.english}>{english}</Text>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    gap: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  japanese: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1D1D1D',
    lineHeight: 24,
  },
  reading: {
    fontSize: 14,
    color: '#999',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  romaji: {
    fontSize: 13,
    color: '#BBB',
    fontStyle: 'italic',
    lineHeight: 18,
    letterSpacing: 0.3,
  },
  english: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 6,
  },
});
