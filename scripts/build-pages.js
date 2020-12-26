#!/usr/bin/env node

const path = require('path');
const customBuildPage = require('../src/buildPage');

const buildHome = require('../src/pages/home/build');
const buildContact = require('../src/pages/contact/build');
const buildAbout = require('../src/pages/about/build');
const buildProject = require('../src/pages/project/build');
const projects = require('../src/pages/project/data');

const buildPage = customBuildPage({
  templateSourcePath: path.join('src', 'layouts', 'main.mustache'),
});

const builders = [
  buildHome,
  buildContact,
  buildAbout,
  ...projects.map(buildProject),
];

builders.forEach(builder => builder({buildPage}));
