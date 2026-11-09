import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import { colors, fonts, radius, shadow } from '../../theme';
import { rise, sheetIn } from '../../animations/motion';
import HomeHeader from '../../components/home/HomeHeader';
import InfoCard from '../../components/home/InfoCard';
import { alertCard, courseCard, lockerCard, miniCards } from '../../data/mock';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <HomeHeader />
      <Animated.View entering={sheetIn} style={{ flex: 1, marginTop: -radius.sheet, backgroundColor: '#fff', borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet, overflow: 'hidden' }}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 22, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
          <Animated.View entering={rise(0, 500)} style={{ backgroundColor: colors.warnBg, borderColor: colors.warnBorder, borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 22 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="warning-outline" size={12} color={colors.warnText} />
              <Text style={{ marginLeft: 6, fontFamily: fonts.medium, fontSize: 9, color: colors.warnText }}>{alertCard.title}</Text>
            </View>
            <Text style={{ marginTop: 4, fontFamily: fonts.light, fontSize: 8, color: '#7C4A12' }}>{alertCard.body}</Text>
            <Text style={{ marginTop: 6, fontFamily: fonts.medium, fontSize: 8, color: '#7C4A12' }}>{alertCard.cta}</Text>
          </Animated.View>
          <Animated.View entering={rise(1, 500)} style={{ marginBottom: 24 }}><InfoCard icon="book-outline" {...courseCard} /></Animated.View>
          <Animated.View entering={rise(2, 500)} style={{ marginBottom: 24 }}><InfoCard icon="albums-outline" {...lockerCard} tagColor="green" /></Animated.View>
          <View style={{ flexDirection: 'row', gap: 20, paddingHorizontal: 6 }}>
            {miniCards.map((m, i) => (
              <Animated.View key={m.label} entering={rise(3 + i, 500)} style={[{ flex: 1, backgroundColor: '#fff', borderRadius: radius.card, padding: 12, minHeight: 100 }, shadow]}>
                <Text style={{ fontFamily: fonts.light, fontSize: 8, color: colors.muted }}>{m.label}</Text>
                <Ionicons name={m.icon} size={18} color={colors.primary} style={{ marginVertical: 6 }} />
                <Text style={{ fontFamily: fonts.medium, fontSize: 9, color: colors.black }}>{m.value}</Text>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
        <LinearGradient pointerEvents="none" colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.08)']} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 70 }} />
      </Animated.View>
    </View>
  );
}
