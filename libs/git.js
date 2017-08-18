let instance
const gitHead = require('git-head');
const latestTag = require('git-latest-semver-tag');
const currentBranch = require('git-branch');
const path = require('path');
const chdir = require('chdir');
const util = require('util');
const simpleGit = require('simple-git');
const _ = require('lodash');
const jira_matcher = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g
const reverse = require('reverse-string');

function Git(repoPath){
    if (instance === undefined) {
        instance = this;
    }
    this.repoPath = repoPath
}

Git.prototype.getHead = function (repoPath) {
    return new Promise((resolve,reject) =>{
        if (!repoPath) reject('Missing Git Repository path');
        let tmppath = path.join(repoPath,'.git'); //Necessary to direct to .git for module to work.
        gitHead(tmppath, (err,hash) =>{
            if (err) reject(err);
            resolve(hash);
        })
    })
};

Git.prototype.getLatestTag = function () {
    return new Promise ((resolve,reject)=> {
        if (!instance.repoPath) reject('Missing Git Repository path');
        chdir(instance.repoPath, function() {
            latestTag((err,tag)=>{
                if (err) reject(err);
                resolve(tag);
            })
        })
    })
};

Git.prototype.getBranch = function () {
    return new Promise ((resolve,reject)=> {
        if (!instance.repoPath) reject('Missing Git Repository path');
        chdir(instance.repoPath, function() {
            currentBranch((err,branch)=>{
                if (err) reject(err);
                resolve(branch);
            })
        })
    })
};

Git.prototype.getCommits = function (repoPath,tag) {
    tag = tag + '..HEAD'
    return new Promise((resolve,reject)=>{
        simpleGit(repoPath).raw(
            [
                'log',
                tag,
                '--oneline',
                '--no-abbrev-commit',
                '--no-notes'
            ], (err,results) => {
                if (err) reject(err);
                let newArray = _.split(results,'\n',results.length);
                resolve(_.dropRight(newArray.map((value)=>{
                    if (value || !_.isEmpty(value)){
                        return value.substring(0,value.indexOf(' '));
                    }
                })));
            }
        );
    })
};

Git.prototype.getJiraIds = function (repoPath,tag) {
    tag = tag + '..HEAD'
    return new Promise((resolve,reject)=>{
        simpleGit(repoPath).raw(
            [
                'log',
                tag,
                '--oneline',
                '--no-abbrev-commit'
            ], (err,results) => {
                if (err) reject(err);
                let newArray = _.dropRight(_.split(results,'\n',results.length));
                let notes = newArray.map((item)=>{
                    // Javascript has no look behind, reverse to fool it.
                    return reverse(item.substring(item.indexOf(' '),item.length).trim())
                });

                let jiraIds = notes.map((item)=>{
                    let results = item.match(jira_matcher);
                    if (results) {
                        return reverse(results.toString())
                    }
                })
                jiraIds = _.uniq(jiraIds.filter((n)=> {return n != undefined}));
                resolve(jiraIds)
            }
        );
    })
};

module.exports = Git;