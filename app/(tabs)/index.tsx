import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { vocabularyData } from '../../data/vocabulary';
import { vocabularyData2 } from '../../data/vocabulary2';
import { kanjiData } from '../../data/kanji';
import { grammarData } from '../../data/grammar';
import { grammarData2 } from '../../data/grammar2';
import { quizData } from '../../data/quiz';
import { quizData2 } from '../../data/quiz2';
import { conversationData, Conversation } from '../../data/conversations';
import { conversationData2 } from '../../data/conversations2';

const allVocabulary = [...vocabularyData, ...vocabularyData2];
const allGrammar = [...grammarData, ...grammarData2];
const allQuiz = [...quizData, ...quizData2];
const allConversations = [...conversationData, ...conversationData2];

type Step = { icon: string; label: string; desc: string; route: string };
const steps: Step[] = [
  { icon: 'text', label: 'Hiragana & Katakana', desc: 'Learn the Japanese alphabets', route: '/kana' },
  { icon: 'book', label: 'Study', desc: 'Vocabulary, Kanji, Grammar & Radicals', route: '/study' },
  { icon: 'layers', label: 'Practice', desc: 'Flashcards & Quizzes', route: '/practice' },
  { icon: 'school', label: 'Grammar', desc: 'Sentence structure & particles', route: '/study' },
  { icon: 'language', label: 'Translate & Phrases', desc: 'Browse & decode Japanese phrases', route: '/translate' },
];

