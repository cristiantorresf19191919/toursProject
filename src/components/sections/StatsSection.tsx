'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { stats, localizeStat } from '@/data/experiences';
import { useLanguage } from '@/contexts/LanguageContext';

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <Typography
      ref={ref}
      variant="h2"
      sx={{
        fontWeight: 800,
        fontSize: { xs: '1.85rem', sm: '2.2rem', md: '2.5rem' },
        fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif',
        letterSpacing: '-0.03em',
        background: 'linear-gradient(180deg, currentColor 55%, rgba(15,107,111,0.5))',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'text.primary',
      }}
    >
      {count.toLocaleString()}
      {suffix}
    </Typography>
  );
}

export default function StatsSection() {
  const theme = useTheme();
  const { locale } = useLanguage();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(15,107,111,0.08) 0%, rgba(196,154,74,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(15,107,111,0.04) 0%, rgba(196,154,74,0.03) 100%)',
        position: 'relative',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(30,38,48,0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 1040,
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 3, md: 2 },
            columnGap: { md: 0 },
            alignItems: 'start',
          }}
        >
          {stats.map((rawStat, i) => {
            const stat = localizeStat(rawStat, locale);
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ position: 'relative' }}
            >
              {i > 0 && (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    position: 'absolute',
                    left: 0,
                    top: '15%',
                    bottom: '15%',
                    width: '1px',
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(30,38,48,0.1)',
                    transform: 'translateX(-50%)',
                  }}
                />
              )}
              <Box
                sx={{
                  textAlign: 'center',
                  px: { md: 2 },
                  py: { xs: 1, md: 0 },
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1.25,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontSize: { xs: '0.7rem', md: '0.75rem' },
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </motion.div>
          );
          })}
        </Box>
      </Container>
    </Box>
  );
}
