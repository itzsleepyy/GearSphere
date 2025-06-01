import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../contexts/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import DiscoverScreen from '../screens/main/DiscoverScreen';
import MapScreen from '../screens/main/MapScreen';
import GarageScreen from '../screens/main/GarageScreen';
import BadgesScreen from '../screens/main/BadgesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Discover') {
            iconName = focused ? 'car-sport' : 'car-sport-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Garage') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Badges') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5A5F',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Garage" component={GarageScreen} />
      <Tab.Screen name="Badges" component={BadgesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { user, loading, usingMockData } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  // For mock data mode, we'll set up a way to toggle between auth and main screens
  const initialRouteName = usingMockData ? 'DevMenu' : (user ? 'Main' : 'Auth');

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}
      >
        {usingMockData && (
          <Stack.Screen name="DevMenu\" component={DevMenuScreen} />
        )}
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Development menu for testing both authenticated and unauthenticated flows
function DevMenuScreen({ navigation }: any) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="DevMenuHome"
        options={{ title: 'Development Menu' }}
        component={() => (
          <React.Fragment>
            <Button 
              title="Auth Flow (Not Logged In)" 
              onPress={() => navigation.navigate('Auth')} 
            />
            <Button 
              title="Main Flow (Logged In)" 
              onPress={() => navigation.navigate('Main')} 
            />
          </React.Fragment>
        )}
      />
    </Stack.Navigator>
  );
}

import { Button } from 'react-native';