import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { hiragana, katakana } from '../../data/kana';
import { getStrokeCount } from '../../data/strokes';
import { KanaEntry } from '../../types';
import StrokeOrderViewer from '../../components/StrokeOrderViewer';
import KanaVisualMnemonic from '../../components/KanaVisualMnemonic';
import KanaReels from '../../components/KanaReels';

type Tab = 'hiragana' | 'katakana';
type SubTab = 'gojuuon' | 'dakuon' | 'youon';

interface MatchState {
  active: boolean;
  current: { char: string; correct: string; options: string[] } | null;
  score: number;
  total: number;
  done: boolean;
  questions: { char: string; correct: string }[];
}

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function KanaScreen() {
  const [tab, setTab] = useState<Tab>('hiragana');
  const [subTab, setSubTab] = useState<SubTab>('gojuuon');
  const [practiceMode, setPracticeMode] = useState(false);
  const [reelsMode, setReelsMode] = useState(false);
  const [matchMode, setMatchMode] = useState(false);
  const [detail, setDetail] = useState<{ char: string; romanji: string; strokes?: number; mnemonic?: string; mnemonicEmoji?: string } | null>(null);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [match, setMatch] = useState<MatchState>({ active: false, current: null, score: 0, total: 0, done: false, questions: [] });

  const data = tab === 'hiragana' ? hiragana : katakana;
  const currentData = data[subTab];
  const columns = subTab === 'youon' ? 3 : 5;

  const rows: typeof currentData[] = [];
  for (let i = 0; i < currentData.length; i += columns) {
    rows.push(currentData.slice(i, i + columns));
  }

  function toggleReveal(key: string) {
    setRevealed(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  function startMatch() {
    const pool = tab === 'hiragana' ? hiragana.gojuuon : katakana.gojuuon;
    const questions = shuffleArray(pool).slice(0, 10).map(e => ({ char: e.character, correct: e.romanji }));
    const first = questions[0];
    const wrong = pool.filter(e => e.romanji !== first.correct).map(e => e.romanji);
    const options = shuffleArray([first.correct, ...shuffleArray(wrong).slice(0, 3)]);
    setMatch({ active: true, current: { char: first.char, correct: first.correct, options }, score: 0, total: 0, done: false, questions });
  }

  function answerMatch(selected: string) {
    if (!match.current) return;
    const isCorrect = selected === match.current.correct;
    const nextTotal = match.total + 1;
    const nextScore = match.score + (isCorrect ? 1 : 0);
    if (nextTotal >= match.questions.length) {
      setMatch({ ...match, current: null, score: nextScore, total: nextTotal, done: true });
      return;
    }
    const nextQ = match.questions[nextTotal];
    const pool = tab === 'hiragana' ? hiragana.gojuuon : katakana.gojuuon;
    const wrong = pool.filter(e => e.romanji !== nextQ.correct).map(e => e.romanji);
    const options = shuffleArray([nextQ.correct, ...shuffleArray(wrong).slice(0, 3)]);
    setMatch({ ...match, current: { char: nextQ.char, correct: nextQ.correct, options }, score: nextScore, total: nextTotal });
  }

  const displayRows = practiceMode
    ? [...rows].sort(() => Math.random() - 0.5)
    : rows;

  return (
    <View style={s.container}>
      <View style={s.tabRow}>
        <Pressable style={[s.tab, tab === 'hiragana' && s.tabActive]} onPress={() => setTab('hiragana')} accessibilityLabel="Hiragana" accessibilityRole="tab">
          <Text style={[s.tabText, tab === 'hiragana' && s.tabTextActive]}>Hiragana</Text>
        </Pressable>
        <Pressable style={[s.tab, tab === 'katakana' && s.tabActive]} onPress={() => setTab('katakana')} accessibilityLabel="Katakana" accessibilityRole="tab">
          <Text style={[s.tabText, tab === 'katakana' && s.tabTextActive]}>Katakana</Text>
        </Pressable>
      </View>

      <View style={s.subTabRow}>
        {(['gojuuon', 'dakuon', 'youon'] as SubTab[]).map((st) => (
          <Pressable key={st} style={[s.subTab, subTab === st && s.subTabActive]} onPress={() => setSubTab(st)} accessibilityLabel={st === 'gojuuon' ? 'Basic' : st === 'dakuon' ? 'Dakuon' : 'Youon'} accessibilityRole="tab">
            <Text style={[s.subTabText, subTab === st && s.subTabTextActive]}>
              {st === 'gojuuon' ? 'Basic' : st === 'dakuon' ? 'Dakuon' : 'Youon'}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={s.toggleRow}>
        <Pressable style={s.toggleBtn} onPress={() => { setPracticeMode(p => !p); setRevealed(new Set()); }} accessibilityLabel={practiceMode ? 'Switch to study mode' : 'Switch to practice mode'}>
          <Ionicons name={practiceMode ? 'eye' : 'eye-off'} size={16} color="#E63946" />
          <Text style={s.toggleText}>{practiceMode ? 'Study' : 'Practice'}</Text>
        </Pressable>
        <Pressable style={s.toggleBtn} onPress={() => setReelsMode(r => !r)} accessibilityLabel={reelsMode ? 'Switch to grid view' : 'Switch to reels view'}>
          <Ionicons name={reelsMode ? 'grid' : 'film'} size={16} color="#457B9D" />
          <Text style={s.toggleTextAlt}>{reelsMode ? 'Grid' : 'Reels'}</Text>
        </Pressable>
        <Pressable style={s.toggleBtn} onPress={() => { setMatchMode(true); startMatch(); }} accessibilityLabel="Start match game">
          <Ionicons name="pulse" size={16} color="#2E7D32" />
          <Text style={s.toggleTextGreen}>Match</Text>
        </Pressable>
      </View>

      {matchMode && match.active && !match.done && match.current ? (
        <View style={s.matchWrap}>
          <Text style={s.matchScore}>Score: {match.score}/{match.total}</Text>
          <View style={s.matchBarBg}>
            <View style={[s.matchBarFill, { width: `${(match.total / match.questions.length) * 100}%` }]} />
          </View>
          <Text style={s.matchChar}>{match.current.char}</Text>
          <Text style={s.matchPrompt}>Choose the correct reading</Text>
          <View style={s.matchOptions}>
            {match.current.options.map((opt, i) => (
              <Pressable key={i} style={s.matchOpt} onPress={() => answerMatch(opt)} accessibilityLabel={`Option ${['A', 'B', 'C', 'D'][i]}: ${opt}`}>
                <Text style={s.matchOptLetter}>{['A', 'B', 'C', 'D'][i]}</Text>
                <Text style={s.matchOptText}>{opt}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable style={s.matchCancel} onPress={() => { setMatchMode(false); setMatch({ active: false, current: null, score: 0, total: 0, done: false, questions: [] }); }}>
            <Text style={s.matchCancelText}>Quit Game</Text>
          </Pressable>
        </View>
      ) : matchMode && match.done ? (
        <View style={s.matchWrap}>
          <Ionicons name={match.score >= 7 ? 'trophy' : 'school'} size={56} color={match.score >= 7 ? '#FFB300' : '#E63946'} />
          <Text style={s.matchDoneTitle}>{match.score >= 7 ? 'Great!' : 'Keep Practicing'}</Text>
          <Text style={s.matchDoneScore}>{match.score} / {match.total}</Text>
          <Pressable style={s.matchRetry} onPress={startMatch}>
            <Ionicons name="refresh" size={18} color="#FFF" />
            <Text style={s.matchRetryText}>Play Again</Text>
          </Pressable>
          <Pressable style={s.matchCancel} onPress={() => { setMatchMode(false); setMatch({ active: false, current: null, score: 0, total: 0, done: false, questions: [] }); }}>
            <Text style={s.matchCancelText}>Back to Grid</Text>
          </Pressable>
        </View>
      ) : reelsMode ? (
        <KanaReels entries={currentData} onBack={() => setReelsMode(false)} />
      ) : (
        <ScrollView contentContainerStyle={s.scrollContent}>
          {displayRows.map((row, ri) => (
            <View key={ri} style={s.row}>
              {row.map((entry, ci) => {
                const key = `${ri}-${ci}`;
                const show = !practiceMode || revealed.has(key);
                const strokes = getStrokeCount(entry.character);
                return (
                  <Pressable
                    key={ci}
                    style={[s.cell, { flex: 1 / columns }]}
                    onPress={() => practiceMode ? toggleReveal(key) : setDetail({ char: entry.character, romanji: entry.romanji, strokes, mnemonic: (entry as KanaEntry).mnemonic, mnemonicEmoji: (entry as KanaEntry).mnemonicEmoji })}
                    onLongPress={() => practiceMode ? null : setDetail({ char: entry.character, romanji: entry.romanji, strokes, mnemonic: (entry as KanaEntry).mnemonic, mnemonicEmoji: (entry as KanaEntry).mnemonicEmoji })}
                  >
                    <Text style={s.character}>{entry.character}</Text>
                    <Text style={[s.romanji, !show && s.hidden]}>{show ? entry.romanji : '???'}</Text>
                    {strokes && <Text style={s.strokeBadge}>{strokes}</Text>}
                  </Pressable>
                );
              })}
            </View>
          ))}

          <Text style={s.hint}>
            {practiceMode
              ? 'Tap to reveal reading • Study mode: tap for stroke info'
              : 'Tap any character to see stroke order • Long press also works'}
          </Text>
        </ScrollView>
      )}

      <Modal visible={!!detail} animationType="slide" transparent>
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <Pressable style={s.closeBtn} onPress={() => setDetail(null)}>
              <Ionicons name="close-circle" size={32} color="#E63946" />
            </Pressable>
            {detail && (
              <View style={s.detailWrap}>
                <Text style={s.detailChar}>{detail.char}</Text>
                <Text style={s.detailRd}>{detail.romanji}</Text>
                <Text style={s.detailStrokes}>Strokes: {detail.strokes ?? '—'}</Text>

                {detail.mnemonic && (
                  <View style={s.mnemonicWrap}>
                    <Text style={s.mnemonicLabel}>Memory trick</Text>
                    {detail.mnemonicEmoji && <Text style={s.mnemonicEmoji}>{detail.mnemonicEmoji}</Text>}
                    <KanaVisualMnemonic character={detail.char} size={120} />
                    <Text style={s.mnemonicText}>{detail.mnemonic}</Text>
                  </View>
                )}

                <Text style={s.detailGuideTitle}>How to write</Text>
                <View style={s.stepsWrap}>
                  {Array.from({ length: detail.strokes ?? 1 }, (_, i) => (
                    <View key={i} style={s.stepDot}>
                      <Text style={s.stepNum}>{i + 1}</Text>
                    </View>
                  ))}
                </View>
                <Text style={s.stepHint}>This character has {detail.strokes ?? '?'} strokes. Tap the button below to see the animated stroke order.</Text>

                <View style={s.viewerWrap}>
                  <StrokeOrderViewer character={detail.char} />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  tabRow: { flexDirection: 'row', backgroundColor: '#EEE', borderRadius: 10, padding: 3, margin: 12, marginBottom: 0 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: '#E63946' },
  tabText: { fontSize: 15, fontWeight: '600', color: '#666' },
  tabTextActive: { color: '#FFF' },
  subTabRow: { flexDirection: 'row', gap: 8, margin: 12, marginBottom: 8, justifyContent: 'center' },
  subTab: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 16, backgroundColor: '#EEE' },
  subTabActive: { backgroundColor: '#457B9D' },
  subTabText: { fontSize: 13, color: '#666', fontWeight: '500' },
  subTabTextActive: { color: '#FFF', fontWeight: '600' },
  toggleRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 8 },
  toggleBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 16, backgroundColor: '#F0F0F0' },
  toggleText: { fontSize: 13, color: '#E63946', fontWeight: '600' },
  toggleTextAlt: { fontSize: 13, color: '#457B9D', fontWeight: '600' },
  toggleTextGreen: { fontSize: 13, color: '#2E7D32', fontWeight: '600' },
  row: { flexDirection: 'row', marginBottom: 2 },
  cell: { backgroundColor: '#FFF', margin: 2, padding: 8, borderRadius: 6, alignItems: 'center', borderWidth: 1, borderColor: '#F0F0F0' },
  character: { fontSize: 22, fontWeight: '700', color: '#1D1D1D' },
  romanji: { fontSize: 10, color: '#999', marginTop: 2 },
  hidden: { color: 'transparent', backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden', paddingHorizontal: 4 },
  strokeBadge: { position: 'absolute', top: 2, right: 4, fontSize: 9, color: '#CCC', fontWeight: '600' },
  hint: { textAlign: 'center', color: '#BBB', fontSize: 12, marginTop: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 },
  closeBtn: { alignSelf: 'flex-end', marginBottom: 4 },
  detailWrap: { alignItems: 'center' },
  detailChar: { fontSize: 56, fontWeight: '800', color: '#333', lineHeight: 64 },
  detailRd: { fontSize: 18, color: '#888', marginTop: 4 },
  detailStrokes: { fontSize: 16, color: '#E63946', fontWeight: '600', marginTop: 8 },
  detailGuideTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginTop: 20, marginBottom: 12 },
  stepsWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 12 },
  stepDot: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E63946', justifyContent: 'center', alignItems: 'center' },
  stepNum: { color: 'white', fontWeight: '700', fontSize: 14 },
  stepHint: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 16, lineHeight: 19 },
  mnemonicWrap: { backgroundColor: '#FFF3E0', borderRadius: 12, padding: 14, marginTop: 16, alignItems: 'center', width: '100%' },
  mnemonicLabel: { fontSize: 13, fontWeight: '700', color: '#E65100', marginBottom: 6 },
  mnemonicEmoji: { fontSize: 32, marginBottom: 6 },
  mnemonicText: { fontSize: 14, color: '#BF360C', textAlign: 'center', lineHeight: 20 },
  viewerWrap: { width: '100%', marginTop: 12 },
  matchWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#FAFAFA' },
  matchScore: { fontSize: 14, fontWeight: '700', color: '#888', marginBottom: 6 },
  matchBarBg: { height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, width: '60%', marginBottom: 24, overflow: 'hidden' },
  matchBarFill: { height: '100%', backgroundColor: '#2E7D32', borderRadius: 2 },
  matchChar: { fontSize: 80, fontWeight: '800', color: '#1D1D1D', marginBottom: 8 },
  matchPrompt: { fontSize: 14, color: '#999', marginBottom: 28 },
  matchOptions: { width: '100%', maxWidth: 320, gap: 12 },
  matchOpt: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: '#FFF', borderRadius: 14, padding: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4 },
  matchOptLetter: { fontSize: 16, fontWeight: '800', color: '#E63946', width: 28, height: 28, borderRadius: 14, backgroundColor: '#FEE', textAlign: 'center', lineHeight: 28, overflow: 'hidden' },
  matchOptText: { fontSize: 18, fontWeight: '600', color: '#333' },
  matchCancel: { marginTop: 24, padding: 8 },
  matchCancelText: { fontSize: 14, color: '#999', fontWeight: '500' },
  matchDoneTitle: { fontSize: 22, fontWeight: '800', color: '#333', marginTop: 12 },
  matchDoneScore: { fontSize: 18, color: '#888', marginTop: 4, fontWeight: '700' },
  matchRetry: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#457B9D', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, marginTop: 20 },
  matchRetryText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
