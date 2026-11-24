import React, { useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, radius, shadow } from '../../theme';
import { rise, sheetIn } from '../../animations/motion';
import HomeHeader from '../../components/home/HomeHeader';
import PasswordPrompt from '../../components/ui/PasswordPrompt';
import { useAuth } from '../../context/AuthContext';
import { api, errMsg } from '../../services/api';
import { navRef } from '../../navigation/ref';

type ActionCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  title: string;
  description: string;
  danger?: boolean;
  onPress: () => void;
};

function ActionCard({ icon, label, title, description, danger, onPress }: ActionCardProps) {
  const color = danger ? '#D92D20' : colors.primary;
  const scale = useSharedValue(1);
  const pressStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={pressStyle}>
      <Pressable onPress={onPress} onPressIn={() => { scale.value = withSpring(0.98); }} onPressOut={() => { scale.value = withSpring(1); }} accessibilityRole="button" accessibilityLabel={`${title}. ${description}`}>
      <View style={[{ minHeight: 92, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, backgroundColor: colors.white, borderRadius: 18, borderWidth: 1, borderColor: '#EDF1F7' }, shadow]}>
        <View style={{ width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: danger ? '#FFF0EF' : colors.softBlue }}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
        <View style={{ flex: 1, marginLeft: 14 }}>
          <Text style={{ fontFamily: fonts.medium, fontSize: 12, color: colors.muted }}>{label}</Text>
          <Text style={{ marginTop: 2, fontFamily: fonts.semi, fontSize: 16, color }}>{title}</Text>
          <Text style={{ marginTop: 2, fontFamily: fonts.regular, fontSize: 13, color: colors.inkSoft }}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={color} />
      </View>
      </Pressable>
    </Animated.View>
  );
}

export default function ActionsScreen() {
  const nav = useNavigation<any>();
  const { signOut } = useAuth();
  const [ask, setAsk] = useState(false);

  const deleteAccount = async (senha: string) => {
    if (!senha) return Alert.alert('Atenção', 'Informe sua senha.');
    try {
      await api('/Alunos/excluir-conta', { method: 'POST', body: { senha } });
      setAsk(false);
      await signOut();
      navRef.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
    } catch (e) { Alert.alert('Não foi possível excluir', errMsg(e)); }
  };

  const confirmDeleteAccount = () => Alert.alert(
    'Excluir conta',
    'A exclusão é permanente. Deseja continuar?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir conta',
        style: 'destructive',
        onPress: () => setAsk(true),
      },
    ],
  );

  const confirmSignOut = () => Alert.alert(
    'Sair da conta',
    'Deseja encerrar sua sessão neste dispositivo?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        onPress: async () => {
          await signOut();
          navRef.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.page }}>
      <HomeHeader />
      <Animated.View entering={sheetIn} style={{ flex: 1, marginTop: -radius.sheet, backgroundColor: colors.page, borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40, gap: 14 }} showsVerticalScrollIndicator={false}>
          <Animated.View entering={rise(0, 180)} style={{ marginBottom: 4 }}>
            <Text style={{ fontFamily: fonts.semi, fontSize: 21, color: colors.black }}>Ajustes da conta</Text>
            <Text style={{ marginTop: 3, fontFamily: fonts.regular, fontSize: 13, color: colors.muted }}>Gerencie sua segurança e seus dados</Text>
          </Animated.View>
          <Animated.View entering={rise(1, 180)}>
            <ActionCard
              icon="lock-closed-outline"
              label="Segurança"
              title="Modificar senha"
              description="Atualize sua senha de acesso"
              onPress={() => Linking.openURL('https://aapm.dev/senha/esqueci')}
            />
          </Animated.View>
          <Animated.View entering={rise(2, 180)}>
            <ActionCard
              icon="log-out-outline"
              label="Sessão"
              title="Sair da conta"
              description="Encerre sua sessão neste dispositivo"
              onPress={confirmSignOut}
            />
          </Animated.View>
          <Animated.View entering={rise(3, 180)}>
            <ActionCard
              icon="trash-outline"
              label="Conta"
              title="Deletar conta"
              description="Exclusão permanente da sua conta"
              danger
              onPress={confirmDeleteAccount}
            />
          </Animated.View>
        </ScrollView>
      </Animated.View>
      <PasswordPrompt visible={ask} title="Confirme sua senha para excluir a conta" onCancel={() => setAsk(false)} onConfirm={deleteAccount} />
    </View>
  );
}
