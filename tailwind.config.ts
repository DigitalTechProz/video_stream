// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'background-black': '#141414',
        'text-gray': '#e5e5e5',
        'card-background': '#1e1e1e',
        'glassmorph': 'rgba(255, 255, 255, 0.2)',
        'glassmorph-hover': 'rgba(255, 255, 255, 0.1)',
        'glassmorph-active': 'rgba(255, 255, 255, 0.05)',
      },
      backdropBlur: {
        'lg': '20px',
      },
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3866483728.
      backgroundColor: ['group-hover'],
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
    variants: {
      extend: {
        backdropBlur: ['group-hover'],
      },
    },
  },
  plugins: [
    
  ],
};
