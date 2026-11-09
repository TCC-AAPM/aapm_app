import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../../theme';

export default function Checkbox({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  const box = useAnimatedStyle(() => ({ backgroundColor: checked ? colors.primary : colors.white, transform: [{ scale: withSpring(checked ? 1.08 : 1, { damping: 8 }) }] }));
  const tick = useAnimatedStyle(() => ({ opacity: withSpring(checked ? 1 : 0), transform: [{ scale: withSpring(checked ? 1 : 0.3, { damping: 9 }) }] }));
  return (
    <Pressable onPress={onToggle} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 22 }}>
      <Animated.View style={[{ width: 16, height: 16, borderRadius: 3, borderWidth: 1, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, box]}>
        <Animated.View style={tick}><Ionicons name="checkmark" size={12} color="#fff" /></Animated.View>
      </Animated.View>
      <Text style={{ flex: 1, marginLeft: 12, fontFamily: fonts.regular, fontSize: 9.5, color: colors.black }}>{label}</Text>
    </Pressable>
  );
}
