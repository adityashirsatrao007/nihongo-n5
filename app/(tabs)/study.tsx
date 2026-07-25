import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VocabularyScreen from '../screens/vocabulary';
import KanjiScreen from '../screens/kanji';
import GrammarScreen from '../screens/grammar';
import RadicalsScreen from '../screens/radicals';

const SUB_TABS = [
  { key: 'vocab', label: 'Vocabulary', icon: 'book' as const },
  { key: 'kanji', label: 'Kanji', icon: 'square' as const },
  { key: 'grammar', label: 'Grammar', icon: 'school' as const },
  { key: 'radicals', label: 'Radicals', icon: 'grid' as const },
];

export default function StudyScreen() {
  const [subTab, setSubTab] = useState('vocab');

  const renderContent = () => {
    switch (subTab) {
      case 'vocab': return <VocabularyScreen />;
      case 'kanji': return <KanjiScreen />;
      case 'grammar': return <GrammarScreen />;
      case 'radicals': return <RadicalsScreen />;
      default: return <VocabularyScreen />;
    }
  };

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
      <View style={s.flex1}>{renderContent()}</View>
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
