import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AuthLayout from '../../components/ui/AuthLayout';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import FooterLink from '../../components/ui/FooterLink';
import Rise from '../../components/ui/Rise';
import { useAuth } from '../../context/AuthContext';
import { api, errMsg } from '../../services/api';
import { flow } from '../../services/flow';
import { validEmail } from '../../utils/masks';

export default function ForgotPasswordScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>) {
  const { user } = useAuth(); // logado (Ações → Modificar senha) já vem com o e-mail
  const [email, setEmail] = useState(user?.email ?? '');
  const [busy, setBusy] = useState(false);
  const enviar = async () => {
    if (busy) return;
    if (!validEmail(email)) return Alert.alert('Atenção', 'Informe um e-mail válido.');
    setBusy(true);
    try {
      await api('/EsqueciSenha', { method: 'POST', auth: false, body: { email: email.trim() } });
      flow.resetEmail = email.trim();
      navigation.navigate('ResetSent');
    } catch (e) { Alert.alert('Não foi possível enviar', errMsg(e)); }
    finally { setBusy(false); }
  };
  return (
    <AuthLayout title={[{ t: 'Redefinição de Senha' }]} ratio={0.55} heading={'Esqueceu sua senha?\nAcontece!'} sub="Digite o seu email">
      <View style={{ height: 24 }} />
      <Rise i={1}><AppInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" /></Rise>
      <View style={{ flex: 1, minHeight: 14 }} />
      <Rise i={2}><AppButton label={busy ? 'Aguarde...' : 'Enviar'} onPress={enviar} /></Rise>
      <Rise i={3}><FooterLink text="Voltar" onPress={() => navigation.goBack()} /></Rise>
    </AuthLayout>
  );
}
