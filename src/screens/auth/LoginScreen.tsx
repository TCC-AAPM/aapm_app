import React, { useState } from 'react';
import { Alert, Linking, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AuthLayout from '../../components/ui/AuthLayout';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import FooterLink from '../../components/ui/FooterLink';
import Rise from '../../components/ui/Rise';
import { useAuth } from '../../context/AuthContext';
import { errMsg } from '../../services/api';
import { validEmail } from '../../utils/masks';

export default function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [busy, setBusy] = useState(false);
  const entrar = async () => {
    if (busy) return;
    if (!validEmail(email) || !pass) return Alert.alert('Atenção', 'Informe um e-mail e uma senha válidos.');
    setBusy(true);
    try { await signIn(email, pass); navigation.reset({ index: 0, routes: [{ name: 'Main' }] }); }
    catch (e) { Alert.alert('Não foi possível entrar', errMsg(e)); }
    finally { setBusy(false); }
  };
  return (
    <AuthLayout title={[{ t: 'Faça login na sua conta' }, { t: 'AAPM', accent: true }]} ratio={0.55}
      heading={'Já possui armário ou vaga de estacionamento?'} sub={'Entre com seu e-mail cadastrado e senha'}>
      <Rise i={1}><AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" /></Rise>
      <Rise i={2}><AppInput label="Senha" value={pass} onChangeText={setPass} secure /></Rise>
      <View style={{ flex: 1, minHeight: 14 }} />
      <Rise i={3}><AppButton label={busy ? 'Aguarde...' : 'Entrar'} onPress={entrar} /></Rise>
      <Rise i={4}><FooterLink text="Esqueceu a sua senha?" onPress={() => Linking.openURL('https://aapm.dev/senha/esqueci')} /></Rise>
    </AuthLayout>
  );
}
