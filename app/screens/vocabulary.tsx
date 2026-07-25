import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { vocabularyData } from '../../data/vocabulary';
import { vocabularyData2 } from '../../data/vocabulary2';

const allVocab = [...vocabularyData, ...vocabularyData2];
import { kanaToRomaji } from '../../utils/kanaToRomaji';
import SentenceReader from '../../components/SentenceReader';

export default function VocabularyScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(params.category || null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(allVocab.map((w) => w.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    let list = allVocab;
    if (selectedCategory) list = list.filter((w) => w.category === selectedCategory);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (w) =>
          w.japanese.includes(q) ||
          w.reading.toLowerCase().includes(q) ||
          w.english.toLowerCase().includes(q) ||
          kanaToRomaji(w.reading).toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCategory, search]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search words..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        returnKeyType="search"
        autoCorrect={false}
        accessibilityLabel="Search words"
      />

      <FlatList
        horizontal
        data={['All', ...categories]}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
        renderItem={({ item }) => {
          const active = item === 'All' ? !selectedCategory : selectedCategory === item;
          return (
            <Pressable
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setSelectedCategory(item === 'All' ? null : item)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {item === 'All' ? 'All' : item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </Pressable>
          );
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        windowSize={10}
        maxToRenderPerBatch={15}
        initialNumToRender={10}
        removeClippedSubviews
        renderItem={({ item }) => {
          const romaji = kanaToRomaji(item.reading);
          const isExpanded = expandedId === item.id;
          return (
            <Pressable
              style={styles.card}
              onPress={() => setExpandedId(isExpanded ? null : item.id)}
              accessibilityLabel={`${item.japanese}: ${item.english}`}
            >
              <View style={styles.cardMain}>
                <View style={styles.cardLeft}>
                  <Text style={styles.japanese}>{item.japanese}</Text>
                  <Text style={styles.reading}>{item.reading}</Text>
                  {romaji !== item.reading && (
                    <Text style={styles.romaji}>{romaji}</Text>
                  )}
                </View>
                <View style={styles.cardRight}>
                  <Text style={styles.english}>{item.english}</Text>
                  <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={16} color="#CCC" style={styles.chevronStyle} />
                </View>
              </View>

              {isExpanded && (item.example || item.exampleEnglish) && (
                <View style={styles.exampleSection}>
                  <View style={styles.divider} />
                  <View style={styles.exampleHeader}>
                    <Ionicons name="chatbubble-ellipses" size={14} color="#E63946" />
                    <Text style={styles.exampleTitle}>Example</Text>
                  </View>
                  <SentenceReader
                    japanese={item.example || ''}
                    reading={item.exampleReading}
                    english={item.exampleEnglish}
                  />
                </View>
              )}
            </Pressable>
          );
        }}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No words found</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  searchBar: {
    backgroundColor: '#FFF',
    margin: 12,
    marginBottom: 4,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#1D1D1D',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  chipsContainer: { paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#EEE',
    marginRight: 6,
  },
  chipActive: { backgroundColor: '#E63946' },
  chipText: { fontSize: 13, color: '#666' },
  chipTextActive: { color: '#FFF', fontWeight: '600' },
  list: { padding: 12, paddingTop: 4 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3 },
      android: { elevation: 1 },
    }),
  },
  cardMain: { flexDirection: 'row' },
  cardLeft: { flex: 1 },
  japanese: { fontSize: 18, fontWeight: '700', color: '#1D1D1D' },
  reading: { fontSize: 13, color: '#999', marginTop: 2 },
  romaji: { fontSize: 12, color: '#BBB', fontStyle: 'italic', marginTop: 1 },
  cardRight: { justifyContent: 'center', alignItems: 'flex-end' },
  english: { fontSize: 14, color: '#555', textAlign: 'right' },
  exampleSection: { marginTop: 10 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginBottom: 10 },
  exampleHeader: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  exampleTitle: { fontSize: 12, fontWeight: '600', color: '#E63946' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
  chevronStyle: { marginTop: 4 },
});
