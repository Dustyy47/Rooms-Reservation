/** @type {import('prettier').Config} */
module.exports = {
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  arrowParens: 'always',
  useTabs: false,
  printWidth: 80,
  trailingComma: 'none',
  semi: true,
  plugins: [require('prettier-plugin-tailwindcss'), '@svgr/plugin-prettier']
};
