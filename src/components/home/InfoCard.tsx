import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, shadow } from '../../theme';

type Props = { icon: keyof typeof Ionicons.glyphMap; label: string; title: string; sub?: string; tag?: string; tagColor?: 'blue' | 'green'; warn?: string };

export default function InfoCard({ icon, label, title, sub, tag, tagColor = 'blue', warn }: Props) {
  return (
    <View style={[{ backgroundColor: '#fff', borderRadius: radius.card, padding: 18, flexDirection: 'row', alignItems: 'flex-start', borderWidth: 1, borderColor: '#EDF1F7' }, shadow]}>
      <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: colors.softBlue, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <View style={{ flex: 1, minWidth: 0, marginLeft: 14, paddingRight: tag ? 48 : 0 }}>
        <Text style={{ fontFamily: fonts.medium, fontSize: 12, color: colors.muted, letterSpacing: 0.2 }}>{label}</Text>
        <Text style={{ fontFamily: fonts.semi, fontSize: 17, lineHeight: 24, color: colors.black, marginTop: 3 }}>{title}</Text>
        {sub ? <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: colors.inkSoft, marginTop: 4 }}>{sub}</Text> : null}
        {warn ? (
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 12 }}>
            <Ionicons name="time-outline" size={16} color={colors.warnText} style={{ marginTop: 1 }} />
            <Text style={{ flex: 1, marginLeft: 6, fontFamily: fonts.medium, fontSize: 12, lineHeight: 18, color: colors.warnText }}>{warn}</Text>
          </View>
        ) : null}
      </View>
      {tag ? (
        <View style={{ position: 'absolute', top: 15, right: 15, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, backgroundColor: tagColor === 'blue' ? colors.tagBlueBg : colors.tagGreenBg }}>
          <Text style={{ fontFamily: fonts.semi, fontSize: 10, color: tagColor === 'blue' ? colors.primary : colors.tagGreenText }}>{tag}</Text>
        </View>
      ) : null}
    </View>
  );
}
