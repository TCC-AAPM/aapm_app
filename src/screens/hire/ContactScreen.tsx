import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AuthLayout from '../../components/ui/AuthLayout';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import FooterLink from '../../components/ui/FooterLink';
import Rise from '../../components/ui/Rise';
import { colors, fonts } from '../../theme';
import { maskDate, maskCPF, maskPhone, ageFromBR } from '../../utils/masks';
const T = [{ t: 'Contratar Serviço' }];
type P = NativeStackScreenProps<RootStackParamList, 'HireContact'>;
export default function ContactScreen({ navigation }: P) {
  const [email, setEmail] = useState('crpvieira6800@gmail.com');
  const [phone, setPhone] = useState('(11)95599-4441');
  return (
    <AuthLayout title={T} ratio={0.64} heading="Por onde podemos te contatar?" sub={'Preencha aqui suas informações de\ncontato.'}>
      <Rise i={1}><AppInput label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" /></Rise>
      <Rise i={2}><AppInput label="Telefone" value={phone} onChangeText={setPhone} mask={maskPhone} keyboardType="phone-pad" /></Rise>
      <View style={{ flex: 1, minHeight: 10 }} />
      <Rise i={3}><AppButton label="próximo" onPress={() => navigation.navigate('HireSchool')} /></Rise>
      <Rise i={4}><FooterLink text="Já possui cadastro?" action="Entrar" onPress={() => navigation.navigate('Login')} /></Rise>
    </AuthLayout>
  );
}
