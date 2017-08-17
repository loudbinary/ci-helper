#!/usr/bin/env node

const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const ProgramOptions = require('./libs/constants/programOptions.js');
let programActions = require('./libs/constants/programActions.js');



let programOptions = new ProgramOptions();
programOptions.parseArgs(process.argv);

switch(true) {
    case programOptions.program.head:
        programActions.getHead(programOptions.program.path);
        break;
    case !_.isEmpty(programOptions.program.versionTag):
        programActions.getLatestTag(programOptions.program.path);
        break;
    case programOptions.program.branch:
        programActions.getBranch(programOptions.program.path);
        break;
    case programOptions.program.commits && !_.isEmpty(programOptions.program.tag):
        programActions.getCommits(programOptions.program.tag,programOptions.program.path);
        break;
    case programOptions.program.commits && _.isEmpty(programOptions.program.tag):
        console.log('Unable to get commits, missing required --tag');
        break;
    case !programOptions.program.commits && !_.isEmpty(programOptions.program.tag):
        console.log('Unable to get commits, missing required boolean --commits');
        break;

}

