/**
 * @typedef Project
 * @property {string} name
 * @property {string} description
 * @property {string} path
 */

/** @type Project[] */
const projectsData = [
  {
    name: 'javiercejudo.com',
    description: 'My personal website',
    path: 'personal-site/index.html',
  },
  {
    name: 'Modelico',
    description:
      'Serialisable immutable models for JavaScript (eg. generic Lists, Maps, EnumMaps…).',
    path: 'modelico/index.html',
  },
  {
    name: 'Arbitrary precision',
    description:
      'Abstraction for decimal functionality in big.js, bignumber.js, decimal.js and others via adapters.',
    path: 'arbitrary-precision/index.html',
  },
];

module.exports = projectsData;
