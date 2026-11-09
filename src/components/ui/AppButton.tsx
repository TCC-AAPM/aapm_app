import React from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { colors, fonts, radius, shadow } from '../../theme';

const AP = Animated.createAnimatedComponent(Pressable);

export default function AppButton({ label, onPress }: { label: string; onPress?: () => void }) {
  const s = useSharedValue(1);
  const st = useAnimatedStyle(() => ({ transform: [{ scale: s.value }] }));
  return (
    <AP
      onPress={onPress}
      onPressIn={() => (s.value = withSpring(0.96, { damping: 15, stiffness: 300 }))}
      onPressOut={() => (s.value = withSpring(1, { damping: 10, stiffness: 220 }))}
      style={[{ height: 44, borderRadius: radius.button, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, shadow, st]}
    >
      <Text style={{ color: colors.white, fontFamily: fonts.regular, fontSize: 14 }}>{label}</Text>
    </AP>
  );
}
