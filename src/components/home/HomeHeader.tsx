import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { colors, fonts } from '../../theme';
import { rise } from '../../animations/motion';
import Logo from '../ui/Logo';
import { user } from '../../data/mock';

export const HEADER_RATIO = 0.3;

export default function HomeHeader({ account }: { account?: boolean }) {
  const { height } = useWindowDimensions();
  return (
    <View style={{ height: height * HEADER_RATIO, backgroundColor: colors.primary }}>
      <SafeAreaView edges={['top']} style={{ paddingHorizontal: 20 }}>
        <Animated.View entering={rise(0, 100)}><Logo size={64} /></Animated.View>
        <Animated.Text entering={rise(1, 100)} style={{ marginTop: 8, color: '#fff', fontFamily: fonts.light, fontSize: 12 }}>Bem-vindo(a) de volta,</Animated.Text>
        <Animated.Text entering={rise(2, 100)} style={{ color: '#fff', fontFamily: fonts.semi, fontSize: 26, lineHeight: 34 }}>{user.name}</Animated.Text>
        <Animated.Text entering={rise(3, 100)} style={{ color: '#fff', fontFamily: fonts.light, fontSize: 10 }}>{user.course}</Animated.Text>
      </SafeAreaView>
    </View>
  );
}
