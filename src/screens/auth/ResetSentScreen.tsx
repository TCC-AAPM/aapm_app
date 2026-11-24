import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withDelay, withTiming, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme';
import { ease } from '../../animations/motion';
import AuthLayout from '../../components/ui/AuthLayout';
import AppButton from '../../components/ui/AppButton';
import FooterLink from '../../components/ui/FooterLink';
import Rise from '../../components/ui/Rise';
import { api, errMsg } from '../../services/api';
import { flow } from '../../services/flow';

const AC = Animated.createAnimatedComponent(Circle);
const AP = Animated.createAnimatedComponent(Path);
const CIRC = 2 * Math.PI * 38;

/** Check "desenhado" via strokeDashoffset (efeito DrawSVG). */
function DrawCheck() {
  const c = useSharedValue(CIRC), p = useSharedValue(60), pop = useSharedValue(0.8);
  useEffect(() => {
    c.value = withDelay(700, withTiming(0, { duration: 900, easing: ease.outExpo }));
    p.value = withDelay(1300, withTiming(0, { duration: 600, easing: ease.outExpo }));
    pop.value = withDelay(700, withSpring(1, { damping: 8 }));
  }, []);
  const circ = useAnimatedProps(() => ({ strokeDashoffset: c.value }));
  const path = useAnimatedProps(() => ({ strokeDashoffset: p.value }));
  const st = useAnimatedStyle(() => ({ transform: [{ scale: pop.value }] }));
  return (
    <Animated.View style={[{ alignSelf: 'center' }, st]}>
      <Svg width={90} height={90} viewBox="0 0 90 90">
        <AC cx={45} cy={45} r={38} stroke={colors.primary} strokeWidth={2.5} fill="none" strokeDasharray={CIRC} animatedProps={circ} strokeLinecap="round" rotation={-90} origin="45,45" />
        <AP d="M28 46 L40 58 L63 33" stroke={colors.primary} strokeWidth={2.5} fill="none" strokeDasharray={60} animatedProps={path} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </Animated.View>
  );
}

export default function ResetSentScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'ResetSent'>) {
  const reenviar = async () => {
    try {
      await api('/EsqueciSenha/reenviar-codigo-recuperacao', { method: 'POST', auth: false, body: { email: flow.resetEmail } });
      Alert.alert('Pronto', 'Reenviamos o e-mail de recuperação.');
    } catch (e) { Alert.alert('Não foi possível reenviar', errMsg(e)); }
  };
  return (
    <AuthLayout title={[{ t: 'Redefinição de Senha' }]} ratio={0.55} heading="Enviamos um link de redefinição de senha no seu Email!" sub={'Se ficar sem receber, aguarde alguns minutos\nantes de solicitar novamente'}>
      <View style={{ height: 8 }} />
      <DrawCheck />
      <View style={{ flex: 1, minHeight: 20 }} />
      <Rise i={3}><AppButton label="Fazer login" onPress={() => navigation.navigate('Login')} /></Rise>
      <Rise i={4}><FooterLink text="Não recebeu o código?" action="reenviar" onPress={reenviar} /></Rise>
    </AuthLayout>
  );
}
