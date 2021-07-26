import { createCss } from '@stitches/react';
import {
  gray,
  mauve,
  slate,
  sage,
  olive,
  sand,
  tomato,
  red,
  crimson,
  pink,
  plum,
  purple,
  violet,
  indigo,
  blue,
  sky,
  mint,
  cyan,
  teal,
  green,
  grass,
  lime,
  yellow,
  amber,
  orange,
  brown,
  bronze,
  gold,
  whiteA,
  blackA,
  grayDark,
  mauveDark,
  slateDark,
  sageDark,
  oliveDark,
  sandDark,
  tomatoDark,
  redDark,
  crimsonDark,
  pinkDark,
  plumDark,
  purpleDark,
  violetDark,
  indigoDark,
  blueDark,
  skyDark,
  mintDark,
  cyanDark,
  tealDark,
  greenDark,
  grassDark,
  limeDark,
  yellowDark,
  amberDark,
  orangeDark,
  brownDark,
  bronzeDark,
  goldDark
} from '@radix-ui/colors';

export const { styled, getCssString, theme } = createCss({
  theme: {
    colors: {
      // background: '#EDF0E9',
      // cream: '#E3E2CC',
      // primary: '#AFBA99',
      // secondary: '#6F876E',
      // tertiary: '#54615A',
      // purple: '#AB969A',
      // black: 'rgba(19, 19, 21, 1)',
      // white: 'rgba(255, 255, 255, 1)',
      // gray: 'rgba(128, 128, 128, 1)',
      // blue: 'rgba(3, 136, 252, 1)',
      // red: 'rgba(249, 16, 74, 1)',
      // yellow: 'rgba(255, 221, 0, 1)',
      // pink: 'rgba(232, 141, 163, 1)',
      // turq: 'rgba(0, 245, 196, 1)',
      // orange: 'rgba(255, 135, 31, 1)',
      ...gray,
      ...mauve,
      ...slate,
      ...sage,
      ...olive,
      ...sand,
      ...tomato,
      ...red,
      ...crimson,
      ...pink,
      ...plum,
      ...purple,
      ...violet,
      ...indigo,
      ...blue,
      ...sky,
      ...mint,
      ...cyan,
      ...teal,
      ...green,
      ...grass,
      ...lime,
      ...yellow,
      ...amber,
      ...orange,
      ...brown,
      ...bronze,
      ...gold,
      ...whiteA,
      ...blackA,

      // Semantic colors
      hiContrast: '$sage12',
      loContrast: '$sage1',
      canvas: 'hsl(0 0% 93%)',
      panel: '$sage1',
      transparentPanel: 'hsl(0 0% 0% / 97%)',
      shadowLight: 'hsl(206 22% 7% / 35%)',
      shadowDark: 'hsl(206 22% 7% / 20%)'
    },
    fonts: {
      body: 'Inter, sans-serif',
      heading: 'Inter, sans-serif',
      mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '20px',
      5: '24px',
      6: '32px',
      7: '40px',
      8: '64px',
      9: '80px',
      10: '96px',
      11: '128px'
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '24px',
      6: '32px',
      7: '48px',
      8: '64px',
      9: '96px',
      10: '128px',
      11: '160px'
    },
    sizes: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '24px',
      6: '32px',
      7: '48px',
      8: '64px',
      9: '96px',
      10: '128px',
      11: '160px'
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      round: '50%',
      pill: '9999px'
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    borderWidths: {},
    borderStyles: {},
    shadows: {},
    zIndices: {},
    transitions: {}
  },
  media: {
    bp1: '(min-width: 0px)',
    bp2: '(min-width: 568px)',
    bp3: '(min-width: 768px)',
    bp4: '(min-width: 1024px)',
    bp5: '(min-width: 1280px)',
    bp6: '(min-width: 1536px)'
  },
  utils: {
    bg: () => value => ({
      backgroundColor: value
    }),
    m: () => value => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value
    }),
    mt: () => value => ({
      marginTop: value
    }),
    mr: () => value => ({
      marginRight: value
    }),
    mb: () => value => ({
      marginBottom: value
    }),
    ml: () => value => ({
      marginLeft: value
    }),
    mx: () => value => ({
      marginLeft: value,
      marginRight: value
    }),
    my: () => value => ({
      marginTop: value,
      marginBottom: value
    }),
    size: () => value => ({
      width: value,
      height: value
    }),
    linearGradient: () => value => ({
      backgroundImage: `linear-gradient(${value})`
    }),
    br: () => value => ({
      borderRadius: value
    }),
    p: () => value => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value
    }),
    pt: () => value => ({
      paddingTop: value
    }),
    pr: () => value => ({
      paddingRight: value
    }),
    pb: () => value => ({
      paddingBottom: value
    }),
    pl: () => value => ({
      paddingLeft: value
    }),
    px: () => value => ({
      paddingLeft: value,
      paddingRight: value
    }),
    py: () => value => ({
      paddingTop: value,
      paddingBottom: value
    })
  }
});

export const darkTheme = theme('dark-theme', {
  colors: {
    ...grayDark,
    ...mauveDark,
    ...slateDark,
    ...sageDark,
    ...oliveDark,
    ...sandDark,
    ...tomatoDark,
    ...redDark,
    ...crimsonDark,
    ...pinkDark,
    ...plumDark,
    ...purpleDark,
    ...violetDark,
    ...indigoDark,
    ...blueDark,
    ...skyDark,
    ...mintDark,
    ...cyanDark,
    ...tealDark,
    ...greenDark,
    ...grassDark,
    ...limeDark,
    ...yellowDark,
    ...amberDark,
    ...orangeDark,
    ...brownDark,
    ...bronzeDark,
    ...goldDark,

    // Semantic colors
    hiContrast: '$sage12',
    loContrast: '$sage1',
    canvas: 'hsl(0 0% 15%)',
    panel: '$sage3',
    transparentPanel: 'hsl(0 100% 100% / 97%)',
    shadowLight: 'hsl(206 22% 7% / 35%)',
    shadowDark: 'hsl(206 22% 7% / 20%)'
  }
});
