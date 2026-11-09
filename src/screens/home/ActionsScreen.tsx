import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, radius, shadow } from '../../theme';
import { rise, sheetIn } from '../../animations/motion';
import HomeHeader from '../../components/home/HomeHeader';

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
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${title}. ${description}`}>
      <View style={[{ minHeight: 66, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 11, paddingVertical: 10, backgroundColor: colors.white, borderRadius: 12 }, shadow]}>
        <View style={{ width: 28, height: 28, borderRadius: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: danger ? '#FFF0EF' : colors.iconBox }}>
          <Ionicons name={icon} size={15} color={color} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ fontFamily: fonts.light, fontSize: 7, color: colors.muted }}>{label}</Text>
          <Text style={{ marginTop: 1, fontFamily: fonts.semi, fontSize: 9, color }}>{title}</Text>
          <Text style={{ marginTop: 1, fontFamily: fonts.light, fontSize: 7, color: colors.muted }}>{description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={13} color={color} />
      </View>
    </Pressable>
  );
}

export default function ActionsScreen() {
  const nav = useNavigation<any>();

  const confirmDeleteAccount = () => Alert.alert(
    'Excluir conta',
    'A exclusão é permanente. Deseja continuar?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir conta',
        style: 'destructive',
        onPress: () => Alert.alert('Serviço indisponível', 'A exclusão ainda não está conectada ao serviço de contas. Seus dados não foram apagados.'),
      },
    ],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <HomeHeader />
      <Animated.View entering={sheetIn} style={{ flex: 1, marginTop: -radius.sheet, backgroundColor: '#fff', borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet }}>
        <ScrollView contentContainerStyle={{ padding: 18, paddingTop: 14, gap: 12 }} showsVerticalScrollIndicator={false}>
          <Animated.View entering={rise(0, 400)}>
            <ActionCard
              icon="lock-closed-outline"
              label="Segurança"
              title="Modificar senha"
              description="Atualize sua senha de acesso"
              onPress={() => nav.getParent()?.navigate('ForgotPassword')}
            />
          </Animated.View>
          <Animated.View entering={rise(1, 400)}>
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
    </View>
  );
}
