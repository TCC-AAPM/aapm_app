import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { colors } from '../theme';
import MainTabs from './MainTabs';
import SplashScreen from '../screens/splash/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetSentScreen from '../screens/auth/ResetSentScreen';
import BirthdateScreen from '../screens/hire/BirthdateScreen';
import AuthorizationScreen from '../screens/hire/AuthorizationScreen';
import PersonalScreen from '../screens/hire/PersonalScreen';
import ContactScreen from '../screens/hire/ContactScreen';
import SchoolScreen from '../screens/hire/SchoolScreen';
import TermsScreen from '../screens/hire/TermsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 350, contentStyle: { backgroundColor: colors.primary }, gestureEnabled: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetSent" component={ResetSentScreen} />
      <Stack.Screen name="HireBirthdate" component={BirthdateScreen} />
      <Stack.Screen name="Authorization" component={AuthorizationScreen} />
      <Stack.Screen name="HirePersonal" component={PersonalScreen} />
      <Stack.Screen name="HireContact" component={ContactScreen} />
      <Stack.Screen name="HireSchool" component={SchoolScreen} />
      <Stack.Screen name="HireTerms" component={TermsScreen} />
      <Stack.Screen name="Main" component={MainTabs} options={{ contentStyle: { backgroundColor: colors.white } }} />
    </Stack.Navigator>
  );
}
