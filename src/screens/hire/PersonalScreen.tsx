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
import { maskDate, maskCPF, maskPhone, ageFromBR, validDate, validCPF } from '../../utils/masks';
import { flow } from '../../services/flow';
const T = [{ t: 'Contratar Serviço' }];
type P = NativeStackScreenProps<RootStackParamList, 'HirePersonal'>;
export default function PersonalScreen({ navigation }: P) {
  const [name, setName] = useState(flow.name);
  const [social, setSocial] = useState(flow.social);
  const [cpf, setCpf] = useState(flow.cpf);
  const [birth, setBirth] = useState(flow.birth);
  const next = () => {
    if (name.trim().split(/\s+/).length < 2) return Alert.alert('Atenção', 'Informe o nome completo.');
    if (!validCPF(cpf)) return Alert.alert('CPF inválido', 'Confira os números digitados.');
    if (!validDate(birth)) return Alert.alert('Data inválida', 'Use o formato dd/mm/aaaa.');
    Object.assign(flow, { name, social, cpf, birth });
    navigation.navigate(ageFromBR(birth) < 18 ? 'Authorization' : 'HireContact');
  };
  return (
    <AuthLayout title={T} ratio={0.64} heading="Seus dados pessoais" sub={'Preencha as informações abaixo\npara contratar o serviço. Rápido e\nsem burocracia.'}>
      <Rise i={1}><AppInput label="Nome Completo" value={name} onChangeText={setName} /></Rise>
      <Rise i={2}><AppInput label="Nome Social (opcional)" value={social} onChangeText={setSocial} /></Rise>
      <Rise i={3} style={{ flexDirection: 'row', gap: 12 }}>
        <AppInput style={{ flex: 1 }} label="CPF" value={cpf} onChangeText={setCpf} mask={maskCPF} keyboardType="number-pad" />
        <AppInput style={{ flex: 1 }} label="Data de nascimento" value={birth} onChangeText={setBirth} mask={maskDate} keyboardType="number-pad" />
      </Rise>
      <View style={{ flex: 1, minHeight: 10 }} />
      <Rise i={4}><AppButton label="próximo" onPress={next} /></Rise>
      <Rise i={5}><FooterLink text="Já possui cadastro?" action="Entrar" onPress={() => navigation.navigate('Login')} /></Rise>
    </AuthLayout>
  );
}
