import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { rise } from '../../animations/motion';

/** Wrapper de entrada em cascata. `i` = ordem do stagger. */
export default function Rise({ i = 0, children, style }: { i?: number; children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return <Animated.View entering={rise(i)} style={style}>{children}</Animated.View>;
}
