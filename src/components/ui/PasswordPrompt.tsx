import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import AppInput from './AppInput';
import AppButton from './AppButton';
import FooterLink from './FooterLink';
import { colors, fonts } from '../../theme';

export default function PasswordPrompt({ visible, title, onCancel, onConfirm }: { visible: boolean; title: string; onCancel: () => void; onConfirm: (senha: string) => void }) {
  const [s, setS] = useState('');
  const close = () => { setS(''); onCancel(); };
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={close}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 }}>
        <View style={{ backgroundColor: colors.white, borderRadius: 22, padding: 24 }}>
          <Text style={{ fontFamily: fonts.semi, fontSize: 17, lineHeight: 24, color: colors.black, marginBottom: 20 }}>{title}</Text>
          <AppInput label="Senha" value={s} onChangeText={setS} secure />
          <AppButton label="Confirmar" onPress={() => { const v = s; setS(''); onConfirm(v); }} />
          <FooterLink text="Cancelar" onPress={close} />
        </View>
      </View>
    </Modal>
  );
}
