/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    screens: {
      tablet: { max: '640px' }
    },
    extend: {
      colors: {
        c: {
          black: '#212529',
          grey: '#6C757D',
          greyLight: '#ADB5BD',
          red: '#DC3545',
          blue: '#0074D6',
          green: '#35DC5A',
          greyUltraLight: '#EDEFF2'
        }
      },
      backgroundColor: {
        c: {
          grey: '#F8F9FA',
          blueAccent: '#0074D6',
          blueGrey: '#E9ECEF',
          blue: '#F2F8FD',
          black: '#212529',
          red: '#F7EFF1',
          green: '#35DC5A'
        }
      },
      height: {
        uiItem: '3rem'
      },
      borderRadius: {
        common: '0.4rem'
      },
      boxShadow: {
        outline: '0 0 0 2px #0074D6',
        outlineHidden: '0 0 0 2px transparent'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
