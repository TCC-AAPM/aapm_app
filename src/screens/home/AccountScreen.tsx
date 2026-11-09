import React from 'react';
import { View, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { colors, radius } from '../../theme';
import { rise, sheetIn } from '../../animations/motion';
import HomeHeader from '../../components/home/HomeHeader';
import InfoCard from '../../components/home/InfoCard';
import { user } from '../../data/mock';

export default function AccountScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <HomeHeader />
      <Animated.View entering={sheetIn} style={{ flex: 1, marginTop: -radius.sheet, backgroundColor: '#fff', borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet }}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 22 }}>
          <Animated.View entering={rise(0, 400)} style={{ marginBottom: 16 }}><InfoCard icon="person-outline" label="Aluno" title={user.fullName} sub={user.classId} /></Animated.View>
          <Animated.View entering={rise(1, 400)}><InfoCard icon="receipt-outline" label="" title="Veja seus dados" tag="ATIVO" tagColor="green" /></Animated.View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
