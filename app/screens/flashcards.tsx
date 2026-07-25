import { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { vocabularyData } from '../../data/vocabulary';
import { vocabularyData2 } from '../../data/vocabulary2';
import { kanjiData } from '../../data/kanji';
import { phraseData } from '../../data/phrases';
import { phraseData2 } from '../../data/phrases2';
import { grammarData } from '../../data/grammar';
import { grammarData2 } from '../../data/grammar2';

const allVocab = [...vocabularyData, ...vocabularyData2];
const allPhrases = [...phraseData, ...phraseData2];
const allGrammar = [...grammarData, ...grammarData2];
import { hiragana, katakana } from '../../data/kana';
import { VocabularyWord, Kanji, KanaEntry } from '../../types';
import { PhraseEntry } from '../../data/phrases';
import { GrammarPoint } from '../../types/grammar';
import { getStreak, markStreakDone, getWeakCards, saveWeakCards, clearWeakCards } from '../../utils/spacedRepetition';

type DeckId = 'vocab' | 'kanji' | 'kana' | 'phrases' | 'grammar';

interface FlashCard {
  id: string;
  front: string;
  frontSub?: string;
  back: string;
  backExtra?: string;
}

const DECKS: { id: DeckId; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'vocab', label: 'Vocabulary', icon: 'book' },
  { id: 'kanji', label: 'Kanji', icon: 'grid' },
  { id: 'kana', label: 'Kana', icon: 'text' },
  { id: 'phrases', label: 'Phrases', icon: 'chatbubbles' },
  { id: 'grammar', label: 'Grammar', icon: 'checkmark-circle' },
];

function buildDeck(id: DeckId): FlashCard[] {
  switch (id) {
    case 'vocab':
      return allVocab.map((w: VocabularyWord) => ({
        id: w.id, front: w.japanese, frontSub: w.reading, back: w.english,
        backExtra: w.category,
      }));
    case 'kanji':
      return kanjiData.map((k: Kanji) => ({
        id: k.id, front: k.kanji, frontSub: k.meaning, back: `On: ${k.onyomi} • Kun: ${k.kunyomi}`,
        backExtra: `JLPT ${k.jlpt} • ${k.strokes} strokes`,
      }));
    case 'kana': {
      const all = [...hiragana.gojuuon, ...hiragana.dakuon, ...hiragana.youon,
        ...katakana.gojuuon, ...katakana.dakuon, ...katakana.youon];
      return all.map((k, i) => ({
        id: `k${i}`, front: k.character, back: k.romanji,
        backExtra: (k as KanaEntry).mnemonic,
      }));
    }
    case 'phrases':
      return allPhrases.map((p: PhraseEntry) => ({
        id: p.id, front: p.japanese, frontSub: p.reading, back: p.english,
        backExtra: p.category,
      }));
    case 'grammar':
      return allGrammar.map((g: GrammarPoint) => ({
        id: g.id, front: g.pattern, frontSub: g.patternReading, back: g.meaning,
        backExtra: g.usage,
      }));
  }
}

