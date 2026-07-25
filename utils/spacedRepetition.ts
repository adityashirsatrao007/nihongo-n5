import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = '@nihongo_streak';
const WEAK_KEY = '@nihongo_weak_';

export async function getStreak(): Promise<{ count: number; todayDone: boolean }> {
  try {
    const raw = await AsyncStorage.getItem(STREAK_KEY);
    if (!raw) return { count: 0, todayDone: false };
    const data = JSON.parse(raw);
    const today = new Date().toDateString();
    const lastDate = data.lastDate || '';
    const diff = daysBetween(lastDate, today);
    if (lastDate === today) return { count: data.count, todayDone: true };
    if (diff === 1) return { count: data.count + 1, todayDone: false };
    return { count: 1, todayDone: false };
  } catch { return { count: 0, todayDone: false }; }
}

export async function markStreakDone(): Promise<void> {
  try {
    const { count, todayDone } = await getStreak();
    if (todayDone) return;
    const raw = await AsyncStorage.getItem(STREAK_KEY);
    const prev = raw ? JSON.parse(raw).count : 0;
    const today = new Date().toDateString();
    const data = JSON.parse(raw || '{}');
    const lastDate = data.lastDate || '';
    const diff = daysBetween(lastDate, today);
    const newCount = diff === 1 ? prev + 1 : 1;
    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify({ count: newCount, lastDate: today }));
  } catch {}
}

function daysBetween(d1: string, d2: string): number {
  const a = new Date(d1);
  const b = new Date(d2);
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export async function getWeakCards(deckId: string): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(WEAK_KEY + deckId);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export async function saveWeakCards(deckId: string, ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(WEAK_KEY + deckId, JSON.stringify(ids));
  } catch {}
}

export async function clearWeakCards(deckId: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(WEAK_KEY + deckId);
  } catch {}
}
