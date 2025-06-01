import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import Navigation from './src/navigation';
import { isMockDataMode } from './src/lib/supabase';
import { useEffect, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Keep the splash screen visible until we're ready
SplashScreen.preventAutoHideAsync();

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
  const [appIsReady, setAppIsReady] = useState(false);

  // Load any resources or data needed for the app
  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
        });
      } catch (e) {
        console.warn('Error loading assets:', e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <AuthProvider>
            <Navigation />
            <StatusBar style="auto" />
          </AuthProvider>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}