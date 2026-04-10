'use client';

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import WhatsApp from '@mui/icons-material/WhatsApp';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import LocationOn from '@mui/icons-material/LocationOn';
import Image from 'next/image';
import { whatsappUrl } from '@/lib/siteConfig';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t, locale } = useLanguage();
  const scrollToExperiences = () => {
    const el = document.querySelector('#experiencias');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        '@supports (min-height: 100dvh)': {
          minHeight: '100dvh',
        },
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/images/hero/beach-club.png"
          alt="Cartagena y el Caribe colombiano"
          fill
          style={{ objectFit: 'cover', objectPosition: '42% center' }}
          priority
          quality={88}
          sizes="100vw"
        />
        {/* Base: más oscuro a la izquierda (árbol / texto) */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: {
              xs: 'linear-gradient(180deg, rgba(6,8,12,0.88) 0%, rgba(6,8,12,0.72) 50%, rgba(8,10,14,0.85) 100%)',
              md: 'linear-gradient(100deg, rgba(5,7,11,0.82) 0%, rgba(5,7,11,0.68) 26%, rgba(8,10,14,0.32) 55%, rgba(8,10,14,0.12) 78%, rgba(8,10,14,0.04) 100%)',
            },
          }}
        />
        {/* Refuerzo local bajo el bloque de copy (árboles) */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 95% 90% at 12% 48%, rgba(4,6,10,0.38) 0%, transparent 52%)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(10,12,18,0.92) 0%, transparent 32%)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          py: { xs: 4, md: 2 },
          pt: { xs: 'clamp(6.25rem, 15vh, 7.5rem)', md: 'clamp(6rem, 14vh, 7.25rem)' },
          pb: { xs: 10, md: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: '100%', md: 'min(520px, 48vw)' },
            width: '100%',
            p: { xs: 2.25, sm: 2.75, md: 3 },
            borderRadius: { xs: 2.5, md: 3 },
            background: 'rgba(8, 12, 18, 0.36)',
            backdropFilter: 'blur(14px) saturate(120%)',
            WebkitBackdropFilter: 'blur(14px) saturate(120%)',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocationOn sx={{ fontSize: 22, color: '#E8C97D' }} />
              <Typography
                component="span"
                sx={{
                  color: 'rgba(255,255,255,0.92)',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                {t('hero.location')}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 56,
                height: 3,
                borderRadius: 2,
                background: 'linear-gradient(90deg, #D4B06E, #4ECDC4)',
                mb: 2.25,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Typography
              variant="h1"
              component="div"
              sx={{
                fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'block',
                  color: '#FFFFFF',
                  fontSize: { xs: '2.35rem', sm: '2.85rem', md: '3.15rem', lg: '3.45rem' },
                  textShadow: '0 1px 3px rgba(0,0,0,0.45)',
                }}
              >
                {t('hero.title1')}
              </Box>
              {/* Color sólido claro: sin gradiente + drop-shadow (generaba halo negro ilegible) */}
              <Box
                component="span"
                sx={{
                  display: 'block',
                  mt: 0.75,
                  color: '#F4E8C9',
                  fontSize: { xs: '2.65rem', sm: '3.25rem', md: '3.65rem', lg: '4rem' },
                  textShadow: '0 1px 2px rgba(0,0,0,0.25)',
                }}
              >
                {t('hero.title2')}
              </Box>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.94)',
                fontWeight: 400,
                lineHeight: 1.75,
                mb: { xs: 3.5, md: 4 },
                maxWidth: 500,
                fontSize: { xs: '1.0625rem', sm: '1.125rem' },
                textShadow: '0 1px 2px rgba(0,0,0,0.35)',
              }}
            >
              {t('hero.subtitle')}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: { xs: 'stretch', sm: 'center' },
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={scrollToExperiences}
                sx={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  py: 1.85,
                  px: { xs: 3, sm: 4 },
                  borderRadius: '14px',
                  minHeight: 56,
                  textTransform: 'none',
                  color: '#1a1510',
                  backgroundColor: '#E5CF96',
                  backgroundImage: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                  '&:hover': {
                    backgroundColor: '#EDD9A8',
                    backgroundImage: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.22)',
                  },
                }}
              >
                {t('hero.cta')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<WhatsApp />}
                href={whatsappUrl(
                  locale === 'en'
                    ? 'Hello! I\'m interested in learning about experiences in Cartagena. Could you give me information?'
                    : locale === 'fr'
                      ? 'Bonjour ! Je souhaite en savoir plus sur les expériences à Carthagène. Pourriez-vous me donner des informations ?'
                      : 'Hola! Me interesa conocer mas sobre las experiencias en Cartagena. Podrian darme informacion?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  py: 1.85,
                  px: { xs: 3, sm: 3.5 },
                  borderRadius: '14px',
                  minHeight: 56,
                  textTransform: 'none',
                  color: '#fff',
                  borderWidth: 2,
                  borderColor: 'rgba(255,255,255,0.45)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: '#25D366',
                    backgroundColor: 'rgba(37, 211, 102, 0.15)',
                    color: '#E8FFF0',
                  },
                }}
              >
                WhatsApp
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Container>

      <Box
        component={motion.button}
        type="button"
        aria-label="Ver más contenido"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        onClick={scrollToExperiences}
        sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 32 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          border: 'none',
          background: 'rgba(8,12,18,0.55)',
          backdropFilter: 'blur(12px)',
          borderRadius: 999,
          px: 2.75,
          py: 1.35,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.2)',
          transition: 'background 0.2s, border-color 0.2s',
          fontFamily: 'inherit',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          '&:hover': {
            background: 'rgba(8,12,18,0.7)',
            borderColor: 'rgba(255,255,255,0.35)',
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '0.22em',
            fontSize: '0.68rem',
            fontWeight: 700,
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}
        >
          {t('hero.scroll')}
        </Typography>
        <KeyboardArrowDown sx={{ color: 'rgba(255,255,255,0.9)', fontSize: 28 }} />
      </Box>
    </Box>
  );
}
