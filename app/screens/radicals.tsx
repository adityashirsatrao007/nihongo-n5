import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { radicalData, RadicalEntry } from '../../data/kanjiRadicals';

type Mode = 'learn' | 'quiz';

interface QuizQuestion {
  radical: string;
  correctMeaning: string;
  options: string[];
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuizQuestions(count: number): QuizQuestion[] {
  const shuffled = shuffleArray(radicalData);
  const selected = shuffled.slice(0, count);
  return selected.map(entry => {
    const others = radicalData
      .filter(r => r.meaning !== entry.meaning)
      .map(r => r.meaning);
    const wrong = shuffleArray(others).slice(0, 3);
    const options = shuffleArray([entry.meaning, ...wrong]);
    return { radical: entry.radical, correctMeaning: entry.meaning, options };
  });
}

function ToggleBar({ mode, onModeChange, onStartQuiz }: { mode: Mode; onModeChange: (m: Mode) => void; onStartQuiz: () => void }) {
  return (
    <View style={styles.toggleRow}>
      <Pressable style={[styles.toggleBtn, mode === 'learn' && styles.toggleActive]} onPress={() => onModeChange('learn')} accessibilityLabel="Learn mode" accessibilityRole="tab">
        <Ionicons name="book" size={16} color={mode === 'learn' ? '#FFF' : '#666'} />
        <Text style={[styles.toggleText, mode === 'learn' && styles.toggleTextActive]}>Learn</Text>
      </Pressable>
      <Pressable style={[styles.toggleBtn, mode === 'quiz' && styles.toggleActive]} onPress={() => { onModeChange('quiz'); onStartQuiz(); }} accessibilityLabel="Quiz mode" accessibilityRole="tab">
        <Ionicons name="help-circle" size={16} color={mode === 'quiz' ? '#FFF' : '#666'} />
        <Text style={[styles.toggleText, mode === 'quiz' && styles.toggleTextActive]}>Quiz</Text>
      </Pressable>
    </View>
  );
}

export default function RadicalsScreen() {
  const [mode, setMode] = useState<Mode>('learn');
  const [selectedRadical, setSelectedRadical] = useState<RadicalEntry | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildQuizQuestions(15));
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [sessionDone, setSessionDone] = useState(false);
  const totalQuestions = 15;

  function startQuiz() {
    setQuestions(buildQuizQuestions(totalQuestions));
    setQIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
    setSessionDone(false);
  }

  function handleAnswer(option: string) {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(option);
    if (option === questions[qIndex].correctMeaning) {
      setScore(s => s + 1);
    }
  }

  function nextQuestion() {
    if (qIndex + 1 >= totalQuestions) {
      setSessionDone(true);
      return;
    }
    setQIndex(i => i + 1);
    setAnswered(false);
    setSelectedOption(null);
  }

