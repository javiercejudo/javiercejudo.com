#!/usr/bin/env node

const buildHome = require('../src/pages/home/build');
const buildContact = require('../src/pages/contact/build');
const buildAbout = require('../src/pages/about/build');
const buildProject = require('../src/pages/project/build');
const projects = require('../src/pages/project/data');

buildHome();
buildContact();
buildAbout();
projects.forEach(buildProject);
