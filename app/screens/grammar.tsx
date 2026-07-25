import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { grammarData } from '../../data/grammar';
import { grammarData2 } from '../../data/grammar2';

const allGrammar = [...grammarData, ...grammarData2];
import { GrammarPoint } from '../../types/grammar';

export default function GrammarScreen() {
  const [selected, setSelected] = useState<GrammarPoint | null>(null);

  return (
    <View style={s.container}>
      <FlatList
        data={allGrammar}
        keyExtractor={(item) => item.id}
        contentContainerStyle={s.listPad}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.card} onPress={() => setSelected(item)} accessibilityLabel={`${item.pattern}: ${item.meaning}`}>
            <View style={s.cardHeader}>
              <Text style={s.pattern}>{item.pattern}</Text>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </View>
            {item.patternReading && <Text style={s.patternRd}>{item.patternReading}</Text>}
            <Text style={s.meaning}>{item.meaning}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={!!selected} animationType="slide" transparent>
        <View style={s.modalOverlay}>
          <ScrollView style={s.modalContent}>
            <TouchableOpacity style={s.closeBtn} onPress={() => setSelected(null)}>
              <Ionicons name="close-circle" size={32} color="#E63946" />
            </TouchableOpacity>
            {selected && (
              <>
                <Text style={s.modalTitle}>{selected.title}</Text>
                <View style={s.patternBadge}><Text style={s.patternBadgeText}>{selected.pattern}</Text></View>
                {selected.patternReading && <Text style={s.patternReadingModal}>{selected.patternReading}</Text>}
                <Text style={s.modalMeaning}>{selected.meaning}</Text>
                <Text style={s.sectionTitle}>Usage</Text>
                <Text style={s.usageText}>{selected.usage}</Text>
                <Text style={s.sectionTitle}>Examples</Text>
                {selected.examples.map((ex, i) => (
                  <View key={i} style={s.exampleCard}>
                    <Text style={s.exampleJp}>{ex.japanese}</Text>
                    <Text style={s.exampleRd}>{ex.reading}</Text>
                    <Text style={s.exampleEn}>→ {ex.english}</Text>
                  </View>
                ))}
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
  card: { backgroundColor: 'white', borderRadius: 10, padding: 14, marginBottom: 8, borderLeftWidth: 4, borderLeftColor: '#E63946', elevation: 1 },
  listPad: { padding: 12, paddingBottom: 40 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pattern: { fontSize: 14, fontFamily: 'monospace', color: '#E63946', fontWeight: '700' },
  patternRd: { fontSize: 12, color: '#999', fontStyle: 'italic', marginTop: 2 },
  meaning: { fontSize: 16, color: '#333', marginTop: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, maxHeight: '85%' },
  closeBtn: { alignSelf: 'flex-end', marginBottom: 8 },
  modalTitle: { fontSize: 24, fontWeight: '700', color: '#333', marginBottom: 8 },
  patternBadge: { backgroundColor: '#FFF0F0', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 12 },
  patternBadgeText: { color: '#E63946', fontFamily: 'monospace', fontSize: 15, fontWeight: '600' },
  patternReadingModal: { fontSize: 14, color: '#999', fontStyle: 'italic', textAlign: 'center', marginBottom: 8 },
  modalMeaning: { fontSize: 18, color: '#666', marginBottom: 16, fontStyle: 'italic' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginTop: 16, marginBottom: 8 },
  usageText: { fontSize: 15, color: '#555', lineHeight: 22 },
  exampleCard: { backgroundColor: '#F8F8F8', borderRadius: 8, padding: 12, marginBottom: 8 },
  exampleJp: { fontSize: 18, color: '#333', fontWeight: '500' },
  exampleRd: { fontSize: 14, color: '#888', marginTop: 2 },
  exampleEn: { fontSize: 14, color: '#E63946', marginTop: 2 },
});
