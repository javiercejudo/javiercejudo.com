#!/usr/bin/env node

const buildHome = require('./pages/home');
const buildContact = require('./pages/contact');
const buildProject = require('./pages/project');
const projects = require('../../src/pages/project/data')

buildHome();
buildContact();
projects.forEach(buildProject)