  if (mode === 'learn') {
    return (
      <View style={styles.container}>
        <ToggleBar mode={mode} onModeChange={setMode} onStartQuiz={startQuiz} />
        <FlatList
          data={radicalData}
          renderItem={({ item }) => (
            <Pressable style={styles.radicalCard} onPress={() => setSelectedRadical(item)}>
              <Text style={styles.radicalChar}>{item.radical}</Text>
              <Text style={styles.radicalMeaning} numberOfLines={1}>{item.meaning}</Text>
            </Pressable>
          )}
          keyExtractor={item => item.radical}
          numColumns={3}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
        />
        <Modal visible={!!selectedRadical} transparent animationType="fade">
          <Pressable style={styles.modalOverlay} onPress={() => setSelectedRadical(null)}>
            <Pressable style={styles.modalContent} onPress={() => {}}>
              {selectedRadical && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalRadical}>{selectedRadical.radical}</Text>
                    <Text style={styles.modalMeaning}>{selectedRadical.meaning}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="pencil" size={16} color="#888" />
                    <Text style={styles.detailText}>{selectedRadical.strokeCount} strokes</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="apps" size={16} color="#888" />
                    <Text style={styles.detailText}>{selectedRadical.examples.join(' ·  ')}</Text>
                  </View>
                  {selectedRadical.mnemonic && (
                    <View style={styles.mnemonicBox}>
                      <View style={styles.detailRow}>
                        <Ionicons name="bulb" size={16} color="#FFB300" />
                        <Text style={styles.detailText}>Mnemonic</Text>
                      </View>
                      <Text style={styles.mnemonicText}>{selectedRadical.mnemonic}</Text>
                    </View>
                  )}
                  <Pressable style={styles.closeBtn} onPress={() => setSelectedRadical(null)}>
                    <Text style={styles.closeBtnText}>Close</Text>
                  </Pressable>
                </>
              )}
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    );
  }

  if (sessionDone) {
    const pct = Math.round((score / totalQuestions) * 100);
    const grade = pct >= 90 ? 'Excellent!' : pct >= 70 ? 'Good job!' : pct >= 50 ? 'Keep practicing!' : 'Study more!';
    return (
      <View style={styles.container}>
        <ToggleBar mode={mode} onModeChange={setMode} onStartQuiz={startQuiz} />
        <View style={styles.doneWrap}>
          <Ionicons name="trophy" size={64} color="#FFB300" />
          <Text style={styles.doneTitle}>{grade}</Text>
          <Text style={styles.doneScore}>{score} / {totalQuestions} ({pct}%)</Text>
          <Pressable style={styles.restartBtn} onPress={startQuiz}>
            <Ionicons name="refresh" size={18} color="#FFF" />
            <Text style={styles.restartText}>Try Again</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const question = questions[qIndex];
  const progress = qIndex / totalQuestions;

  return (
    <View style={styles.container}>
      <ToggleBar mode={mode} onModeChange={setMode} onStartQuiz={startQuiz} />
      <View style={styles.quizHeader}>
        <Text style={styles.scoreText}>
          <Ionicons name="star" size={15} color="#FFB300" /> {score}
        </Text>
        <Text style={styles.qCounter}>{qIndex + 1} / {totalQuestions}</Text>
      </View>
      <View style={styles.barBg}>
        <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
      </View>
      <View style={styles.questionArea}>
        <Text style={styles.qLabel}>What is the meaning of this radical?</Text>
        <Text style={styles.qRadical}>{question.radical}</Text>
        <View style={styles.optionsGrid}>
          {question.options.map((opt, i) => {
            let isCorrect = false;
            let isWrong = false;
            if (answered) {
              isCorrect = opt === question.correctMeaning;
              isWrong = opt === selectedOption && !isCorrect;
            }
            return (
              <Pressable
                key={i}
                style={[
                  styles.optionBtn,
                  isCorrect && styles.optionCorrect,
                  isWrong && styles.optionWrong,
                ]}
                onPress={() => handleAnswer(opt)}
                disabled={answered}
              >
                <Text style={[styles.optionText, (isCorrect || isWrong) && styles.optionTextLight]}>{opt}</Text>
                {isCorrect && <Ionicons name="checkmark-circle" size={18} color="#FFF" />}
                {isWrong && <Ionicons name="close-circle" size={18} color="#FFF" />}
              </Pressable>
            );
          })}
        </View>
      </View>
      {answered && (
        <Pressable style={styles.nextBtn} onPress={nextQuestion}>
          <Text style={styles.nextBtnText}>{qIndex + 1 >= totalQuestions ? 'See Results' : 'Next'}</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFF" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  toggleRow: { flexDirection: 'row', padding: 12, gap: 10, justifyContent: 'center' },
  toggleBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#EEE' },
  toggleActive: { backgroundColor: '#E63946' },
  toggleText: { fontSize: 14, fontWeight: '600', color: '#666' },
  toggleTextActive: { color: '#FFF' },
  gridContent: { paddingHorizontal: 10, paddingBottom: 20 },
  gridRow: { gap: 8, justifyContent: 'center', marginBottom: 8 },
  radicalCard: { width: 108, backgroundColor: '#FFF', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 6, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
  radicalChar: { fontSize: 32, fontWeight: '700', color: '#1D1D1D' },
  radicalMeaning: { fontSize: 11, color: '#888', marginTop: 6, fontWeight: '500' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.45)' },
  modalContent: { width: '82%', maxWidth: 340, backgroundColor: '#FFF', borderRadius: 20, padding: 24, elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 16 },
  modalHeader: { alignItems: 'center', marginBottom: 16 },
  modalRadical: { fontSize: 48, fontWeight: '800', color: '#1D1D1D' },
  modalMeaning: { fontSize: 20, fontWeight: '700', color: '#E63946', marginTop: 4 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  detailText: { fontSize: 15, color: '#555' },
  mnemonicBox: { backgroundColor: '#FFF8E1', borderRadius: 12, padding: 12, marginTop: 12 },
  mnemonicText: { fontSize: 14, color: '#666', marginTop: 4, lineHeight: 20, fontStyle: 'italic' },
  closeBtn: { backgroundColor: '#E63946', borderRadius: 12, paddingVertical: 10, alignItems: 'center', marginTop: 20 },
  closeBtnText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  quizHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginTop: 4 },
  scoreText: { fontSize: 16, fontWeight: '700', color: '#333' },
  qCounter: { fontSize: 14, fontWeight: '600', color: '#999' },
  barBg: { height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, marginHorizontal: 24, marginTop: 8, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#E63946', borderRadius: 3 },
  questionArea: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  qLabel: { fontSize: 14, color: '#888', fontWeight: '500', marginBottom: 12 },
  qRadical: { fontSize: 72, fontWeight: '800', color: '#1D1D1D', marginBottom: 28 },
  optionsGrid: { width: '100%', gap: 10 },
  optionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 14, borderRadius: 12, backgroundColor: '#FFF', borderWidth: 1.5, borderColor: '#E0E0E0', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
  optionCorrect: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  optionWrong: { backgroundColor: '#C62828', borderColor: '#C62828' },
  optionText: { fontSize: 16, fontWeight: '600', color: '#333' },
  optionTextLight: { color: '#FFF' },
  nextBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#457B9D', marginHorizontal: 24, marginBottom: 36, paddingVertical: 14, borderRadius: 14 },
  nextBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  doneWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  doneTitle: { fontSize: 26, fontWeight: '800', color: '#333', marginTop: 12 },
  doneScore: { fontSize: 16, color: '#888', marginTop: 6 },
  restartBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#E63946', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, marginTop: 24 },
  restartText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
