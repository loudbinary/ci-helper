#!/usr/bin/env node
const Promise = require('bluebird');
const _ = require('lodash');
const ProgramOptions = require('./libs/constants/programOptions.js');
let programActions = require('./libs/constants/programActions.js');
let executeArgs = require('./libs/constants/executeOptions.js');
let processingArray = [];

let programOptions = new ProgramOptions();

processingArray.push(programOptions.parseArgs(process.argv));
processingArray.push(executeArgs.run(programOptions,programActions));

Promise.each(processingArray,() =>{return})
