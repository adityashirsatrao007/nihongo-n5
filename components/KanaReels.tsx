import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import KanaVisualMnemonic from './KanaVisualMnemonic';
import StrokeOrderViewer from './StrokeOrderViewer';
import { KanaEntry } from '../types';

interface Props {
  entries: KanaEntry[];
  onBack: () => void;
}

const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get('window');
const PAGE_H = SCREEN_H;

export default function KanaReels({ entries, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const STATUS_H = insets.top;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={PAGE_H}
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / PAGE_H);
          setCurrentIndex(index);
        }}
      >
        {entries.map((entry, index) => (
          <View key={index} style={[styles.page, { height: PAGE_H }]}>
            <View style={[styles.content, { paddingTop: STATUS_H + 20 }]}>
              <View style={styles.charSection}>
                <Text style={styles.character}>{entry.character}</Text>
                <Text style={styles.romanji}>{entry.romanji}</Text>
              </View>

              <View style={styles.midSection}>
                <KanaVisualMnemonic character={entry.character} size={120} />
                {entry.mnemonic && (
                  <Text style={styles.hint}>{entry.mnemonic}</Text>
                )}
              </View>

              <View style={styles.bottomSection}>
                <Text style={styles.strokes}>{entry.strokes ?? '?'} strokes</Text>
                <View style={styles.strokeWrap}>
                  <StrokeOrderViewer character={entry.character} />
                </View>
                <View style={styles.progress}>
                  {entries.map((_, i) => (
                    <View
                      key={i}
                      style={[styles.dot, i === currentIndex && styles.dotActive]}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Pressable style={[styles.backBtn, { top: STATUS_H + 8 }]} onPress={onBack}>
        <Ionicons name="grid" size={20} color="#FFF" />
      </Pressable>

      <Text style={[styles.counter, { top: STATUS_H + 16 }]}>{currentIndex + 1} / {entries.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scroll: {
    flex: 1,
  },
  page: {
    width: SCREEN_W,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  charSection: {
    alignItems: 'center',
    gap: 4,
  },
  character: {
    fontSize: 80,
    fontWeight: '700',
    color: '#1D1D1D',
  },
  romanji: {
    fontSize: 20,
    color: '#999',
  },
  midSection: {
    alignItems: 'center',
    gap: 10,
  },
  hint: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  bottomSection: {
    alignItems: 'center',
    gap: 8,
  },
  strokes: {
    fontSize: 13,
    color: '#BBB',
    fontWeight: '500',
  },
  strokeWrap: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progress: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D0D0D0',
  },
  dotActive: {
    backgroundColor: '#E63946',
    width: 18,
    borderRadius: 3,
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    position: 'absolute',
    right: 16,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
