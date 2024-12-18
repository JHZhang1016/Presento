/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite-react/tailwind');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    flowbite.content(),
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
        colors: {
            'btncolor': '#2E3246',
            'cardBackGround': '#FFFFFF',
            'workPlace':'#f0f0f0',
            'dark-BackGround': '#2E3246',
            'darkmode-textcolor' : '#FFFFFF',
            'darkmode-cardBackGround': '#2E3246',
            'darkmode-workPlace':'#2E3246',
            'darkmode-navbar':'#2E3246',
            'darkmode-navbar-text':'#FFFFFF',
        },
        spacing: {
            'sm-w-card': '24rem',
            'lg-w-card': '24rem',
        },
    },
  },
  plugins: [
    flowbite.plugin(),
    require('flowbite/plugin')
  ],
}

