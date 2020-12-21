#!/usr/bin/env node

const buildHome = require('./pages/home');
const buildProject = require('./pages/project');
const projects = require('../../src/pages/project/data')

buildHome();
projects.forEach(buildProject)
