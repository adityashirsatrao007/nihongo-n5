import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#E63946',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: { backgroundColor: '#FAFAFA', borderTopColor: '#E0E0E0', paddingBottom: 6, height: 58 },
      tabBarItemStyle: { paddingVertical: 4 },
      headerStyle: { backgroundColor: '#FAFAFA' },
      headerTitleStyle: { fontWeight: '700', fontSize: 17 },
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Learn',
        tabBarAccessibilityLabel: 'Learn tab',
        tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={22} color={color} />,
      }} />
      <Tabs.Screen name="kana" options={{
        title: 'Kana',
        tabBarAccessibilityLabel: 'Kana tab',
        tabBarIcon: ({ color, size }) => <Ionicons name="text" size={22} color={color} />,
      }} />
      <Tabs.Screen name="study" options={{
        title: 'Study',
        tabBarAccessibilityLabel: 'Study tab',
        tabBarIcon: ({ color, size }) => <Ionicons name="book" size={22} color={color} />,
      }} />
      <Tabs.Screen name="practice" options={{
        title: 'Practice',
        tabBarAccessibilityLabel: 'Practice tab',
        tabBarIcon: ({ color, size }) => <Ionicons name="layers" size={22} color={color} />,
      }} />
      <Tabs.Screen name="translate" options={{
        title: 'Translate',
        tabBarAccessibilityLabel: 'Translate tab',
        tabBarIcon: ({ color, size }) => <Ionicons name="language" size={22} color={color} />,
      }} />
    </Tabs>
  );
}
