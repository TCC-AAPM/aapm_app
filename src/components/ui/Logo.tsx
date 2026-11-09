import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import logoImage from '../../../assets/images/logo.png';

/** 👉 Substitua o arquivo assets/images/logo.png pela sua logo (PNG transparente, branca). */
export default function Logo({ size = 64, style }: { size?: number; style?: StyleProp<ImageStyle> }) {
  return <Image source={logoImage} style={[{ width: size, height: size }, style]} resizeMode="contain" />;
}
