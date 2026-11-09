import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow } from '../../theme';
import { rise, sheetIn } from '../../animations/motion';
import HomeHeader from '../../components/home/HomeHeader';
import { user } from '../../data/mock';

const profileRows = [
  [
    { label: 'Nome completo', value: user.fullName },
    { label: 'CPF', value: '351.924.868-90' },
  ],
  [
    { label: 'Matrícula', value: '1234' },
    { label: 'Telefone', value: '(11) 9 9887-7655' },
  ],
  [
    { label: 'E-mail', value: 'isabella@email.com' },
    { label: 'Nascimento', value: '05/05/2006' },
  ],
  [
    { label: 'Curso', value: 'Técnico em Desenvolvimento' },
    { label: 'Turma', value: 'DS2A' },
  ],
];

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <View style={[{ flex: 1, minHeight: 58, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 8, backgroundColor: colors.white, borderRadius: 10 }, shadow]}>
      <Text style={{ fontFamily: fonts.light, fontSize: 7, color: colors.muted }}>{label}</Text>
      <Text numberOfLines={2} style={{ marginTop: 3, fontFamily: fonts.medium, fontSize: 9, color: colors.black }}>{value}</Text>
    </View>
  );
}

export default function AccountScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <HomeHeader />
      <Animated.View entering={sheetIn} style={{ flex: 1, marginTop: -radius.sheet, backgroundColor: '#fff', borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet }}>
        <ScrollView contentContainerStyle={{ padding: 18, paddingTop: 16, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          <Animated.View entering={rise(0, 400)} style={[{ flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 10, backgroundColor: colors.white, borderRadius: 14 }, shadow]}>
            <View style={{ width: 34, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.iconBox }}>
              <Ionicons name="person-outline" size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontFamily: fonts.light, fontSize: 7, color: colors.muted }}>Perfil</Text>
              <Text style={{ fontFamily: fonts.semi, fontSize: 11, color: colors.black }}>{user.fullName}</Text>
            </View>
          </Animated.View>

          <Animated.View entering={rise(1, 400)} style={{ alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ color: colors.link, fontFamily: fonts.semi, fontSize: 8, textDecorationLine: 'underline' }}>Alterar dados cadastrais</Text>
          </Animated.View>

          {profileRows.map((row, index) => (
            <Animated.View key={row[0].label} entering={rise(index + 2, 400)} style={{ flexDirection: 'row', gap: 9, marginBottom: 9 }}>
              {row.map((field) => <ProfileField key={field.label} {...field} />)}
            </Animated.View>
          ))}

          <Animated.View entering={rise(6, 400)} style={{ marginBottom: 9 }}>
            <ProfileField label="Pagamento" value="A" />
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
