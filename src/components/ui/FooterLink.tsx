import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors, fonts } from '../../theme';

export default function FooterLink({ text, action, onPress }: { text: string; action?: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={12} accessibilityRole="button" style={{ alignSelf: 'center', marginTop: 20, minHeight: 44, justifyContent: 'center' }}>
      <Text style={{ fontFamily: fonts.regular, fontSize: 13, color: colors.muted }}>
        {text} {action ? <Text style={{ fontFamily: fonts.semi, color: colors.link }}>{action}</Text> : null}
      </Text>
    </Pressable>
  );
}
