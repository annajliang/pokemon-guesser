type Theme = {
  [key: string]: any;
};

export const theme: Theme = {
  borders: {
    borderRadius: '2px',
    borderWidth: '1px',
    borderColor: 'rgba(36, 55, 70, .2)',
  },
  colors: {
    midBlue: '#3664AE',
    white: '#FFFFFF',
    heavyMetal: '#31302c',
    supernova: '#FFCB08',
    gunsmoke: '#858585',
    cloud: '#C4C4C4',
    eggshell: '#EEE9DD',
  },
  fonts: {
    pokemon: `'Pokemon', 'sans-serif'`,
    pressStart: `'Press Start 2P', sans-serif`,
    sen: `'Sen', sans-serif`,
  },
  fontWeights: {
    regular: '400',
    semibold: '600',
  },
  mediaQuery: {
    tablet: '768px',
    desktop: '1025px',
    largeDesktop: '1440px',
  },
  spacing: {
    xxxs: '0.125rem',
    xxs: '0.25rem',
    xs: '0.5rem',
    s: '0.75rem',
    m: '1rem',
    l: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  letterSpacing: {
    s: '1px',
    m: '2px',
  },
  pageMargin: ['20px', '75px', '75px'],
  transitions: {
    button: 'all 0.25s ease-in-out',
  },
};
