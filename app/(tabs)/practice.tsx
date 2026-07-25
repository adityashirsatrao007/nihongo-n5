import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FlashcardsScreen from '../screens/flashcards';
import QuizScreen from '../screens/quiz';

const SUB_TABS = [
  { key: 'cards', label: 'Flashcards', icon: 'layers' as const },
  { key: 'quiz', label: 'Quiz', icon: 'pencil' as const },
];

export default function PracticeScreen() {
  const [subTab, setSubTab] = useState('cards');

  return (
    <View style={s.screenContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.subTabRow} contentContainerStyle={s.subTabContent}>
        {SUB_TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[s.subTab, subTab === t.key && s.subTabActive]}
            onPress={() => setSubTab(t.key)}
            accessibilityLabel={t.label}
            accessibilityRole="tab"
          >
            <Ionicons name={t.icon} size={14} color={subTab === t.key ? '#FFF' : '#666'} />
            <Text style={[s.subTabText, subTab === t.key && s.subTabTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={s.flex1}>
        {subTab === 'cards' ? <FlashcardsScreen /> : <QuizScreen />}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: '#FAFAFA' },
  flex1: { flex: 1 },
  subTabRow: { backgroundColor: '#FAFAFA', borderBottomWidth: 1, borderBottomColor: '#E0E0E0', maxHeight: 48 },
  subTabContent: { paddingHorizontal: 8, paddingVertical: 8, gap: 6 },
  subTab: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#EEE' },
  subTabActive: { backgroundColor: '#E63946' },
  subTabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  subTabTextActive: { color: '#FFF' },
});
