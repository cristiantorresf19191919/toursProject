'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark') => {
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#0F6B6F',
        light: '#3A9498',
        dark: '#0A5256',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#C49A4A',
        light: '#D4B06E',
        dark: '#A67F38',
        contrastText: '#1A1A1A',
      },
      ...(mode === 'light'
        ? {
            background: {
              default: '#F3F1EC',
              paper: '#FDFCF9',
            },
            text: {
              primary: '#1E2630',
              secondary: '#5A6270',
            },
            divider: 'rgba(30, 38, 48, 0.08)',
          }
        : {
            background: {
              default: '#12161C',
              paper: '#1A2028',
            },
            text: {
              primary: '#E6EAEF',
              secondary: '#9BA3AF',
            },
            divider: 'rgba(255, 255, 255, 0.08)',
          }),
      info: {
        main: '#3B82F6',
      },
      success: {
        main: '#0D9B72',
      },
      warning: {
        main: '#D4922C',
      },
      error: {
        main: '#DC5A5A',
      },
    },
    typography: {
      fontFamily: 'var(--font-dm-sans), "DM Sans", system-ui, sans-serif',
      h1: {
        fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
        fontWeight: 600,
        letterSpacing: '-0.015em',
      },
      h3: {
        fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 500,
        lineHeight: 1.65,
      },
      body1: {
        lineHeight: 1.75,
        fontSize: '1.0625rem',
      },
      body2: {
        lineHeight: 1.7,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '11px 26px',
            fontSize: '0.9375rem',
            transition: 'background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease',
          },
        },
        variants: [
          {
            props: { variant: 'contained', color: 'primary' },
            style: {
              background: 'linear-gradient(135deg, #0F6B6F 0%, #2A8A8E 100%)',
              boxShadow: '0 2px 12px rgba(15, 107, 111, 0.22)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0A5256 0%, #0F6B6F 100%)',
                boxShadow: '0 4px 18px rgba(15, 107, 111, 0.28)',
              },
            },
          },
          {
            props: { variant: 'contained', color: 'secondary' },
            style: {
              background: 'linear-gradient(135deg, #C49A4A 0%, #D4B06E 100%)',
              boxShadow: '0 2px 12px rgba(196, 154, 74, 0.2)',
              '&:hover': {
                background: 'linear-gradient(135deg, #A67F38 0%, #C49A4A 100%)',
                boxShadow: '0 4px 18px rgba(196, 154, 74, 0.26)',
              },
            },
          },
          {
            props: { variant: 'outlined' },
            style: {
              borderWidth: 1.5,
              '&:hover': {
                borderWidth: 1.5,
              },
            },
          },
        ],
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            transition: 'box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease',
            ...(mode === 'light'
              ? {
                  boxShadow: '0 2px 16px rgba(30, 38, 48, 0.06)',
                  border: '1px solid rgba(30, 38, 48, 0.06)',
                  '&:hover': {
                    boxShadow: '0 10px 32px rgba(30, 38, 48, 0.1)',
                    transform: 'translateY(-4px)',
                  },
                }
              : {
                  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  '&:hover': {
                    boxShadow: '0 10px 36px rgba(0, 0, 0, 0.35)',
                    transform: 'translateY(-4px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  },
                }),
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            fontWeight: 500,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: 'clamp(20px, 5vw, 48px)',
            paddingRight: 'clamp(20px, 5vw, 48px)',
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};

export default getTheme;
