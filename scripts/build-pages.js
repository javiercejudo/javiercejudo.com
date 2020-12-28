#!/usr/bin/env node

const path = require('path');
const Mustache = require('mustache');
const molino = require('../lib/molino');
const molinoTemplateAdapter = require('../lib/molinoTemplateAdapter');

const buildHome = require('../src/pages/home/build');
const buildContact = require('../src/pages/contact/build');
const buildAbout = require('../src/pages/about/build');
const buildProject = require('../src/pages/project/build');
const projects = require('../src/pages/project/data');

const templateTransform = molinoTemplateAdapter({render: Mustache.render});

const buildPage = molino({
  layoutsFolderPath: path.join('src', 'layouts'),
  layoutPath: 'main.mustache',
  outputFolderPath: path.join('src', 'static'),
  templateTransform,
});

const builders = [
  buildHome,
  buildContact,
  buildAbout,
  ...projects.map(buildProject),
];

builders.forEach(builder => builder({buildPage, templateTransform}));
