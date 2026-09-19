/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--color-background)',
          subtle: 'var(--color-background-subtle)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          floating: 'var(--color-surface-floating)',
          subtle: 'var(--color-surface-subtle)',
        },
        glass: {
          1: 'var(--color-glass-1)',
          2: 'var(--color-glass-2)',
          3: 'var(--color-glass-3)',
          border: 'var(--color-glass-border)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          active: 'var(--color-accent-active)',
          subtle: 'var(--color-accent-subtle)',
        },
        semantic: {
          success: 'var(--color-success)',
          'success-subtle': 'var(--color-success-subtle)',
          warning: 'var(--color-warning)',
          'warning-subtle': 'var(--color-warning-subtle)',
          danger: 'var(--color-danger)',
          'danger-subtle': 'var(--color-danger-subtle)',
          info: 'var(--color-info)',
          'info-subtle': 'var(--color-info-subtle)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
          strong: 'var(--color-border-strong)',
        },
      },
      borderRadius: {
        xs: 'var(--radius-xs)', // 6px
        sm: 'var(--radius-sm)', // 8px
        md: 'var(--radius-md)', // 10px
        lg: 'var(--radius-lg)', // 14px
        xl: 'var(--radius-xl)', // 18px
        '2xl': 'var(--radius-2xl)', // 22px
        dock: 'var(--radius-dock)', // 24px
      },
      boxShadow: {
        'glass-sm': 'var(--shadow-sm)',
        'glass-md': 'var(--shadow-md)',
        'glass-lg': 'var(--shadow-lg)',
        'glass-modal': 'var(--shadow-modal)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace'
        ],
      },
      letterSpacing: {
        display: '-0.03em',
        title: '-0.02em',
        tight: '-0.01em',
        normal: '0',
      },
      backdropBlur: {
        xs: '8px',
        1: 'var(--blur-1)', // 12px
        2: 'var(--blur-2)', // 20px
        3: 'var(--blur-3)', // 28px
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
    },
  },
  plugins: [],
}
