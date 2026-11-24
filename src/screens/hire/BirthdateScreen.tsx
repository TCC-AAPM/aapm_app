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
import { maskDate, maskCPF, maskPhone, ageFromBR, validDate } from '../../utils/masks';
import { flow } from '../../services/flow';
const T = [{ t: 'Contratar Serviço' }];
type P = NativeStackScreenProps<RootStackParamList, 'HireBirthdate'>;
export default function BirthdateScreen({ navigation }: P) {
  const [d, setD] = useState(flow.birth);
  const next = () => {
    if (!validDate(d)) return Alert.alert('Data inválida', 'Use o formato dd/mm/aaaa.');
    flow.birth = d;
    navigation.navigate(ageFromBR(d) < 18 ? 'Authorization' : 'HirePersonal');
  };
  return (
    <AuthLayout title={T} ratio={0.55} heading={'Vamos começar com sua\ndata de nascimento'} sub="Precisamos saber sua idade para continuar">
      <Rise i={1}><AppInput label="Data de Nascimento" value={d} onChangeText={setD} mask={maskDate} keyboardType="number-pad" /></Rise>
      <View style={{ flex: 1, minHeight: 14 }} />
      <Rise i={2}><AppButton label="Enviar" onPress={next} /></Rise>
      <Rise i={3}><FooterLink text="Já possui cadastro?" action="Entrar" onPress={() => navigation.navigate('Login')} /></Rise>
    </AuthLayout>
  );
}
