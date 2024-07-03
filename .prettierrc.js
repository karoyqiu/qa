/** @type {import("prettier").Options} */
module.exports = {
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('prettier-plugin-organize-attributes'),
  ],
  attributeGroups: ['$CODE_GUIDE'],
  attributeSort: 'ASC',
  printWidth: 100,
  singleQuote: true,
};
