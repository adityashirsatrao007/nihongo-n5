import { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { phraseData, PhraseEntry } from '../../data/phrases';
import { phraseData2 } from '../../data/phrases2';
import { kanaToRomaji } from '../../utils/kanaToRomaji';

const allPhrases = [...phraseData, ...phraseData2];
const categories = Array.from(new Set(allPhrases.map(p => p.category))).sort();

export default function TranslateScreen() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState<string | null>(null);
  const [selected, setSelected] = useState<PhraseEntry | null>(null);
  const [mode, setMode] = useState<'browse' | 'decode'>('browse');
  const [input, setInput] = useState('');

  const filtered = useMemo(() => {
    let list = allPhrases;
    if (cat) list = list.filter(p => p.category === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.english.toLowerCase().includes(q) ||
        p.japanese.includes(q) ||
        p.reading.includes(q)
      );
    }
    return list;
  }, [cat, search]);

  const decodeResults = useMemo(() => {
    if (!input.trim()) return [];
    const q = input.toLowerCase().trim();
    return allPhrases
      .filter(p => p.english.toLowerCase().includes(q) || q.includes(p.english.toLowerCase()))
      .slice(0, 10);
  }, [input]);

  return (
    <View style={s.container}>
      <View style={s.modeRow}>
        <TouchableOpacity style={[s.modeBtn, mode === 'browse' && s.modeActive]} onPress={() => setMode('browse')} accessibilityLabel="Browse mode" accessibilityRole="tab">
          <Ionicons name="search" size={16} color={mode === 'browse' ? 'white' : '#666'} />
          <Text style={[s.modeText, mode === 'browse' && s.modeTextActive]}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.modeBtn, mode === 'decode' && s.modeActive]} onPress={() => setMode('decode')} accessibilityLabel="Decoder mode" accessibilityRole="tab">
          <Ionicons name="code-slash" size={16} color={mode === 'decode' ? 'white' : '#666'} />
          <Text style={[s.modeText, mode === 'decode' && s.modeTextActive]}>Decoder</Text>
        </TouchableOpacity>
      </View>

      {mode === 'browse' ? (
        <>
          <View style={s.searchRow}>
            <Ionicons name="search" size={18} color="#999" style={s.searchIcon} />
            <TextInput style={s.searchInput} placeholder="Search English or Japanese..." value={search} onChangeText={setSearch} placeholderTextColor="#BBB" returnKeyType="search" autoCorrect={false} accessibilityLabel="Search phrases" />
            {search ? <TouchableOpacity onPress={() => setSearch('')} accessibilityLabel="Clear search"><Ionicons name="close-circle" size={18} color="#999" /></TouchableOpacity> : null}
          </View>
          <FlatList horizontal showsHorizontalScrollIndicator={false} style={s.chipRow} contentContainerStyle={s.chipContainer}
            data={['All', ...categories]} keyExtractor={c => c}
            renderItem={({ item }) => (
              <TouchableOpacity style={[s.chip, cat === item || (item === 'All' && !cat) ? s.chipActive : null]}
                onPress={() => setCat(item === 'All' ? null : item)}>
                <Text style={[s.chipText, (cat === item || (item === 'All' && !cat)) ? s.chipTextActive : null]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <FlatList
            data={filtered}
            keyExtractor={p => p.id}
            contentContainerStyle={s.listPad}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity style={s.phraseCard} onPress={() => setSelected(item)} accessibilityLabel={`${item.english}: ${item.japanese}`}>
                <Text style={s.phraseEn}>{item.english}</Text>
                <Text style={s.phraseJp}>{item.japanese}</Text>
                <Text style={s.phraseRd}>{item.reading}</Text>
                <Text style={s.phraseRj}>{kanaToRomaji(item.reading)}</Text>
                <View style={s.categoryBadge}><Text style={s.categoryBadgeText}>{item.category}</Text></View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={s.empty}>No phrases found. Try a different search.</Text>}
          />
        </>
      ) : (
        <View style={s.decodeWrap}>
          <View style={s.decodeInputRow}>
            <TextInput style={s.decodeInput} placeholder="Type an English phrase..." value={input} onChangeText={setInput} placeholderTextColor="#BBB" multiline returnKeyType="search" autoCorrect={false} accessibilityLabel="Type an English phrase to decode" />
            <TouchableOpacity style={s.clearBtn} onPress={() => setInput('')} accessibilityLabel="Clear input"><Ionicons name="close" size={20} color="#999" /></TouchableOpacity>
          </View>
          <Text style={s.decodeHint}>The app will find matching Japanese translations and break them down word-by-word.</Text>
          {input.length > 0 && decodeResults.length === 0 && (
            <View style={s.noResultCard}>
              <Ionicons name="search" size={32} color="#CCC" />
              <Text style={s.noResultText}>No exact match found. Try browsing the phrasebook.</Text>
            </View>
          )}
          {decodeResults.map((item) => (
            <TouchableOpacity key={item.id} style={s.decodeCard} onPress={() => setSelected(item)} accessibilityLabel={`${item.english}: ${item.japanese}`}>
              <Text style={s.decodeEn}>{item.english}</Text>
              <Text style={s.decodeJp}>{item.japanese}</Text>
              <Text style={s.decodeRd}>{item.reading}</Text>
              <Text style={s.phraseRj}>{kanaToRomaji(item.reading)}</Text>
              <View style={s.breakdownWrap}>
                {item.breakdown.map((b, i) => (
                  <View key={i} style={s.wordBlock}>
                    {b.word && <Text style={s.wordJp}>{b.word}</Text>}
                    <Text style={s.wordRd}>{b.reading}</Text>
                    <Text style={s.wordEn}>{b.meaning}</Text>
                  </View>
                ))}
              </View>
              {item.grammar && <Text style={s.decodeGram}>{item.grammar}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={s.modalOverlay}>
          <ScrollView style={s.modalContent}>
            <TouchableOpacity style={s.closeBtn} onPress={() => setSelected(null)}>
              <Ionicons name="close-circle" size={32} color="#E63946" />
            </TouchableOpacity>
            {selected && (
              <>
                <Text style={s.modalEn}>{selected.english}</Text>
                <Text style={s.modalJp}>{selected.japanese}</Text>
                <Text style={s.modalRd}>{selected.reading}</Text>
                <Text style={s.modalRj}>{kanaToRomaji(selected.reading)}</Text>
                <View style={s.catBadge}><Text style={s.catBadgeText}>{selected.category}</Text></View>
                <Text style={s.modalSection}>Word-by-word breakdown</Text>
                <View style={s.breakdownFull}>
                  {selected.breakdown.map((b, i) => (
                    <View key={i} style={s.breakdownRow}>
                      <Text style={s.bdJp}>{b.word}</Text>
                      <Text style={s.bdRd}>{b.reading}</Text>
                      <Text style={s.bdEn}>{b.meaning}</Text>
                    </View>
                  ))}
                </View>
                {selected.grammar && (
                  <>
                    <Text style={s.modalSection}>Grammar Note</Text>
                    <View style={s.grammarNote}>
                      <Text style={s.grammarText}>{selected.grammar}</Text>
                    </View>
                  </>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  modeRow: { flexDirection: 'row', margin: 12, gap: 8 },
  modeBtn: { flex: 1, flexDirection: 'row', paddingVertical: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', gap: 6, backgroundColor: '#EEE' },
  modeActive: { backgroundColor: '#E63946' },
  modeText: { fontSize: 14, fontWeight: '600', color: '#666' },
  modeTextActive: { color: 'white' },

  // Browse mode
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginHorizontal: 12, marginBottom: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: '#E0E0E0' },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#333' },
  searchIcon: { marginRight: 8 },
  chipRow: { maxHeight: 44, marginBottom: 4 },
  chipContainer: { paddingHorizontal: 12, gap: 8 },
  listPad: { padding: 12, paddingBottom: 40 },
  chip: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 16, backgroundColor: '#EEE' },
  chipActive: { backgroundColor: '#457B9D' },
  chipText: { fontSize: 13, color: '#666' },
  chipTextActive: { color: 'white', fontWeight: '600' },
  phraseCard: { backgroundColor: 'white', borderRadius: 10, padding: 14, marginBottom: 8, elevation: 1 },
  phraseEn: { fontSize: 14, color: '#999', marginBottom: 2 },
  phraseJp: { fontSize: 20, fontWeight: '700', color: '#333' },
  phraseRd: { fontSize: 13, color: '#888', marginTop: 2 },
  phraseRj: { fontSize: 12, color: '#BBB', fontStyle: 'italic', marginTop: 1 },
  categoryBadge: { backgroundColor: '#FFF0F0', paddingVertical: 2, paddingHorizontal: 8, borderRadius: 4, alignSelf: 'flex-start', marginTop: 6 },
  categoryBadgeText: { fontSize: 11, color: '#E63946', fontWeight: '600' },
  empty: { textAlign: 'center', color: '#BBB', fontSize: 14, marginTop: 40 },

  // Decoder mode
  decodeWrap: { padding: 12 },
  decodeInputRow: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0', padding: 12 },
  decodeInput: { flex: 1, fontSize: 16, color: '#333', minHeight: 60, textAlignVertical: 'top' },
  clearBtn: { padding: 4 },
  decodeHint: { fontSize: 12, color: '#BBB', marginTop: 8, marginBottom: 16 },
  noResultCard: { alignItems: 'center', padding: 40, gap: 12 },
  noResultText: { color: '#AAA', fontSize: 14, textAlign: 'center' },
  decodeCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2 },
  decodeEn: { fontSize: 13, color: '#999', marginBottom: 4 },
  decodeJp: { fontSize: 20, fontWeight: '700', color: '#333' },
  decodeRd: { fontSize: 13, color: '#888', marginBottom: 12 },
  breakdownWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  wordBlock: { backgroundColor: '#F5F5F5', borderRadius: 8, padding: 8, minWidth: 70, maxWidth: '45%' },
  wordJp: { fontSize: 16, fontWeight: '600', color: '#333' },
  wordRd: { fontSize: 11, color: '#888' },
  wordEn: { fontSize: 11, color: '#E63946', fontWeight: '600' },
  decodeGram: { fontSize: 12, color: '#666', fontStyle: 'italic', backgroundColor: '#FFF8E1', padding: 8, borderRadius: 6 },

  // Modal detail
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '85%' },
  closeBtn: { alignSelf: 'flex-end', marginBottom: 8 },
  modalEn: { fontSize: 16, color: '#999', marginBottom: 4 },
  modalJp: { fontSize: 28, fontWeight: '800', color: '#333' },
  modalRd: { fontSize: 15, color: '#888', marginBottom: 8 },
  modalRj: { fontSize: 13, color: '#BBB', fontStyle: 'italic', marginBottom: 12 },
  catBadge: { backgroundColor: '#FFF0F0', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 16 },
  catBadgeText: { color: '#E63946', fontSize: 12, fontWeight: '600' },
  modalSection: { fontSize: 16, fontWeight: '700', color: '#333', marginTop: 16, marginBottom: 8 },
  breakdownFull: { gap: 8 },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8F8', borderRadius: 8, padding: 10, flexWrap: 'wrap', gap: 4 },
  bdJp: { fontSize: 18, fontWeight: '600', color: '#333', minWidth: 60 },
  bdRd: { fontSize: 13, color: '#888', minWidth: 80 },
  bdEn: { flex: 1, fontSize: 14, color: '#E63946', textAlign: 'right', fontWeight: '500', minWidth: 60 },
  grammarNote: { backgroundColor: '#FFF8E1', borderRadius: 8, padding: 12 },
  grammarText: { fontSize: 14, color: '#555', lineHeight: 20 },
});
