#!/usr/bin/env node

const buildHome = require('./home');
const buildContact = require('./contact');
const buildProject = require('./project');
const projects = require('../../../src/pages/project/data')

buildHome();
buildContact();
projects.forEach(buildProject)
