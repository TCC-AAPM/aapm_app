import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, withDelay, withSequence, withRepeat, runOnJS, Easing } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme';
import { ease } from '../../animations/motion';
import { useAuth } from '../../context/AuthContext';

export default function SplashScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Splash'>) {
  const s = useSharedValue(0.72), o = useSharedValue(0), ring = useSharedValue(0);
  const { restore } = useAuth();
  const go = async () => navigation.replace((await restore()) ? 'Main' : 'Onboarding');
  useEffect(() => {
    o.value = withTiming(1, { duration: 700, easing: ease.outExpo });
    s.value = withSequence(
      withSpring(1, { damping: 9, stiffness: 120 }),
      withDelay(900, withTiming(1.18, { duration: 600, easing: ease.inOutCubic })),
    );
    o.value = withSequence(withTiming(1, { duration: 700 }), withDelay(900, withTiming(0, { duration: 600 }, (f) => f && runOnJS(go)())));
    ring.value = withRepeat(withTiming(1, { duration: 1400, easing: Easing.out(Easing.quad) }), -1);
  }, []);
  const logo = useAnimatedStyle(() => ({ opacity: o.value, transform: [{ scale: s.value }] }));
  const r = useAnimatedStyle(() => ({ opacity: (1 - ring.value) * 0.24 * o.value, transform: [{ scale: 0.8 + ring.value * 0.55 }] }));
  return (
    <View style={{ flex: 1, backgroundColor: colors.splash, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[{ position: 'absolute', width: 280, height: 280, borderRadius: 140, borderWidth: 1.5, borderColor: '#fff' }, r]} />
      <Animated.View style={logo}>
        <Image source={require('../../../assets/images/splash-logo.png')} resizeMode="contain" style={{ width: 280, height: 280 }} />
      </Animated.View>
    </View>
  );
}
