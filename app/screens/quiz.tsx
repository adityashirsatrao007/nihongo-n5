import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { quizData, QuizQuestion } from '../../data/quiz';
import { quizData2 } from '../../data/quiz2';
import { practiceTestData } from '../../data/practiceTest';

const allQuiz = [...quizData, ...quizData2];
const allPractice = [...allQuiz, ...practiceTestData];

const CATEGORIES: { id: string; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'all', label: 'All', icon: 'apps' },
  { id: 'vocabulary', label: 'Vocab', icon: 'book' },
  { id: 'kanji', label: 'Kanji', icon: 'grid' },
  { id: 'grammar', label: 'Grammar', icon: 'school' },
  { id: 'reading', label: 'Reading', icon: 'document-text' },
  { id: 'kana', label: 'Kana', icon: 'text' },
  { id: 'practice', label: 'Mock Exam', icon: 'document' },
];

export default function QuizScreen() {
  const [category, setCategory] = useState('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showingResult, setShowingResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  function shuffle(cat: string) {
    const pool = cat === 'practice' ? allPractice : allQuiz;
    const filtered = cat === 'all' || cat === 'practice' ? [...pool] : pool.filter(q => q.type === cat);
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setIdx(0);
    setSelected(null);
    setShowingResult(false);
    setCorrectCount(0);
    setFinished(false);
    setStarted(true);
  }

  function selectCategory(cat: string) {
    setCategory(cat);
    shuffle(cat);
  }

  function handleAnswer(i: number) {
    if (showingResult) return;
    setSelected(i);
    setShowingResult(true);
    if (i === questions[idx].correctIndex) setCorrectCount(c => c + 1);
  }

  function next() {
    if (idx + 1 < questions.length) {
      setIdx(i => i + 1);
      setSelected(null);
      setShowingResult(false);
    } else {
      setFinished(true);
    }
  }

  if (started && questions.length === 0) {
    return (
      <View style={s.container}>
        <Text style={s.pickTitle}>No questions available</Text>
      </View>
    );
  }

  if (!started) {
    return (
      <View style={s.container}>
        <Text style={s.pickTitle}>Choose a quiz topic</Text>
        <View style={s.catGrid}>
          {CATEGORIES.map(c => (
            <TouchableOpacity key={c.id} style={s.catBtn} onPress={() => selectCategory(c.id)} accessibilityLabel={`${c.label}: ${c.id === 'practice' ? allPractice.length : c.id === 'all' ? allQuiz.length : allQuiz.filter(q => q.type === c.id).length} questions`}>
              <Ionicons name={c.icon} size={28} color="#E63946" />
              <Text style={s.catLabel}>{c.label}</Text>
              <Text style={s.catCount}>{c.id === 'practice' ? allPractice.length : c.id === 'all' ? allQuiz.length : allQuiz.filter(q => q.type === c.id).length} Qs</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <View style={s.container}>
        <View style={s.resultCard}>
          <Ionicons name={pct >= 70 ? 'trophy' : 'school'} size={64} color={pct >= 70 ? '#FFD700' : '#E63946'} />
          <Text style={s.resultTitle}>{pct >= 70 ? 'Great job!' : 'Keep studying!'}</Text>
          <Text style={s.resultScore}>{correctCount} / {questions.length}</Text>
          <Text style={s.resultPct}>{pct}%</Text>
          <TouchableOpacity style={s.retryBtn} onPress={() => shuffle(category)} accessibilityLabel="Try again"><Text style={s.retryBtnText}>Try Again</Text></TouchableOpacity>
          <TouchableOpacity style={s.backBtn} onPress={() => setStarted(false)} accessibilityLabel="Pick a different topic"><Text style={s.backBtnText}>Pick a different topic</Text></TouchableOpacity>
        </View>
      </View>
    );
  }

  const q = questions[idx];
  const isCorrect = selected === q.correctIndex;
  const answered = selected !== null;

  return (
    <View style={s.container}>
      <View style={s.progressRow}>
        <TouchableOpacity onPress={() => setStarted(false)} accessibilityLabel="Back to category selection">
          <Ionicons name="chevron-back" size={22} color="#457B9D" />
        </TouchableOpacity>
        <View style={s.progressBarBg}>
          <View style={[s.progressBarFill, { width: `${((idx + 1) / questions.length) * 100}%` }]} />
        </View>
        <Text style={s.progressText}>{idx + 1}/{questions.length}</Text>
      </View>

      <View style={s.qCard}>
        <View style={s.qBadge}><Text style={s.qBadgeText}>{q.type.toUpperCase()}</Text></View>
        <Text style={s.qText}>{q.question}</Text>
        {q.questionReading && <Text style={s.qReading}>{q.questionReading}</Text>}
      </View>

      <View style={s.optionsWrap}>
        {q.options.map((opt, i) => {
          let bg = '#FFF';
          let border = '#E0E0E0';
          if (answered) {
            if (i === q.correctIndex) { bg = '#E8F5E9'; border = '#4CAF50'; }
            else if (i === selected && i !== q.correctIndex) { bg = '#FFEBEE'; border = '#E53935'; }
            else { bg = '#F8F8F8'; border = '#E0E0E0'; }
          } else if (selected === i) {
            bg = '#FFF3E0'; border = '#FF9800';
          }
          return (
            <TouchableOpacity key={i} style={[s.optBtn, { backgroundColor: bg, borderColor: border }]}
              onPress={() => handleAnswer(i)} disabled={answered} accessibilityLabel={`Answer ${['A', 'B', 'C', 'D'][i]}: ${opt}`}>
              <Text style={[s.optLetter, { color: answered && i === q.correctIndex ? '#2E7D32' : answered && i === selected && i !== q.correctIndex ? '#C62828' : '#E63946' }]}>
                {['A', 'B', 'C', 'D'][i]}
              </Text>
              <View style={s.optFlex}>
                <Text style={s.optText}>{opt.split('/')[0]}</Text>
                {(q.optionReadings?.[i] || opt.includes('/')) && (
                  <Text style={s.optReading}>{q.optionReadings?.[i] || opt.split('/')[1]}</Text>
                )}
              </View>
              {answered && i === q.correctIndex && <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />}
              {answered && i === selected && i !== q.correctIndex && <Ionicons name="close-circle" size={22} color="#E53935" />}
            </TouchableOpacity>
          );
        })}
      </View>

      {answered && (
        <View style={s.explanationCard}>
          <Text style={s.explanationIcon}>{isCorrect ? '✓' : '✗'}</Text>
          <Text style={s.explanationText}>{q.explanation}</Text>
        </View>
      )}

      {answered && (
        <TouchableOpacity style={s.nextBtn} onPress={next} accessibilityLabel={idx + 1 < questions.length ? 'Next question' : 'See results'}>
          <Text style={s.nextBtnText}>{idx + 1 < questions.length ? 'Next Question' : 'See Results'}</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', padding: 16 },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  progressBarBg: { flex: 1, height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, marginRight: 12 },
  progressBarFill: { height: 6, backgroundColor: '#E63946', borderRadius: 3 },
  progressText: { fontSize: 14, color: '#666', fontWeight: '600' },
  qCard: { backgroundColor: 'white', borderRadius: 14, padding: 20, marginBottom: 20, elevation: 2 },
  qBadge: { backgroundColor: '#FFF0F0', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 12 },
  qBadgeText: { color: '#E63946', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  qText: { fontSize: 18, color: '#333', lineHeight: 26, fontWeight: '500' },
  qReading: { fontSize: 13, color: '#999', fontStyle: 'italic', marginTop: 8, lineHeight: 18 },
  optionsWrap: { gap: 10 },
  optBtn: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, borderWidth: 1.5, gap: 12 },
  optLetter: { fontSize: 14, fontWeight: '700', width: 24 },
  optFlex: { flex: 1 },
  optText: { fontSize: 16, color: '#333' },
  optReading: { fontSize: 12, color: '#999', fontStyle: 'italic', marginTop: 2 },
  explanationCard: { backgroundColor: '#FFF8E1', borderRadius: 10, padding: 14, marginTop: 16, flexDirection: 'row', gap: 8 },
  explanationIcon: { fontSize: 18, color: '#F57F17' },
  explanationText: { flex: 1, fontSize: 14, color: '#555', lineHeight: 20 },
  nextBtn: { backgroundColor: '#E63946', borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 16 },
  nextBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  resultCard: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  resultTitle: { fontSize: 28, fontWeight: '700', color: '#333' },
  resultScore: { fontSize: 48, fontWeight: '700', color: '#E63946' },
  resultPct: { fontSize: 20, color: '#666' },
  retryBtn: { backgroundColor: '#E63946', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 12, marginTop: 16 },
  retryBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  backBtn: { paddingVertical: 10, marginTop: 8 },
  backBtnText: { color: '#457B9D', fontSize: 14, fontWeight: '600' },
  pickTitle: { fontSize: 22, fontWeight: '800', color: '#333', textAlign: 'center', marginTop: 20, marginBottom: 20 },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  catBtn: { width: '45%', backgroundColor: '#FFF', borderRadius: 16, padding: 20, alignItems: 'center', elevation: 2, borderWidth: 1, borderColor: '#F0F0F0', gap: 6 },
  catLabel: { fontSize: 16, fontWeight: '700', color: '#333' },
  catCount: { fontSize: 12, color: '#999', fontWeight: '500' },
});
