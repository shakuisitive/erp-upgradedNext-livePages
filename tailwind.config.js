/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        customblack: '#323338', 
        grayBlack:'#676879',
        white: '#ffffff', 
        customblue: '#1F76C2',
        customgreen: '#007f9b',
        btnHoverGreen: "#006278",
        customLightGreen: '#00c875',
        customLightBlue: '#0086c0',
        customGray: '#dedfec',
        customHover:"rgba(103, 104, 121, 0.1)",
        customIcon:"#676879",
        customLightGray:"#EFEFF1"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
        'lgdesktop': '1920px',
        'btdesktop': '1520px',

        'extall': { 'raw': '(min-height: 1020px) and (max-height: 1390px)' },
        'tall': { 'raw': '(min-height: 840px) and (max-height: 1020px)' },
        'medium': { 'raw': '(min-height: 720px) and (max-height: 840px)' },
        'small': { 'raw': '(min-height: 600px) and (max-height: 720px)' },
      }, // <--- Missing closing brace added here
    },
  },
  plugins: [],
}
