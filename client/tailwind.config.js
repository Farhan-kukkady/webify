/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Brand palette ──
        navy: {
          950: '#060810',
          900: '#0a0e1a',
          800: '#0d1226',
          700: '#111827',
          600: '#1a2541',
          500: '#1e2d52',
          400: '#2a3f6f',
        },
        electric: {
          600: '#1d4ed8',
          500: '#2563eb',
          400: '#3b82f6',
          300: '#60a5fa',
          200: '#93c5fd',
          100: '#dbeafe',
        },
        cyan: {
          500: '#06b6d4',
          400: '#22d3ee',
          300: '#67e8f9',
        },
        // Keep standard white/gray for text
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', fontWeight: '800' }],
        'display-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.15', fontWeight: '700' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #0a0e1a 0%, #0d1226 40%, #111827 100%)',
        'gradient-electric': 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #06b6d4 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(37,99,235,0.08) 0%, rgba(6,182,212,0.04) 100%)',
      },
      boxShadow: {
        'electric': '0 0 30px rgba(37, 99, 235, 0.3)',
        'electric-lg': '0 0 60px rgba(37, 99, 235, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(37, 99, 235, 0.2)',
        'glow': '0 0 20px rgba(6, 182, 212, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fadeUp 0.6s ease-out both',
        'slide-in': 'slideIn 0.5s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '128': '32rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
