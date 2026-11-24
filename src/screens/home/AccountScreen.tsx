import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow } from '../../theme';
import { rise, sheetIn } from '../../animations/motion';
import HomeHeader from '../../components/home/HomeHeader';
import { useAuth } from '../../context/AuthContext';
import { Profile } from '../../services/profile';
import { fromISO, maskCPF, maskPhone } from '../../utils/masks';

type Field = { label: string; value: string };
const buildGroups = (u: Profile | null) => [
  { title: 'Dados pessoais', icon: 'person-outline' as const, fields: [
    { label: 'Nome completo', value: u?.nome ?? '' },
    { label: 'Nome social', value: u?.nomeSocial ?? '' },
    { label: 'CPF', value: maskCPF(u?.cpf ?? '') },
    { label: 'Data de nascimento', value: fromISO(u?.dataNasc) },
  ] },
  { title: 'Contato', icon: 'chatbubble-ellipses-outline' as const, fields: [
    { label: 'E-mail', value: u?.email ?? '' },
    { label: 'Telefone', value: maskPhone(u?.telefone ?? '') },
  ] },
  { title: 'Dados escolares', icon: 'school-outline' as const, fields: [
    { label: 'Matrícula', value: u?.matricula ?? '' },
    { label: 'Curso', value: u?.curso ?? '' },
    { label: 'Turma', value: u?.turma ?? '' },
  ] },
  { title: 'Pagamento', icon: 'card-outline' as const, fields: [
    { label: 'Situação', value: u?.pagamento ?? '' },
  ] },
];

function ProfileField({ label, value, last }: Field & { last: boolean }) {
  return (
    <View style={{ minHeight: 66, paddingVertical: 12, borderBottomWidth: last ? 0 : 1, borderBottomColor: '#EDF1F7', justifyContent: 'center' }}>
      <Text style={{ fontFamily: fonts.medium, fontSize: 12, color: colors.muted, letterSpacing: 0.2 }}>{label}</Text>
      <Text selectable numberOfLines={3} style={{ marginTop: 3, fontFamily: fonts.medium, fontSize: 15, lineHeight: 22, color: colors.black }}>{value || '—'}</Text>
    </View>
  );
}

export default function AccountScreen() {
  const { user } = useAuth();
  const groups = buildGroups(user);
  const initials = (user?.nomeSocial || user?.nome || 'A').trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

  return (
    <View style={{ flex: 1, backgroundColor: colors.page }}>
      <HomeHeader />
      <Animated.View entering={sheetIn} style={{ flex: 1, marginTop: -radius.sheet, backgroundColor: colors.page, borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <Animated.View entering={rise(0, 180)} style={[{ flexDirection: 'row', alignItems: 'center', padding: 18, marginBottom: 24, backgroundColor: colors.white, borderRadius: radius.card, borderWidth: 1, borderColor: '#EDF1F7' }, shadow]}>
            <View style={{ width: 58, height: 58, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.softBlue }}>
              <Text style={{ fontFamily: fonts.semi, fontSize: 21, color: colors.primary }}>{initials}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={{ fontFamily: fonts.medium, fontSize: 12, color: colors.muted }}>MEU PERFIL</Text>
              <Text numberOfLines={2} style={{ marginTop: 2, fontFamily: fonts.semi, fontSize: 18, lineHeight: 24, color: colors.black }}>{user?.nomeSocial || user?.nome || 'Aluno AAPM'}</Text>
              {!!user?.email && <Text numberOfLines={1} style={{ marginTop: 2, fontFamily: fonts.regular, fontSize: 13, color: colors.inkSoft }}>{user.email}</Text>}
            </View>
            <Ionicons name="shield-checkmark" size={22} color="#3D9B75" />
          </Animated.View>

          {groups.map((group, index) => (
            <Animated.View key={group.title} entering={rise(index + 1, 180)} style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 2 }}>
                <View style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: colors.softBlue, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name={group.icon} size={16} color={colors.primary} />
                </View>
                <Text style={{ marginLeft: 9, fontFamily: fonts.semi, fontSize: 16, color: colors.black }}>{group.title}</Text>
              </View>
              <View style={[{ paddingHorizontal: 16, backgroundColor: colors.white, borderRadius: 18, borderWidth: 1, borderColor: '#EDF1F7' }, shadow]}>
                {group.fields.map((field, fieldIndex) => <ProfileField key={field.label} {...field} last={fieldIndex === group.fields.length - 1} />)}
              </View>
            </Animated.View>
          ))}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.muted} />
            <Text style={{ marginLeft: 6, fontFamily: fonts.regular, fontSize: 12, color: colors.muted }}>Seus dados são protegidos pela AAPM</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
