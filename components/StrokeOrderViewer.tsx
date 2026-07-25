import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

function charToHex(c: string): string {
  return c.codePointAt(0)!.toString(16).padStart(5, '0');
}

export default function StrokeOrderViewer({ character }: { character: string }) {
  const [paths, setPaths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const abort = new AbortController();
    fetchStrokeData(abort.signal);
    return () => abort.abort();
  }, [character]);

  async function fetchStrokeData(signal: AbortSignal) {
    setLoading(true);
    setError(false);
    setStep(0);
    try {
      const hex = charToHex(character);
      const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`;
      const res = await fetch(url, { signal });
      const text = await res.text();

      const extracted: string[] = [];
      const regex = /<path[^>]*d="([^"]*)"[^>]*\/>/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        extracted.push(match[1]);
      }
      if (extracted.length === 0) {
        if (!signal.aborted) setError(true);
      } else {
        if (!signal.aborted) setPaths(extracted);
      }
    } catch {
      if (!signal.aborted) setError(true);
    }
    if (!signal.aborted) setLoading(false);
  }

  const total = paths.length;

  if (loading) {
    return <View style={s.center}><ActivityIndicator size="large" color="#E63946" /><Text style={s.loadText}>Loading stroke data...</Text></View>;
  }

  if (error || total === 0) {
    return (
      <View style={s.center}>
        <Ionicons name="alert-circle" size={40} color="#999" />
        <Text style={s.errorText}>Stroke data not available for "{character}"</Text>
        <Text style={s.hintText}>Stroke count: {character.length > 0 ? '—' : ''}</Text>
      </View>
    );
  }

  return (
    <View style={s.wrapper}>
      <View style={s.canvasWrap}>
        <Svg width="180" height="180" viewBox="0 0 109 109">
          {paths.map((d, i) => {
            let opacity = 0.15;
            let color = '#CCC';
            if (i < step) { opacity = 0.4; color = '#999'; }
            if (i === step) { opacity = 1; color = '#1D1D1D'; }
            return (
              <G key={i} opacity={opacity}>
                <Path
                  d={d}
                  fill="none"
                  stroke={color}
                  strokeWidth={i === step ? 3.5 : 2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </G>
            );
          })}
          {step < total && (
            <Path
              d={paths[step]}
              fill="none"
              stroke="#E63946"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="4,4"
            />
          )}
        </Svg>
      </View>

      <View style={s.stepInfo}>
        <Text style={s.stepText}>Stroke {step + 1} of {total}</Text>
      </View>

      <View style={s.controls}>
        <TouchableOpacity
          style={[s.ctrlBtn, step <= 0 && s.ctrlBtnDisabled]}
          onPress={() => setStep(s => Math.max(0, s - 1))}
          disabled={step <= 0}
        >
          <Ionicons name="play-back" size={20} color={step <= 0 ? '#CCC' : 'white'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.ctrlBtn, step <= 0 && s.ctrlBtnDisabled]}
          onPress={() => setStep(0)}
          disabled={step <= 0}
        >
          <Text style={[s.ctrlLabel, step <= 0 && s.ctrlLabelDisabled]}>Start</Text>
        </TouchableOpacity>

        <View style={s.stepDots}>
          {Array.from({ length: Math.min(total, 8) }, (_, i) => {
            const idx = Math.floor(i * total / 8);
            return <View key={i} style={[s.dot, idx <= step && s.dotActive]} />;
          })}
        </View>

        <TouchableOpacity
          style={[s.ctrlBtn, step >= total - 1 && s.ctrlBtnDisabled]}
          onPress={() => setStep(total - 1)}
          disabled={step >= total - 1}
        >
          <Text style={[s.ctrlLabel, step >= total - 1 && s.ctrlLabelDisabled]}>End</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.ctrlBtn, step >= total - 1 && s.ctrlBtnDisabled]}
          onPress={() => setStep(s => Math.min(total - 1, s + 1))}
          disabled={step >= total - 1}
        >
          <Ionicons name="play-forward" size={20} color={step >= total - 1 ? '#CCC' : 'white'} />
        </TouchableOpacity>
      </View>

      <View style={s.legend}>
        <View style={s.legendRow}>
          <View style={[s.legendDot, { backgroundColor: '#1D1D1D' }]} />
          <Text style={s.legendText}>Current stroke</Text>
          <View style={[s.legendDot, { backgroundColor: '#999', opacity: 0.5 }]} />
          <Text style={s.legendText}>Completed</Text>
          <View style={[s.legendDot, { backgroundColor: '#EEE' }]} />
          <Text style={s.legendText}>Not yet</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: { alignItems: 'center', width: '100%' },
  center: { alignItems: 'center', justifyContent: 'center', padding: 30, gap: 10 },
  loadText: { color: '#999', fontSize: 14 },
  errorText: { color: '#999', fontSize: 14, textAlign: 'center' },
  hintText: { color: '#BBB', fontSize: 12, textAlign: 'center' },
  canvasWrap: { backgroundColor: '#FAFAFA', borderRadius: 16, padding: 10, borderWidth: 1, borderColor: '#E0E0E0' },
  stepInfo: { marginTop: 12 },
  stepText: { fontSize: 16, fontWeight: '700', color: '#E63946' },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 14 },
  ctrlBtn: { backgroundColor: '#457B9D', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' },
  ctrlBtnDisabled: { backgroundColor: '#E0E0E0' },
  ctrlLabel: { color: 'white', fontSize: 13, fontWeight: '700' },
  ctrlLabelDisabled: { color: '#999' },
  stepDots: { flexDirection: 'row', gap: 4, flex: 1, justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E0E0E0' },
  dotActive: { backgroundColor: '#E63946' },
  legend: { marginTop: 12 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendText: { fontSize: 10, color: '#BBB', marginRight: 8 },
});
