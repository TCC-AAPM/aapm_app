import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow } from '../../theme';

type Props = { icon: keyof typeof Ionicons.glyphMap; label: string; title: string; sub?: string; tag?: string; tagColor?: 'blue' | 'green'; warn?: string };

export default function InfoCard({ icon, label, title, sub, tag, tagColor = 'blue', warn }: Props) {
  return (
    <View style={[{ backgroundColor: '#fff', borderRadius: radius.card, padding: 14, flexDirection: 'row' }, shadow]}>
      <View style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: colors.iconBox, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ fontFamily: fonts.light, fontSize: 8, color: colors.muted }}>{label}</Text>
        <Text style={{ fontFamily: fonts.semi, fontSize: 13, color: colors.black }}>{title}</Text>
        {sub ? <Text style={{ fontFamily: fonts.light, fontSize: 10, color: colors.black, marginTop: 4 }}>{sub}</Text> : null}
        {warn ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Ionicons name="warning-outline" size={12} color={colors.warnIcon} />
            <Text style={{ marginLeft: 4, fontFamily: fonts.light, fontSize: 8.5, color: colors.warnIcon }}>{warn}</Text>
          </View>
        ) : null}
      </View>
      {tag ? (
        <View style={{ position: 'absolute', top: 10, right: 12, paddingHorizontal: 8, paddingVertical: 1, borderRadius: 4, backgroundColor: tagColor === 'blue' ? colors.tagBlueBg : colors.tagGreenBg }}>
          <Text style={{ fontFamily: fonts.medium, fontSize: 7, color: tagColor === 'blue' ? colors.primary : colors.tagGreenText }}>{tag}</Text>
        </View>
      ) : null}
    </View>
  );
}
