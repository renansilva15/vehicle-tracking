import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        default: '#242526',
        main: '#ffcd00',
        error: '#f35759',
        success: '#366912',
      },
      textColor: {
        primary: '#242526',
        contrast: '#ffffff',
      },
    },
  },
  plugins: [],
}
export default config
