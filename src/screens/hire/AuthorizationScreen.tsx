import React, { useState } from 'react';
import { Linking, View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AuthLayout from '../../components/ui/AuthLayout';
import AppInput from '../../components/ui/AppInput';
import AppButton from '../../components/ui/AppButton';
import FooterLink from '../../components/ui/FooterLink';
import Rise from '../../components/ui/Rise';
import { colors, fonts } from '../../theme';
import { BASE_URL } from '../../services/api';
import { maskDate, maskCPF, maskPhone, ageFromBR } from '../../utils/masks';
const T = [{ t: 'Contratar Serviço' }];
type P = NativeStackScreenProps<RootStackParamList, 'Authorization'>;
export default function AuthorizationScreen({ navigation }: P) {
  return (
    <AuthLayout title={[{ t: 'Autorização' }]} ratio={0.55} heading="Identificamos um conflito!" sub="O que você descobriu?">
      <Rise i={1}>
        <Text style={{ fontFamily: fonts.light, fontSize: 9.5, lineHeight: 15, color: colors.black }}>
          {'Como você ainda não é maior de idade, não é possível concluir o cadastro online. Seu responsável legal deverá comparecer pessoalmente à secretaria e assinar o termo de uso do sistema.\n\nVocê pode imprimir o termo abaixo, preenchê-lo e levá-lo já assinado à secretaria do AAPM, localizada perto da biblioteca, para agilizar o processo.'}
        </Text>
      </Rise>
      <View style={{ flex: 1, minHeight: 20 }} />
      <Rise i={2}><AppButton label="Baixar termo" onPress={() => Linking.openURL(`${BASE_URL}/Termo/obter-pdf?referencia=S`)} /></Rise>
      <Rise i={3}><FooterLink text="Já possui cadastro?" action="Entrar" onPress={() => navigation.navigate('Login')} /></Rise>
    </AuthLayout>
  );
}
