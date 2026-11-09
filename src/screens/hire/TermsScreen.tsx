import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AuthLayout from '../../components/ui/AuthLayout';
import AppButton from '../../components/ui/AppButton';
import FooterLink from '../../components/ui/FooterLink';
import Checkbox from '../../components/ui/Checkbox';
import Rise from '../../components/ui/Rise';
import { colors, fonts } from '../../theme';

const ITEMS = [
  'Li e concordo que as informações que prestei são verdadeiras',
  'Concordo com os termos de uso do sistema (EPD)',
  'Li e aceito o uso dos meus dados no âmbito da LGPD',
];

export default function TermsScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'HireTerms'>) {
  const [c, setC] = useState([false, false, false]);
  return (
    <AuthLayout title={[{ t: 'Contratar Serviço' }]} ratio={0.6} heading="Termos" sub={'Assinale se você concorda com\ntodos os termos de uso'}>
      <View style={{ height: 6 }} />
      {ITEMS.map((t, i) => (
        <Rise key={i} i={1 + i}><Checkbox label={t} checked={c[i]} onToggle={() => setC(c.map((v, j) => (j === i ? !v : v)))} /></Rise>
      ))}
      <View style={{ flex: 1, minHeight: 10 }} />
      <Rise i={4}><AppButton label="Finalizar" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })} /></Rise>
      <Rise i={5}><FooterLink text="Já possui cadastro?" action="Entrar" onPress={() => navigation.navigate('Login')} /></Rise>
    </AuthLayout>
  );
}
