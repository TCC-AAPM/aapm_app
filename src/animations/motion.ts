import { Easing, FadeInDown, FadeIn, SlideInDown } from 'react-native-reanimated';

/** Curvas estilo GSAP: expo.out / power4.out / power3.inOut */
export const ease = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  outQuart: Easing.bezier(0.25, 1, 0.5, 1),
  inOutCubic: Easing.bezier(0.65, 0, 0.35, 1),
};

/** Entrada em cascata: movimento curto e leve para manter a leitura fluida. */
export const rise = (i = 0, base = 350) =>
  FadeInDown.delay(base + i * 65).duration(520).easing(ease.outExpo)
    .withInitialValues({ opacity: 0, transform: [{ translateY: 20 }] });

export const fade = (delay = 0) => FadeIn.delay(delay).duration(450).easing(ease.outQuart);

/** Sheet branco sobe de baixo com desaceleração longa */
export const sheetIn = SlideInDown.delay(60).duration(650).easing(ease.outExpo);
