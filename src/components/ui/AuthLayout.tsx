import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius } from '../../theme';
import { sheetIn } from '../../animations/motion';
import Logo from './Logo';
import RevealTitle, { Seg } from './RevealTitle';
import Rise from './Rise';

type Props = { title: Seg[]; ratio?: number; heading: string; sub?: string; children: React.ReactNode; headingBold?: boolean };

/** Layout padrão: topo azul (logo + título) + sheet branco arredondado. `ratio` = altura do sheet (0–1). */
export default function AuthLayout({ title, ratio = 0.55, heading, sub, children }: Props) {
  const { height } = useWindowDimensions();
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <SafeAreaView edges={['top']} style={{ paddingHorizontal: 28 }}>
        <Rise i={0} style={{ marginTop: 6 }}><Logo size={64} /></Rise>
      </SafeAreaView>
      <View style={{ position: 'absolute', left: 40, right: 40, top: height * 0.19 }}>
        <RevealTitle segs={title} size={22} />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <Animated.View entering={sheetIn} style={{ height: height * ratio, backgroundColor: colors.white, borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet }}>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 28, paddingBottom: 28 }}>
            <Rise i={0}>
              <Text style={{ textAlign: 'center', fontFamily: fonts.medium, fontSize: 14, lineHeight: 20, color: colors.black }}>{heading}</Text>
              {sub ? <Text style={{ textAlign: 'center', fontFamily: fonts.light, fontSize: 10, lineHeight: 15, color: colors.muted, marginTop: 6, marginBottom: 22 }}>{sub}</Text> : <View style={{ height: 22 }} />}
            </Rise>
            {children}
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}
