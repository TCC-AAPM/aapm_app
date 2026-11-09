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
type P = NativeStackScreenProps<RootStackParamList, 'HireSchool'>;
export default function SchoolScreen({ navigation }: P) {
  const [rm, setRm] = useState('1062167');
  const [course, setCourse] = useState('Técnico em Desenvolvimento de Sistemas');
  const [cls, setCls] = useState('DS2A-3ES1');
  return (
    <AuthLayout title={T} ratio={0.64} heading="Quais são seus dados escolares?" sub={'Preencha aqui suas informações de\ncontato.'}>
      <Rise i={1}><AppInput label="Matrícula escolar" value={rm} onChangeText={setRm} keyboardType="number-pad" /></Rise>
      <Rise i={2}><AppInput label="Curso" value={course} onChangeText={setCourse} /></Rise>
      <Rise i={3}><AppInput label="Turma" value={cls} onChangeText={setCls} /></Rise>
      <View style={{ flex: 1, minHeight: 10 }} />
      <Rise i={4}><AppButton label="próximo" onPress={() => navigation.navigate('HireTerms')} /></Rise>
      <Rise i={5}><FooterLink text="Já possui cadastro?" action="Entrar" onPress={() => navigation.navigate('Login')} /></Rise>
    </AuthLayout>
  );
}
