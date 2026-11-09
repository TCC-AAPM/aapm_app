import React, { useState } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AuthLayout from '../../components/ui/AuthLayout';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import FooterLink from '../../components/ui/FooterLink';
import Rise from '../../components/ui/Rise';

export default function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const [email, setEmail] = useState('rhuan@gmail.com');
  const [pass, setPass] = useState('12345678');
  return (
    <AuthLayout title={[{ t: 'Faça login na sua conta' }, { t: 'AAPM', accent: true }]} ratio={0.55}
      heading={'Já possui armário ou vaga de estacionamento?'} sub={'Entre com seu e-mail cadastrado e senha'}>
      <Rise i={1}><AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" /></Rise>
      <Rise i={2}><AppInput label="Senha" value={pass} onChangeText={setPass} secure /></Rise>
      <View style={{ flex: 1, minHeight: 14 }} />
      <Rise i={3}><AppButton label="Entrar" onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })} /></Rise>
      <Rise i={4}><FooterLink text="Esqueceu a sua senha?" onPress={() => navigation.navigate('ForgotPassword')} /></Rise>
    </AuthLayout>
  );
}
