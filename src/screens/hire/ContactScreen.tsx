import React, { useState } from 'react';
import { Alert, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AuthLayout from '../../components/ui/AuthLayout';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import FooterLink from '../../components/ui/FooterLink';
import Rise from '../../components/ui/Rise';
import { colors, fonts } from '../../theme';
import { maskDate, maskCPF, maskPhone, ageFromBR, validEmail, onlyDigits } from '../../utils/masks';
import { flow } from '../../services/flow';
const T = [{ t: 'Contratar Serviço' }];
type P = NativeStackScreenProps<RootStackParamList, 'HireContact'>;
export default function ContactScreen({ navigation }: P) {
  const [email, setEmail] = useState(flow.email);
  const [phone, setPhone] = useState(flow.phone);
  const next = () => {
    if (!validEmail(email)) return Alert.alert('Atenção', 'Informe um e-mail válido.');
    if (![10, 11].includes(onlyDigits(phone).length)) return Alert.alert('Atenção', 'Informe o telefone com DDD.');
    Object.assign(flow, { email, phone });
    navigation.navigate('HireSchool');
  };
  return (
    <AuthLayout title={T} ratio={0.64} heading="Por onde podemos te contatar?" sub={'Preencha aqui suas informações de\ncontato.'}>
      <Rise i={1}><AppInput label="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" /></Rise>
      <Rise i={2}><AppInput label="Telefone" value={phone} onChangeText={setPhone} mask={maskPhone} keyboardType="phone-pad" /></Rise>
      <View style={{ flex: 1, minHeight: 10 }} />
      <Rise i={3}><AppButton label="próximo" onPress={next} /></Rise>
      <Rise i={4}><FooterLink text="Já possui cadastro?" action="Entrar" onPress={() => navigation.navigate('Login')} /></Rise>
    </AuthLayout>
  );
}
