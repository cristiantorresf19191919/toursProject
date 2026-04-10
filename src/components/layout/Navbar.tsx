'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  Container,
  Fab,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import WhatsApp from '@mui/icons-material/WhatsApp';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useThemeMode } from '@/theme/ThemeRegistry';
import { useLanguage, type Locale } from '@/contexts/LanguageContext';
import { whatsappUrl } from '@/lib/siteConfig';

const NAV_WHATSAPP_INTRO =
  'Hola! Me interesa conocer mas sobre las experiencias en Cartagena. Podrian darme informacion?';

type NavItem = {
  labelKey: string;
  href: string;
  external?: boolean;
  /** Texto más corto en la barra desktop; el completo va en tooltip y en el menú móvil */
  desktopShortKey?: string;
};

const navItems: NavItem[] = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.experiences', href: '/#experiencias' },
  { labelKey: 'nav.beachClubs', href: '/#beach-clubs' },
  { labelKey: 'nav.diving', href: '/#buceo' },
  { labelKey: 'nav.accommodation', href: '/#alojamiento' },
  {
    labelKey: 'nav.privateServices',
    desktopShortKey: 'nav.privateServicesShort',
    href: '/#servicios-privados',
  },
  { labelKey: 'nav.faq', href: '/#faq' },
  { labelKey: 'nav.contact', href: '/contacto', external: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();
  const { locale, setLocale, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (href: string, external?: boolean) => {
    setMobileOpen(false);
    if (external) {
      router.push(href);
      return;
    }
    if (href === '/') {
      router.push('/');
      return;
    }
    if (href.startsWith('/#')) {
      const hashOnly = href.slice(1);
      if (isHome) {
        const el = document.querySelector(hashOnly);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof window !== 'undefined') {
        window.location.assign(href);
      }
      return;
    }
    router.push(href);
  };

  const handleLocale = (_: React.MouseEvent<HTMLElement>, value: Locale | null) => {
    if (value) setLocale(value);
  };

  const fabMsg =
    locale === 'en'
      ? 'Hello! I would like information about tours in Cartagena.'
      : locale === 'fr'
        ? 'Bonjour ! Je souhaite des informations sur les excursions à Carthagène.'
        : 'Hola! Me interesa conocer mas sobre las experiencias en Cartagena. Podrian darme informacion?';

  const onHero = !scrolled;
  const navMuted = scrolled ? theme.palette.text.primary : '#FFFFFF';
  const navHoverBg =
    scrolled && mode === 'dark'
      ? 'rgba(255,255,255,0.1)'
      : scrolled
        ? 'rgba(0,0,0,0.07)'
        : 'rgba(255,255,255,0.14)';

  const navLinkSx = {
    color: navMuted,
    fontSize: { lg: '0.9375rem' },
    fontWeight: 600,
    letterSpacing: '0.02em',
    px: { lg: 1.5 },
    py: { lg: 1.1 },
    minWidth: 0,
    borderRadius: 2,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    textTransform: 'none',
    ...(onHero
      ? {
          textShadow: '0 1px 2px rgba(0,0,0,0.55)',
        }
      : {}),
    '&:hover': {
      background: navHoverBg,
    },
  } as const;

  return (
    <>
      <AppBar
        component={motion.div}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        position="fixed"
        elevation={0}
        sx={{
          pt: 'max(0px, env(safe-area-inset-top))',
          background: scrolled
            ? mode === 'dark'
              ? 'rgba(18, 22, 28, 0.96)'
              : 'rgba(253, 252, 249, 0.98)'
            : 'rgba(10, 14, 20, 0.86)',
          backdropFilter: 'blur(18px) saturate(150%)',
          WebkitBackdropFilter: 'blur(18px) saturate(150%)',
          borderBottom: scrolled
            ? `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
            : '1px solid rgba(255,255,255,0.1)',
          boxShadow: onHero ? '0 4px 24px rgba(0,0,0,0.2)' : 'none',
          transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
          zIndex: 1300,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 68, lg: 80 },
              py: { xs: 1.25, lg: 1.5 },
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: { xs: 1, lg: 2 },
              flexWrap: 'nowrap',
            }}
          >
            {/* Logo — sólido sobre el hero para evitar recortes con background-clip */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                textDecoration: 'none',
                flexShrink: 0,
                mr: { lg: 1 },
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  fontSize: { xs: '1.35rem', md: '1.5rem' },
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  ...(onHero
                    ? {
                        color: '#FFFFFF',
                        textShadow: '0 2px 16px rgba(0,0,0,0.45)',
                      }
                    : {
                        background: 'linear-gradient(135deg, #0F6B6F, #3A9498, #C49A4A)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent',
                      }),
                }}
              >
                Cartagena
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 300,
                  fontSize: { xs: '1.35rem', md: '1.5rem' },
                  ml: 0.75,
                  lineHeight: 1,
                  color: onHero ? '#FFFFFF' : theme.palette.text.primary,
                  textShadow: onHero ? '0 2px 16px rgba(0,0,0,0.45)' : 'none',
                }}
              >
                Tours
              </Typography>
            </Box>

            {/* Enlaces centrales — scroll horizontal si no caben */}
            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' },
                flex: 1,
                minWidth: 0,
                alignItems: 'center',
                justifyContent: 'center',
                gap: { lg: 0.5, xl: 1 },
                overflowX: 'auto',
                overflowY: 'hidden',
                py: 0.5,
                mx: { lg: 1.5, xl: 2 },
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {navItems.map((item) => {
                const short = item.desktopShortKey;
                const desktopLabel = short ? t(short) : t(item.labelKey);
                const fullLabel = t(item.labelKey);
                const btn = (
                  <Button
                    onClick={() => goTo(item.href, item.external)}
                    sx={navLinkSx}
                  >
                    {desktopLabel}
                  </Button>
                );
                return short ? (
                  <Tooltip key={item.labelKey} title={fullLabel} arrow placement="bottom" enterDelay={400}>
                    {btn}
                  </Tooltip>
                ) : (
                  <React.Fragment key={item.labelKey}>{btn}</React.Fragment>
                );
              })}
            </Box>

            {/* Acciones derecha */}
            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' },
                alignItems: 'center',
                gap: 1,
                flexShrink: 0,
              }}
            >
              <ToggleButtonGroup
                exclusive
                value={locale}
                onChange={handleLocale}
                size="small"
                aria-label="Idioma"
                sx={{
                  bgcolor: onHero ? 'rgba(255,255,255,0.06)' : 'transparent',
                  borderRadius: 2,
                  p: 0.25,
                  '& .MuiToggleButton-root': {
                    px: 1.2,
                    py: 0.5,
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: navMuted,
                    borderColor: onHero ? 'rgba(255,255,255,0.25)' : theme.palette.divider,
                    '&.Mui-selected': {
                      backgroundColor: onHero
                        ? 'rgba(255,255,255,0.2)'
                        : theme.palette.action.selected,
                      color: navMuted,
                    },
                  },
                }}
              >
                <ToggleButton value="es">ES</ToggleButton>
                <ToggleButton value="en">EN</ToggleButton>
                <ToggleButton value="fr">FR</ToggleButton>
              </ToggleButtonGroup>

              <IconButton
                onClick={toggleTheme}
                aria-label={mode === 'dark' ? 'Modo claro' : 'Modo oscuro'}
                sx={{
                  color: navMuted,
                  border: '1px solid',
                  borderColor: onHero ? 'rgba(255,255,255,0.35)' : 'divider',
                  borderRadius: 2,
                }}
              >
                {mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              </IconButton>

              <Button
                variant="contained"
                startIcon={<WhatsApp />}
                href={whatsappUrl(NAV_WHATSAPP_INTRO)}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.9rem',
                  py: 1.15,
                  px: 2.25,
                  whiteSpace: 'nowrap',
                  fontWeight: 700,
                  textTransform: 'none',
                  borderRadius: 2.5,
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  ...(onHero
                    ? {
                        bgcolor: '#1FA855',
                        '&:hover': {
                          bgcolor: '#22C55E',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                        },
                      }
                    : {
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' },
                      }),
                }}
              >
                {t('nav.book')}
              </Button>
            </Box>

            <Box
              sx={{
                display: { xs: 'flex', lg: 'none' },
                alignItems: 'center',
                gap: 0.75,
                flexShrink: 0,
                ml: 'auto',
              }}
            >
              <ToggleButtonGroup
                exclusive
                value={locale}
                onChange={handleLocale}
                size="small"
                aria-label="Idioma"
                sx={{
                  '& .MuiToggleButton-root': {
                    px: 0.85,
                    py: 0.35,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: navMuted,
                    borderColor: onHero ? 'rgba(255,255,255,0.4)' : theme.palette.divider,
                  },
                }}
              >
                <ToggleButton value="es">ES</ToggleButton>
                <ToggleButton value="en">EN</ToggleButton>
                <ToggleButton value="fr">FR</ToggleButton>
              </ToggleButtonGroup>
              <IconButton onClick={toggleTheme} sx={{ color: navMuted }} aria-label="Tema">
                {mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              </IconButton>
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: navMuted }} aria-label="Menú">
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: '100%',
              maxWidth: 400,
              background: theme.palette.background.default,
              pt: 2,
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Playfair Display", serif',
              background: 'linear-gradient(135deg, #0F6B6F, #C49A4A)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Cartagena Tours
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item, i) => (
            <ListItem key={item.labelKey} disablePadding>
              <ListItemButton
                onClick={() => goTo(item.href, item.external)}
                component={motion.div}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                sx={{ py: 2, px: 3 }}
              >
                <ListItemText
                  primary={t(item.labelKey)}
                  slotProps={{
                    primary: { sx: { fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.35 } },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ px: 3, mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<WhatsApp />}
            href={whatsappUrl(NAV_WHATSAPP_INTRO)}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
          >
            {t('nav.bookWhatsapp')}
          </Button>
        </Box>
      </Drawer>

      <Tooltip title={t('fab.whatsapp')} placement="left">
        <Fab
          component={motion.a}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          href={whatsappUrl(fabMsg)}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1200,
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: '#fff',
            width: 60,
            height: 60,
            boxShadow: '0 3px 16px rgba(37, 211, 102, 0.28)',
            '&:hover': {
              background: 'linear-gradient(135deg, #128C7E, #075E54)',
              boxShadow: '0 5px 22px rgba(37, 211, 102, 0.38)',
            },
          }}
        >
          <WhatsApp sx={{ fontSize: 30 }} />
        </Fab>
      </Tooltip>
    </>
  );
}
