import React from 'react';
import { TextInput, KeyboardTypeOptions, StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { colors, fonts, radius } from '../../theme';

type Props = {
  label: string; value: string; onChangeText: (v: string) => void;
  secure?: boolean; keyboardType?: KeyboardTypeOptions; mask?: (v: string) => string; style?: StyleProp<ViewStyle>;
};

/** Campo outlined com label sobre a borda (igual ao Figma) e borda animada no foco. */
export default function AppInput({ label, value, onChangeText, secure, keyboardType, mask, style }: Props) {
  const f = useSharedValue(0);
  const box = useAnimatedStyle(() => ({ borderColor: interpolateColor(f.value, [0, 1], [colors.border, colors.primary]), borderWidth: 1 + f.value * 0.8 }));
  const lbl = useAnimatedStyle(() => ({ color: interpolateColor(f.value, [0, 1], [colors.muted, colors.primary]) }));
  return (
    <Animated.View style={[{ height: 58, borderRadius: radius.field, justifyContent: 'center', paddingHorizontal: 15, marginBottom: 18, backgroundColor: colors.white }, box, style]}>
      <Animated.Text style={[{ position: 'absolute', top: -9, left: 12, paddingHorizontal: 5, backgroundColor: colors.white, fontSize: 12, fontFamily: fonts.medium }, lbl]}>{label}</Animated.Text>
      <TextInput
        value={value} secureTextEntry={secure} keyboardType={keyboardType} autoCapitalize="none"
        onChangeText={(v) => onChangeText(mask ? mask(v) : v)}
        onFocus={() => (f.value = withTiming(1, { duration: 220 }))}
        onBlur={() => (f.value = withTiming(0, { duration: 220 }))}
        style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.black, padding: 0 }}
      />
    </Animated.View>
  );
}
