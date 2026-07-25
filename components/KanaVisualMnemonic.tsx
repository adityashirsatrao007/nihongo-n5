import { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { hiraganaImages, katakanaImages } from '../data/kanaImageMap';

interface Props {
  character: string;
  size?: number;
}

export default function KanaVisualMnemonic({ character, size = 120 }: Props) {
  const [failed, setFailed] = useState(false);
  const imageSource = hiraganaImages[character] || katakanaImages[character];
  if (!imageSource) return null;
  if (failed) return <Text style={[styles.fallback, { width: size, height: size, fontSize: size * 0.5 }]}>{character}</Text>;

  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image source={imageSource} style={{ width: size * 0.7, height: size * 0.7 }} resizeMode="contain" onError={() => setFailed(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  fallback: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#999',
    fontWeight: '700',
  },
});
