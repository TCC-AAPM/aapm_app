import React, { useEffect } from 'react';
import { View, ImageBackground, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, fonts } from '../../theme';
import { ease, fade } from '../../animations/motion';
import Logo from '../../components/ui/Logo';
import RevealTitle from '../../components/ui/RevealTitle';
import Rise from '../../components/ui/Rise';
import AppButton from '../../components/ui/AppButton';
import heroImage from '../../../assets/images/hero.png';

/** Imagem de fundo da tela de boas-vindas. */
export default function OnboardingScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) {
  const k = useSharedValue(1.18);
  useEffect(() => { k.value = withTiming(1, { duration: 2600, easing: ease.outExpo }); }, []);
  const bg = useAnimatedStyle(() => ({ transform: [{ scale: k.value }] }));
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Animated.View style={[StyleSheet.absoluteFill, bg]}>
        <ImageBackground source={heroImage} style={StyleSheet.absoluteFill} resizeMode="cover" />
      </Animated.View>
      <LinearGradient colors={['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.75)']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <Animated.View entering={fade(200)} style={{ marginTop: 6 }}><Logo size={64} /></Animated.View>
        <View style={{ flex: 1 }} />
        <RevealTitle size={22} delay={500} segs={[{ t: 'Bem-vindo a uma experiência' }, { t: 'feita para você.', accent: true }]} />
        <Rise i={5} style={{ marginTop: 40 }}>
          <AppButton label="Começar" onPress={() => navigation.navigate('Login')} />
        </Rise>
        <Rise i={6} style={{ alignItems: 'center', marginTop: 18, marginBottom: 14 }}>
          <Pressable hitSlop={10} onPress={() => navigation.navigate('HireBirthdate')}>
            <Text style={{ color: colors.white, fontFamily: fonts.semi, fontSize: 9 }}>Não tenho conta</Text>
          </Pressable>
        </Rise>
      </SafeAreaView>
    </View>
  );
}
