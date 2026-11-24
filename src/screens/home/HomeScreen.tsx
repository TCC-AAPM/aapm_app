import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { colors, fonts, radius, shadow } from '../../theme';
import { rise, sheetIn } from '../../animations/motion';
import HomeHeader from '../../components/home/HomeHeader';
import InfoCard from '../../components/home/InfoCard';
import { alertCard } from '../../data/mock';
import { useAuth } from '../../context/AuthContext';
import { api, pick, errMsg, BASE_URL } from '../../services/api';
import { fromISO } from '../../utils/masks';

const daysLeft = (iso?: string) => (iso ? Math.ceil((new Date(iso.slice(0, 10) + 'T23:59:59').getTime() - Date.now()) / 86400000) : null);

export default function HomeScreen() {
  const { user, refresh } = useAuth();
  const [pend, setPend] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadTerms = useCallback(async () => {
    try { const d = await api<any>('/Termo/verificar-termos-aceito'); setPend(d?.pendentes ?? d?.termosPendentes ?? []); } catch {}
  }, []);
  useEffect(() => { loadTerms(); }, [loadTerms]);
  const onRefresh = async () => { setRefreshing(true); await Promise.all([refresh().catch(() => {}), loadTerms()]); setRefreshing(false); };

  const accept = async () => {
    try {
      for (const t of pend) await api('/Termo/aceitar-novos-termos', { method: 'POST', body: { idTermo: pick(t, 'idTermo', 'id') } });
      setPend([]);
    } catch (e) { Alert.alert('Não foi possível aceitar', errMsg(e)); }
  };
  const reviewTerms = () => Alert.alert('Termos pendentes', 'Leia o termo antes de aceitar.', [
    { text: 'Ler termo', onPress: () => Linking.openURL(`${BASE_URL}/Termo/obter-pdf?referencia=${pick(pend[0], 'referencia') ?? 'S'}`) },
    { text: 'Aceitar', onPress: accept },
    { text: 'Cancelar', style: 'cancel' },
  ]);

  const dias = daysLeft(user?.vencimento);
  const expired = dias != null && dias < 0;
  const course = { label: 'Curso / Turma', title: user?.curso || '—', sub: user?.turma || undefined, tag: 'ATIVO' };
  const locker = user?.armario
    ? { label: 'Armário', title: `Armário nº ${user.armario}`, tag: expired ? 'VENCIDO' : 'ATIVO',
        warn: dias == null ? undefined : expired ? `Vencido há ${-dias} dias (${fromISO(user.vencimento)})` : `Vence em ${dias} dias (${fromISO(user.vencimento)})` }
    : { label: 'Armário', title: 'Nenhum armário reservado' };
  const mini = [
    { label: 'Pagamento', icon: 'card-outline' as const, value: user?.pagamento || '—' },
    { label: 'Vencimento', icon: 'calendar-outline' as const, value: fromISO(user?.vencimento) || '—' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.page }}>
      <HomeHeader />
      <Animated.View entering={sheetIn} style={{ flex: 1, marginTop: -radius.sheet, backgroundColor: colors.page, borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet, overflow: 'hidden' }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 26, paddingBottom: 48 }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}>
          <Animated.View entering={rise(0, 240)} style={{ marginBottom: 18 }}>
            <Text style={{ fontFamily: fonts.semi, fontSize: 21, color: colors.black }}>Resumo da sua conta</Text>
            <Text style={{ marginTop: 3, fontFamily: fonts.regular, fontSize: 13, color: colors.muted }}>Confira seus serviços e pagamentos</Text>
          </Animated.View>
          {pend.length > 0 && (
          <Animated.View entering={rise(1, 240)} style={{ backgroundColor: '#FFF8E9', borderColor: '#F4D58D', borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 18 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="alert-circle-outline" size={20} color={colors.warnText} />
              <Text style={{ marginLeft: 8, fontFamily: fonts.semi, fontSize: 14, color: colors.warnText }}>{alertCard.title}</Text>
            </View>
            <Text style={{ marginTop: 7, fontFamily: fonts.regular, fontSize: 13, lineHeight: 19, color: '#75551A' }}>{alertCard.body}</Text>
            <Text onPress={reviewTerms} accessibilityRole="button" style={{ marginTop: 12, fontFamily: fonts.semi, fontSize: 14, color: colors.primary }}>{alertCard.cta}  ›</Text>
          </Animated.View>)}
          <Animated.View entering={rise(2, 240)} style={{ marginBottom: 14 }}><InfoCard icon="book-outline" {...course} /></Animated.View>
          <Animated.View entering={rise(3, 240)} style={{ marginBottom: 24 }}><InfoCard icon="albums-outline" {...locker} tagColor={expired ? 'blue' : 'green'} /></Animated.View>
          <Animated.Text entering={rise(4, 240)} style={{ fontFamily: fonts.semi, fontSize: 17, color: colors.black, marginBottom: 12 }}>Financeiro</Animated.Text>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {mini.map((m, i) => (
              <Animated.View key={m.label} entering={rise(5 + i, 240)} style={[{ flex: 1, backgroundColor: '#fff', borderRadius: radius.card, padding: 16, minHeight: 126, borderWidth: 1, borderColor: '#EDF1F7' }, shadow]}>
                <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: colors.softBlue, alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Ionicons name={m.icon} size={19} color={colors.primary} /></View>
                <Text style={{ fontFamily: fonts.medium, fontSize: 12, color: colors.muted }}>{m.label}</Text>
                <Text numberOfLines={2} style={{ marginTop: 4, fontFamily: fonts.semi, fontSize: 15, lineHeight: 21, color: colors.black }}>{m.value}</Text>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
