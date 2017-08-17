#!/usr/bin/env node
const  Git = require('./libs/git');
const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const program = require('commander');


let git;


program
    .version(require('./package.json').version)
    .usage('[option <repository_path>')
    .option('-h, --head', 'Retrieves local repo current head')
    .option('-j --jiraIssues', 'Retrieves ')
    .option('-v, --versionTag', 'Retrieves local repo latest semver tag')
    .option('-b --branch', 'Retrieves local repository current branch')
    .option('-c, --commits', 'Retrieves all commits since supplied tag supplied with -t option')
    .option('-t, --tag [tag]', 'Used in conjunction with -c to retrieve all commits since given tag committed')
    .parse(process.argv)

function verifyPath(path) {
    if (fs.existsSync(path)) return true
    else {
        throw new Error('Missing repository path provided to command')
    }
}

if (!program.args[0]) {
    throw new Error('Repository path not provided to command')
}

switch(true) {
    case program.head:
        getHead(program.args[0]);
        break;
    case program.versionTag:
        getLatestTag(program.args[0]);
        break;
    case program.branch:
        getBranch(program.args[0]);
        break;
    case program.commits && program.tag:
        getCommits(program.args[1],program.args[0]);
        break;
    case program.commits && !program.tag:
        console.log('Unable to get commits, missing required --tag');
        break;
    case !program.commits && program.tag:
        console.log('Unable to get commits, missing required boolean --commits');
        break;

}

function getHead(repoPath){
    git = new Git(repoPath);
    git.getHead(repoPath)
        .then((hash)=>{
            console.log(hash);
            process.exit(0)
        })
        .catch((err)=>{
            throw new Error(err);
    })
}

function getLatestTag(repoPath) {
    git = new Git(repoPath);
    git.getLatestTag(repoPath)
        .then((tag)=>{
            console.log(tag);
            process.exit(0)
        })
        .catch((err)=>{
            throw new Error(err);
        })
}

function getBranch(repoPath) {
    git = new Git(repoPath);
    git.getBranch(repoPath)
        .then((branch)=>{
            console.log(branch);
            process.exit(0)
        })
        .catch((err)=>{
            throw new Error(err);
        })
}

function getCommits(repoPath,tag) {
    git = new Git(repoPath);
    git.getCommits(repoPath,tag)
        .then((results)=>{
            console.log(results);
            process.exit(0)
        })
        .catch((err)=>{
            throw new Error(err);
        })
}
