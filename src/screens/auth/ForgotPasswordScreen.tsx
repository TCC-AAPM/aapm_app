import React, { useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AuthLayout from '../../components/ui/AuthLayout';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import FooterLink from '../../components/ui/FooterLink';
import Rise from '../../components/ui/Rise';

export default function ForgotPasswordScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>) {
  const [email, setEmail] = useState('rhuan@gmail.com');
  return (
    <AuthLayout title={[{ t: 'Redefinição de Senha' }]} ratio={0.55} heading={'Esqueceu sua senha?\nAcontece!'} sub="Digite o seu email">
      <View style={{ height: 24 }} />
      <Rise i={1}><AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" /></Rise>
      <View style={{ flex: 1, minHeight: 14 }} />
      <Rise i={2}><AppButton label="Enviar" onPress={() => navigation.navigate('ResetSent')} /></Rise>
      <Rise i={3}><FooterLink text="Voltar" onPress={() => navigation.goBack()} /></Rise>
    </AuthLayout>
  );
}
