import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:                'var(--bg)',
        'bg-elevated':     'var(--bg-elevated)',
        'bg-card':         'var(--bg-card)',
        surface:           'var(--surface)',
        'surface-2':       'var(--surface-2)',
        primary:           'var(--primary)',
        'primary-hover':   'var(--primary-hover)',
        'primary-muted':   'var(--primary-muted)',
        accent:            'var(--accent)',
        'accent-muted':    'var(--accent-muted)',
        text:              'var(--text)',
        'text-secondary':  'var(--text-secondary)',
        'text-muted':      'var(--text-muted)',
        'text-inverse':    'var(--text-inverse)',
        border:            'var(--border)',
        'border-strong':   'var(--border-strong)',
        'nav-bg':          'var(--nav-bg)',
        'nav-text':        'var(--nav-text)',
        'sidebar-bg':      'var(--sidebar-bg)',
        'sidebar-active':  'var(--sidebar-active-bg)',
        'sidebar-active-text': 'var(--sidebar-active-text)',
        'sidebar-text':    'var(--sidebar-text)',
        'sidebar-hover':   'var(--sidebar-hover-bg)',
      },
      boxShadow: {
        'theme-sm':  'var(--shadow-sm)',
        'theme-md':  'var(--shadow-md)',
        'theme-lg':  'var(--shadow-lg)',
        'theme-xl':  'var(--shadow-xl)',
        'primary':   'var(--shadow-primary)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
