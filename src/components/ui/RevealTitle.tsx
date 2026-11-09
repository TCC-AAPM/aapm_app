import React, { useEffect } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withTiming, interpolate } from 'react-native-reanimated';
import { colors, fonts } from '../../theme';
import { ease } from '../../animations/motion';

export type Seg = { t: string; accent?: boolean };

function Word({ w, accent, i, size, delay }: { w: string; accent?: boolean; i: number; size: number; delay: number }) {
  const p = useSharedValue(0);
  useEffect(() => { p.value = withDelay(delay + i * 70, withTiming(1, { duration: 800, easing: ease.outExpo })); }, []);
  const st = useAnimatedStyle(() => ({ opacity: p.value, transform: [{ translateY: interpolate(p.value, [0, 1], [size * 1.4, 0]) }] }));
  return (
    <View style={{ overflow: 'hidden', marginRight: size * 0.28 }}>
      <Animated.Text style={[{ fontFamily: fonts.semi, fontSize: size, lineHeight: size * 1.5, color: accent ? colors.accent : colors.white }, st]}>{w}</Animated.Text>
    </View>
  );
}

/** Título com reveal palavra-por-palavra (máscara + translateY), como SplitText do GSAP. */
export default function RevealTitle({ segs, size = 22, delay = 150, style }: { segs: Seg[]; size?: number; delay?: number; style?: StyleProp<ViewStyle> }) {
  const words = segs.flatMap((s) => s.t.split(' ').map((w) => ({ w, accent: s.accent })));
  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>
      {words.map((x, i) => <Word key={i} i={i} w={x.w} accent={x.accent} size={size} delay={delay} />)}
    </View>
  );
}
