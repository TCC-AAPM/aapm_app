# AAPM App (Expo + React Native)

```
npm install
npx expo install --fix
npx expo start
```

## Onde colocar suas imagens
- `assets/images/logo.png` → sua logo (PNG transparente/branca). Usada por `components/ui/Logo.tsx` em todas as telas.
- `assets/images/hero.jpg` → foto da tela de boas-vindas.

## Arquitetura
```
App.tsx                      fontes + providers
src/theme/                   cores, fontes, raios, sombras (única fonte de verdade)
src/animations/motion.ts     curvas (expo.out…) e presets de entrada (rise, sheetIn, fade)
src/components/ui/           AuthLayout, AppInput, AppButton, Checkbox, RevealTitle, Rise, Logo, FooterLink
src/components/home/         HomeHeader, InfoCard
src/navigation/              RootNavigator (stack), MainTabs (tab bar custom), types
src/screens/{splash,onboarding,auth,hire,home}/
src/utils/masks.ts           máscaras (data, CPF, telefone) + idade
src/data/mock.ts             textos/dados mockados da Home
```
