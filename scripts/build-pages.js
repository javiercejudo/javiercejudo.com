#!/usr/bin/env node

const molino = require('../lib/molino');
const configureSiteBuilder = require('../src/site-builder');

const buildHome = require('../src/pages/home/build');
const buildContact = require('../src/pages/contact/build');
const buildAbout = require('../src/pages/about/build');
const buildProject = require('../src/pages/project/build');
const projects = require('../src/pages/project/data');

const pageBuilders = [
  buildHome,
  buildContact,
  buildAbout,
  ...projects.map(buildProject),
];

const siteBuilder = configureSiteBuilder({pageBuilders});
molino.build({siteBuilder});