export default function FlashcardsScreen() {
  const [deckId, setDeckId] = useState<DeckId>('vocab');
  const [cards, setCards] = useState<FlashCard[]>(() => buildDeck('vocab'));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [unknown, setUnknown] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);
  const [streak, setStreak] = useState(0);
  const [weakCards, setWeakCards] = useState<string[]>([]);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getStreak().then(s => setStreak(s.count)).catch(() => {});
    getWeakCards('vocab').then(setWeakCards).catch(() => {});
  }, []);

  function selectDeck(id: DeckId) {
    const newCards = buildDeck(id);
    setDeckId(id);
    setCards(newCards);
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setDone(false);
    flipAnim.setValue(0);
    slideAnim.setValue(0);
  }

  const flip = useCallback(() => {
    const toValue = flipped ? 0 : 1;
    Animated.spring(flipAnim, {
      toValue, friction: 8, tension: 60, useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  }, [flipped, flipAnim]);

  function nextCard(knowIt: boolean) {
    const current = cards[index];
    if (!current) return;
    if (knowIt) known.add(current.id); else unknown.add(current.id);
    if (index + 1 >= cards.length) {
      saveWeakCards(deckId, Array.from(unknown));
      markStreakDone().then(() => getStreak().then(s => setStreak(s.count)).catch(() => {})).catch(() => {});
      setDone(true);
      return;
    }
    Animated.timing(slideAnim, {
      toValue: 1, duration: 200, useNativeDriver: true,
    }).start(() => {
      setIndex(i => i + 1);
      setFlipped(false);
      flipAnim.setValue(0);
      slideAnim.setValue(0);
    });
  }

  function restart() {
    setCards(buildDeck(deckId));
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setDone(false);
    flipAnim.setValue(0);
    slideAnim.setValue(0);
  }

  function reviewWeak() {
    const weak = cards.filter(c => unknown.has(c.id));
    if (weak.length === 0) return;
    setCards(weak);
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setDone(false);
    flipAnim.setValue(0);
    slideAnim.setValue(0);
  }

  const card = cards[index];
  const total = cards.length;
  const knownCount = known.size;
  const unknownCount = unknown.size;
  const doneCount = knownCount + unknownCount;

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1], outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1], outputRange: ['180deg', '360deg'],
  });

  if (done) {
    const pct = total > 0 ? Math.round((knownCount / total) * 100) : 0;
    return (
      <View style={s.container}>
        <View style={s.deckRow}>
          {DECKS.map(d => (
            <Pressable key={d.id} style={[s.deckBtn, deckId === d.id && s.deckBtnActive]} onPress={() => selectDeck(d.id)} accessibilityLabel={`${d.label} deck`}>
              <Ionicons name={d.icon} size={14} color={deckId === d.id ? '#FFF' : '#666'} />
              <Text style={[s.deckLabel, deckId === d.id && s.deckLabelActive]}>{d.label}</Text>
            </Pressable>
          ))}
        </View>
        <View style={s.doneWrap}>
          <Ionicons name="trophy" size={56} color="#FFB300" />
          <Text style={s.doneTitle}>Session Complete!</Text>
          <Text style={s.doneScore}>{knownCount}/{total} correct ({pct}%)</Text>
          <View style={s.statRow}>
            <View style={s.statBox}>
              <Text style={s.statNumGreen}>{knownCount}</Text>
              <Text style={s.statLabel}>Known</Text>
            </View>
            <View style={s.statBox}>
              <Text style={s.statNumRed}>{unknownCount}</Text>
              <Text style={s.statLabel}>Review</Text>
            </View>
          </View>
          {streak > 0 && (
            <View style={s.streakBadge}>
              <Ionicons name="flame" size={18} color="#FF6D00" />
              <Text style={s.streakText}>{streak} day streak</Text>
            </View>
          )}
          <Pressable style={s.restartBtn} onPress={restart} accessibilityLabel="Study again">
            <Ionicons name="refresh" size={18} color="#FFF" />
            <Text style={s.restartText}>Study Again</Text>
          </Pressable>
          {unknownCount > 0 && (
            <Pressable style={s.weakBtn} onPress={reviewWeak} accessibilityLabel={`Review ${unknownCount} weak cards`}>
              <Ionicons name="alert-circle" size={18} color="#E63946" />
              <Text style={s.weakBtnText}>Review {unknownCount} Weak Cards</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <View style={s.deckRow}>
        {DECKS.map(d => (
          <Pressable key={d.id} style={[s.deckBtn, deckId === d.id && s.deckBtnActive]} onPress={() => selectDeck(d.id)} accessibilityLabel={`${d.label} deck`}>
            <Ionicons name={d.icon} size={14} color={deckId === d.id ? '#FFF' : '#666'} />
            <Text style={[s.deckLabel, deckId === d.id && s.deckLabelActive]}>{d.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={s.statsRow}>
        {streak > 0 && (
          <View style={s.streakPill}>
            <Ionicons name="flame" size={14} color="#FF6D00" />
            <Text style={s.streakPillText}>{streak}</Text>
          </View>
        )}
      </View>

      <Text style={s.progress}>{doneCount + 1} / {total}</Text>
      <View style={s.barBg}>
        <View style={[s.barFill, { width: `${((doneCount) / total) * 100}%` }]} />
      </View>

      <View style={s.cardArea}>
        <Pressable onPress={flip} style={s.cardPress} accessibilityLabel="Tap to flip card">
          <Animated.View style={[s.card, { transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }] }, flipped && s.cardHidden]}>
            <Text style={s.cardFront}>{card?.front}</Text>
            {card?.frontSub && <Text style={s.cardSub}>{card.frontSub}</Text>}
            <Text style={s.tapHint}>Tap to flip</Text>
          </Animated.View>

          <Animated.View style={[s.card, s.cardBack, { transform: [{ perspective: 1000 }, { rotateY: backInterpolate }] }, !flipped && s.cardHidden]}>
            <Text style={s.cardBackText}>{card?.back}</Text>
            {card?.backExtra && <Text style={s.cardExtra}>{card.backExtra}</Text>}
            <Text style={s.tapHint}>Tap to flip back</Text>
          </Animated.View>
        </Pressable>
      </View>

      <View style={s.btnRow}>
        <Pressable style={[s.actionBtn, s.unknownBtn]} onPress={() => nextCard(false)} accessibilityLabel="Mark as still learning">
          <Ionicons name="close" size={22} color="#FFF" />
          <Text style={s.btnLabel}>Still Learning</Text>
        </Pressable>
        <Pressable style={[s.actionBtn, s.knownBtn]} onPress={() => nextCard(true)} accessibilityLabel="Mark as known">
          <Ionicons name="checkmark" size={22} color="#FFF" />
          <Text style={s.btnLabel}>Got It</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  deckRow: { flexDirection: 'row', gap: 4, padding: 10, paddingBottom: 4, flexWrap: 'wrap', justifyContent: 'center' },
  deckBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#EEE' },
  deckBtnActive: { backgroundColor: '#E63946' },
  deckLabel: { fontSize: 12, fontWeight: '600', color: '#666' },
  deckLabelActive: { color: '#FFF' },
  progress: { textAlign: 'center', fontSize: 15, fontWeight: '700', color: '#333', marginTop: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingTop: 4 },
  streakPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FFF3E0', borderRadius: 12, paddingVertical: 3, paddingHorizontal: 10 },
  streakPillText: { fontSize: 12, fontWeight: '700', color: '#E65100' },
  barBg: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, marginHorizontal: 24, marginTop: 6, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#E63946', borderRadius: 3 },
  cardArea: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  cardPress: { width: '100%', maxWidth: 340, aspectRatio: 0.7, maxHeight: 440 },
  card: { position: 'absolute', inset: 0, borderRadius: 20, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', padding: 24, backfaceVisibility: 'hidden', elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 },
  cardBack: { backgroundColor: '#FFF8E1' },
  cardHidden: { opacity: 0 },
  cardFront: { fontSize: 42, fontWeight: '800', color: '#1D1D1D', textAlign: 'center' },
  cardSub: { fontSize: 16, color: '#999', marginTop: 8, textAlign: 'center' },
  cardBackText: { fontSize: 22, fontWeight: '700', color: '#333', textAlign: 'center' },
  cardExtra: { fontSize: 13, color: '#888', marginTop: 10, textAlign: 'center', paddingHorizontal: 8, lineHeight: 18 },
  tapHint: { position: 'absolute', bottom: 16, fontSize: 11, color: '#CCC' },
  btnRow: { flexDirection: 'row', gap: 16, paddingHorizontal: 24, paddingBottom: 36, justifyContent: 'center' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14 },
  unknownBtn: { backgroundColor: '#C62828' },
  knownBtn: { backgroundColor: '#2E7D32' },
  btnLabel: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  doneWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  doneTitle: { fontSize: 24, fontWeight: '800', color: '#333', marginTop: 12 },
  doneScore: { fontSize: 16, color: '#888', marginTop: 4 },
  statRow: { flexDirection: 'row', gap: 32, marginTop: 20 },
  statBox: { alignItems: 'center' },
  statNum: { fontSize: 36, fontWeight: '800' },
  statNumGreen: { fontSize: 36, fontWeight: '800', color: '#2E7D32' },
  statNumRed: { fontSize: 36, fontWeight: '800', color: '#C62828' },
  statLabel: { fontSize: 14, color: '#888', fontWeight: '500' },
  restartBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#457B9D', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, marginTop: 28 },
  restartText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  weakBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, marginTop: 12, borderWidth: 1, borderColor: '#E63946' },
  weakBtnText: { color: '#E63946', fontSize: 14, fontWeight: '600' },
  streakBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#FFF3E0', borderRadius: 10, paddingVertical: 6, paddingHorizontal: 14, marginTop: 12 },
  streakText: { fontSize: 13, fontWeight: '700', color: '#E65100' },
});
