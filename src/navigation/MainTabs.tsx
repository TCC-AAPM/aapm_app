import React from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainTabParamList } from './types';
import { colors, fonts } from '../theme';
import HomeScreen from '../screens/home/HomeScreen';
import AccountScreen from '../screens/home/AccountScreen';
import ActionsScreen from '../screens/home/ActionsScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const META: Record<string, { label: string; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap }> = {
  Home: { label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  Account: { label: 'Sobre a conta', icon: 'person-circle-outline', activeIcon: 'person-circle' },
  Actions: { label: 'Ações', icon: 'settings-outline', activeIcon: 'settings' },
};

function TabBar({ state, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const w = width / state.routes.length;
  const pill = useAnimatedStyle(() => ({ transform: [{ translateX: withSpring(state.index * w + (w - 60) / 2, { damping: 16, stiffness: 160 }) }] }));
  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.white, paddingTop: 10, paddingBottom: bottom + 6, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, elevation: 12 }}>
      <Animated.View style={[{ position: 'absolute', top: 10, width: 60, height: 30, borderRadius: 15, backgroundColor: colors.primary }, pill]} />
      {state.routes.map((r, i) => {
        const on = state.index === i; const m = META[r.name];
        return (
          <Pressable key={r.key} onPress={() => navigation.navigate(r.name)} style={{ width: w, alignItems: 'center' }}>
            <View style={{ height: 30, justifyContent: 'center' }}><Ionicons name={on ? m.activeIcon : m.icon} size={20} color={on ? '#fff' : '#6B7280'} /></View>
            <Text style={{ marginTop: 3, fontSize: 8, fontFamily: on ? fonts.semi : fonts.regular, color: on ? colors.primary : '#6B7280' }}>{m.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator tabBar={(p) => <TabBar {...p} />} screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Actions" component={ActionsScreen} />
    </Tab.Navigator>
  );
}