const stats = [
  { label: 'Words', count: allVocabulary.length, icon: 'book', color: '#4CAF50' },
  { label: 'Kanji', count: kanjiData.length, icon: 'square', color: '#FF9800' },
  { label: 'Grammar', count: allGrammar.length, icon: 'school', color: '#E91E63' },
  { label: 'Quiz Qs', count: allQuiz.length, icon: 'pencil', color: '#2196F3' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);

  return (
    <ScrollView style={s.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={s.hero}>
        <Text style={s.heroTitle}>日本語 N5</Text>
        <Text style={s.heroSub}>Your Complete JLPT N5 Learning Path</Text>
      </View>

      <View style={s.statsRow}>
        {stats.map((st, i) => (
          <View key={i} style={[s.statCard, { borderTopColor: st.color }]}>
            <Ionicons name={st.icon as any} size={22} color={st.color} />
            <Text style={s.statCount}>{st.count}</Text>
            <Text style={s.statLabel}>{st.label}</Text>
          </View>
        ))}
      </View>

      <Text style={s.sectionTitle}>Learning Path</Text>
      <Text style={s.sectionSub}>Start from step 1 and work your way through</Text>

      <View style={s.pathWrap}>
        {steps.map((step, i) => (
          <TouchableOpacity key={i} style={s.pathCard} onPress={() => router.push(step.route as any)} accessibilityLabel={`Step ${i + 1}: ${step.label}`}>
            <View style={s.stepNum}><Text style={s.stepNumText}>{i + 1}</Text></View>
            <View style={s.stepContent}>
              <Text style={s.stepLabel}>{step.label}</Text>
              <Text style={s.stepDesc}>{step.desc}</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color="#E63946" />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={s.sectionTitle}>JLPT N5 Exam Content</Text>
      <Text style={s.sectionSub}>Everything is built into the app — no external links needed</Text>

      <View style={s.resCat}>
        <View style={s.resCatHeader}>
          <Ionicons name="document-text" size={18} color="#E63946" />
          <Text style={s.resCatTitle}>What's included</Text>
        </View>
        {[
          { icon: 'book', text: `${allVocabulary.length} N5 vocabulary words with readings and examples`, color: '#4CAF50' },
          { icon: 'square', text: `${kanjiData.length} N5 kanji with on'yomi, kun'yomi, stroke order viewer`, color: '#FF9800' },
          { icon: 'school', text: `${allGrammar.length} grammar points (all particles, tenses, patterns)`, color: '#E91E63' },
          { icon: 'pencil', text: `${allQuiz.length} exam-style quiz questions + full mock exam`, color: '#2196F3' },
          { icon: 'text', text: 'Hiragana & Katakana charts with stroke order for every character', color: '#9C27B0' },
          { icon: 'language', text: 'Phrase decoder with word-by-word breakdown and 10 sample conversations', color: '#009688' },
        ].map((item, i) => (
          <View key={i} style={s.resCard}>
            <Ionicons name={item.icon as any} size={18} color={item.color} />
            <Text style={s.resCardText}>{item.text}</Text>
          </View>
        ))}
      </View>

      <View style={s.resCat}>
        <View style={s.resCatHeader}>
          <Ionicons name="star" size={18} color="#E63946" />
          <Text style={s.resCatTitle}>How to use for JLPT N5</Text>
        </View>
        {[
          'Step 1: Master hiragana & katakana from the Kana tab',
          'Step 2: Study vocabulary, kanji, grammar & radicals in the Study tab',
          'Step 3: Test yourself with flashcards and quizzes in the Practice tab',
          'Step 4: Use Translate to browse phrases or decode sentences word-by-word',
          'Step 5: Take the full Mock Exam in the Practice tab for a JLPT simulation',
        ].map((text, i) => (
          <View key={i} style={s.resCard}>
            <View style={[s.stepBadge, { backgroundColor: '#E63946' }]}><Text style={s.stepBadgeText}>{i + 1}</Text></View>
            <Text style={s.resCardText}>{text}</Text>
          </View>
        ))}
      </View>
      <Text style={s.sectionTitle}>Sample Conversations</Text>
      <Text style={s.sectionSub}>Read and practice real-life Japanese dialogues</Text>
      <View style={s.convList}>
        {allConversations.map((conv) => (
          <TouchableOpacity key={conv.id} style={s.convCard} onPress={() => setSelectedConv(conv)} accessibilityLabel={`Conversation: ${conv.title}`}>
            <Ionicons name="chatbubbles" size={20} color="#E63946" />
            <View style={s.flex1}>
              <Text style={s.convTitle}>{conv.title}</Text>
              <Text style={s.convCount}>{conv.paragraphs.length} paragraphs</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#CCC" />
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={!!selectedConv} animationType="slide" transparent>
        <View style={s.modalOverlay}>
          <ScrollView style={s.modalContent}>
            <TouchableOpacity style={s.closeBtn} onPress={() => setSelectedConv(null)}>
              <Ionicons name="close-circle" size={32} color="#E63946" />
            </TouchableOpacity>
            {selectedConv && (
              <>
                <Text style={s.convModalTitle}>{selectedConv.title}</Text>
                {selectedConv.paragraphs.map((p, i) => (
                  <View key={i} style={s.pBlock}>
                    <Text style={s.pNum}>{i + 1}</Text>
                    <View style={s.flex1}>
                      <Text style={s.pJp}>{p.japanese}</Text>
                      <Text style={s.pRd}>{p.reading}</Text>
                      <Text style={s.pRj}>{p.romaji}</Text>
                      <Text style={s.pEn}>{p.english}</Text>
                    </View>
                  </View>
                ))}
                <Text style={s.vocabTitle}>Key Vocabulary</Text>
                <View style={s.vocabGrid}>
                  {selectedConv.vocabulary.map((v, i) => (
                    <View key={i} style={s.vocabCard}>
                      <Text style={s.vocabWord}>{v.word}</Text>
                      <Text style={s.vocabRd}>{v.reading}</Text>
                      <Text style={s.vocabRj}>{v.romaji}</Text>
                      <Text style={s.vocabEn}>{v.english}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  hero: { backgroundColor: '#E63946', padding: 28, paddingTop: 20, paddingBottom: 24 },
  heroTitle: { fontSize: 32, fontWeight: '800', color: 'white' },
  heroSub: { fontSize: 15, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 8, padding: 12, marginTop: -20 },
  statCard: { flex: 1, backgroundColor: 'white', borderRadius: 12, padding: 12, alignItems: 'center', borderTopWidth: 3, elevation: 2 },
  statCount: { fontSize: 22, fontWeight: '800', color: '#333', marginTop: 4 },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', paddingHorizontal: 16, marginTop: 16 },
  flex1: { flex: 1 },
  sectionSub: { fontSize: 13, color: '#999', paddingHorizontal: 16, marginBottom: 10 },
  pathWrap: { paddingHorizontal: 12, gap: 8 },
  pathCard: { backgroundColor: 'white', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', elevation: 1 },
  stepNum: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E63946', justifyContent: 'center', alignItems: 'center' },
  stepNumText: { color: 'white', fontWeight: '700', fontSize: 14 },
  stepContent: { flex: 1, marginLeft: 14 },
  stepLabel: { fontSize: 16, fontWeight: '600', color: '#333' },
  stepDesc: { fontSize: 13, color: '#888', marginTop: 2 },
  resCat: { paddingHorizontal: 12, marginBottom: 12 },
  resCatHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  resCatTitle: { fontSize: 14, fontWeight: '700', color: '#333' },
  resCard: { backgroundColor: 'white', borderRadius: 10, padding: 12, marginBottom: 6, flexDirection: 'row', alignItems: 'center', gap: 10, elevation: 1 },
  resCardText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 18 },
  stepBadge: { width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center' },
  stepBadgeText: { color: 'white', fontSize: 11, fontWeight: '700' },


  convList: { paddingHorizontal: 12, gap: 8, marginBottom: 16 },
  convCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, padding: 14, gap: 12, elevation: 1 },
  convTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  convCount: { fontSize: 12, color: '#999', marginTop: 2 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '85%' },
  closeBtn: { alignSelf: 'flex-end', marginBottom: 4 },
  convModalTitle: { fontSize: 24, fontWeight: '800', color: '#333', marginBottom: 16 },
  pBlock: { flexDirection: 'row', gap: 10, marginBottom: 14, backgroundColor: '#FAFAFA', borderRadius: 10, padding: 12 },
  pNum: { fontSize: 14, fontWeight: '800', color: '#E63946', width: 24 },
  pJp: { fontSize: 16, fontWeight: '700', color: '#1D1D1D', marginBottom: 2 },
  pRd: { fontSize: 12, color: '#888', marginBottom: 1 },
  pRj: { fontSize: 11, color: '#BBB', fontStyle: 'italic', marginBottom: 4 },
  pEn: { fontSize: 13, color: '#555' },
  vocabTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginTop: 8, marginBottom: 8 },
  vocabGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  vocabCard: { backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10, width: '47%' },
  vocabWord: { fontSize: 16, fontWeight: '700', color: '#1D1D1D' },
  vocabRd: { fontSize: 11, color: '#888', marginTop: 1 },
  vocabRj: { fontSize: 10, color: '#BBB', fontStyle: 'italic' },
  vocabEn: { fontSize: 11, color: '#E63946', fontWeight: '600', marginTop: 2 },
});
