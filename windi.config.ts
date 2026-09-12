import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  attributify: false,
  darkMode: 'class',
  extract: { include: ['src/**/*.{tsx,ts,jsx,js,html}', 'index.html'] },
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      boxShadow: { panel: '0 18px 48px rgba(15, 23, 42, 0.08)' }
    }
  }
})
