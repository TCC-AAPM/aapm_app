import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors, fonts } from '../../theme';

export default function FooterLink({ text, action, onPress }: { text: string; action?: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={10} style={{ alignSelf: 'center', marginTop: 18 }}>
      <Text style={{ fontFamily: fonts.light, fontSize: 10, color: colors.muted }}>
        {text} {action ? <Text style={{ fontFamily: fonts.semi, color: colors.link }}>{action}</Text> : null}
      </Text>
    </Pressable>
  );
}
