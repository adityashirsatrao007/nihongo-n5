import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { kanjiData } from '../../data/kanji';
import StrokeOrderViewer from '../../components/StrokeOrderViewer';

export default function KanjiScreen() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return kanjiData;
    const q = search.toLowerCase();
    return kanjiData.filter(
      (k) =>
        k.kanji.includes(q) ||
        k.onyomi.toLowerCase().includes(q) ||
        k.kunyomi.toLowerCase().includes(q) ||
        k.meaning.toLowerCase().includes(q)
    );
  }, [search]);

  if (selected) {
    const kanji = kanjiData.find((k) => k.kanji === selected);
    if (!kanji) return null;
    return (
      <View style={styles.container}>
        <Pressable onPress={() => setSelected(null)} style={styles.backButton} accessibilityLabel="Back to kanji list">
          <Ionicons name="arrow-back" size={22} color="#E63946" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>

        <View style={[styles.detailCard, { backgroundColor: '#FFF' }]}>
          <Text style={styles.detailKanji}>{kanji.kanji}</Text>
          <Text style={styles.detailMeaning}>{kanji.meaning}</Text>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>On'yomi</Text>
              <Text style={styles.detailValue}>{kanji.onyomi}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Kun'yomi</Text>
              <Text style={styles.detailValue}>{kanji.kunyomi || '—'}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Strokes</Text>
              <Text style={styles.detailValue}>{kanji.strokes}</Text>
            </View>
          </View>

          {kanji.examples && kanji.examples.length > 0 && (
            <View style={styles.examplesSection}>
              <Text style={styles.examplesTitle}>Example Words</Text>
              {kanji.examples.map((ex, i) => (
                <View key={i} style={styles.exampleRow}>
                  <Text style={styles.exampleWord}>{ex.word}</Text>
                  <Text style={styles.exampleReading}>{ex.reading}</Text>
                  <Text style={styles.exampleMeaning}>{ex.meaning}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.strokeSection}>
            <Text style={styles.strokeSectionTitle}>Stroke Order</Text>
            <StrokeOrderViewer character={kanji.kanji} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search kanji..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        returnKeyType="search"
        autoCorrect={false}
        accessibilityLabel="Search kanji"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <Pressable style={styles.kanjiCard} onPress={() => setSelected(item.kanji)} accessibilityLabel={`${item.kanji}: ${item.meaning}`}>
            <Text style={styles.kanjiChar}>{item.kanji}</Text>
            <Text style={styles.kanjiMeaning} numberOfLines={1}>{item.meaning}</Text>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No kanji found</Text>
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
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#1D1D1D',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
      android: { elevation: 2 },
    }),
  },
  grid: { padding: 12, paddingBottom: 40 },
  gridRow: { gap: 10, marginBottom: 10 },
  kanjiCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3 },
      android: { elevation: 1 },
    }),
  },
  kanjiChar: { fontSize: 28, fontWeight: '700', color: '#1D1D1D' },
  kanjiMeaning: { fontSize: 10, color: '#999', marginTop: 4, textAlign: 'center' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40 },
  backButton: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 6 },
  backText: { fontSize: 16, color: '#E63946', fontWeight: '600' },
  detailCard: {
    margin: 12,
    borderRadius: 14,
    padding: 24,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
      android: { elevation: 4 },
    }),
  },
  detailKanji: { fontSize: 56, fontWeight: '800', textAlign: 'center', color: '#1D1D1D' },
  detailMeaning: { fontSize: 18, textAlign: 'center', color: '#666', marginTop: 4, marginBottom: 20 },
  detailRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  detailItem: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 8, padding: 10, alignItems: 'center' },
  detailLabel: { fontSize: 10, color: '#999', marginBottom: 4 },
  detailValue: { fontSize: 14, fontWeight: '600', color: '#1D1D1D' },
  examplesSection: { borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 16 },
  examplesTitle: { fontSize: 14, fontWeight: '700', color: '#1D1D1D', marginBottom: 10 },
  exampleRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  exampleWord: { fontSize: 16, fontWeight: '600', color: '#1D1D1D', width: 80 },
  exampleReading: { fontSize: 12, color: '#999', flex: 1, fontStyle: 'italic' },
  exampleMeaning: { fontSize: 13, color: '#555', flex: 1, textAlign: 'right' },
  strokeSection: { borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 16, marginTop: 8, alignItems: 'center' },
  strokeSectionTitle: { fontSize: 14, fontWeight: '700', color: '#1D1D1D', marginBottom: 12, alignSelf: 'flex-start' },
});
