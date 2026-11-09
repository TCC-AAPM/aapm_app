import React from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, radius } from '../../theme';
import { rise, sheetIn } from '../../animations/motion';
import HomeHeader from '../../components/home/HomeHeader';

export default function ActionsScreen() {
  const nav = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <HomeHeader />
      <Animated.View entering={sheetIn} style={{ flex: 1, marginTop: -radius.sheet, backgroundColor: '#fff', borderTopLeftRadius: radius.sheet, borderTopRightRadius: radius.sheet }}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 28 }}>
          <Animated.View entering={rise(0, 400)}>
            <Pressable onPress={() => nav.reset({ index: 0, routes: [{ name: 'Login' }] })}>
              <Text style={{ fontFamily: fonts.medium, fontSize: 13, color: colors.primary }}>Sair da conta</Text>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
