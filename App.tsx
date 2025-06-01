import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import Navigation from './src/navigation';
import { isMockDataMode } from './src/lib/supabase';

// Display console message if using mock data
if (isMockDataMode()) {
  console.log('==========================================');
  console.log('RUNNING IN MOCK DATA MODE');
  console.log('Supabase connection is not required');
  console.log('Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY');
  console.log('to your .env file to use a real Supabase connection');
  console.log('==========================================');
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation />
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}