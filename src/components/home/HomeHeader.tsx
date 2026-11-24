import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../../theme';
import { rise } from '../../animations/motion';
import Logo from '../ui/Logo';
import { useAuth } from '../../context/AuthContext';

export const HEADER_RATIO = 0.3;

export default function HomeHeader({ account }: { account?: boolean }) {
  const { height } = useWindowDimensions();
  const { user } = useAuth();
  const name = user?.nomeSocial || user?.nome?.split(' ')[0] || '';
  return (
    <View style={{ height: height * HEADER_RATIO, overflow: 'hidden' }}>
      <LinearGradient colors={['#102D70', '#214FAE', '#3673D6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} />
      <View style={{ position: 'absolute', width: 190, height: 190, borderRadius: 95, right: -55, top: -72, backgroundColor: 'rgba(255,255,255,0.08)' }} />
      <View style={{ position: 'absolute', width: 100, height: 100, borderRadius: 50, right: 44, top: 75, backgroundColor: 'rgba(255,255,255,0.05)' }} />
      <SafeAreaView edges={['top']} style={{ paddingHorizontal: 22 }}>
        <Animated.View entering={rise(0, 80)}><Logo size={54} /></Animated.View>
        <Animated.Text entering={rise(1, 80)} style={{ marginTop: 2, color: 'rgba(255,255,255,0.76)', fontFamily: fonts.medium, fontSize: 13 }}>Bem-vindo(a) de volta</Animated.Text>
        <Animated.Text entering={rise(2, 80)} numberOfLines={1} style={{ color: '#fff', fontFamily: fonts.semi, fontSize: 29, lineHeight: 38 }}>{name}</Animated.Text>
        {!!user?.curso && <Animated.Text entering={rise(3, 80)} numberOfLines={1} style={{ color: 'rgba(255,255,255,0.8)', fontFamily: fonts.regular, fontSize: 13, marginTop: 1 }}>{user.curso}</Animated.Text>}
      </SafeAreaView>
    </View>
  );
}
