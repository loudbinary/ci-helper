let instance;
const program = require('commander');
const Promise = require('bluebird');
const util = require('util');
const fs = require('fs');

function ProgramOptions() {
    if (instance === undefined) {
        instance = this;
    }
    this.program = require('commander');
}

ProgramOptions.prototype.parseArgs = function (options){
    instance.program
        .version(require('./../../package.json').version)
        .usage('[options] <repository_path>')
        .option('-h, --head', 'Retrieves local repo current head')
        .option('-j --jiraIssues', 'Retrieves all JIRA Ids for commits and returns list, should be used with -c and -t only')
        .option('-v, --versionTag', 'Retrieves local repo latest semver tag')
        .option('-b --branch', 'Retrieves local repository current branch')
        .option('-c, --commits', 'Retrieves all commits since supplied tag supplied with -t option')
        .option('-t, --tag [tag]', 'Used in conjunction with -c to retrieve all commits since given tag committed')
        .option('-p, --path [path', 'Always required to specify directory for local repository')

    instance.program.on('--help', function(){
            console.log('');
            console.log('  Examples:');
            console.log('');
            console.log('Get current branch of current local repository');
            console.log("    repoInfo -b -p <local repo directory path>");
            console.log('');
            console.log('Get commit sha of current local repository');
            console.log("    repoInfo -h -p <local repo directory path>");
            console.log('');
            console.log('Get latest semantic version of current local repository');
            console.log("    repoInfo -v -p <local repo directory path>");
            console.log('');
            console.log('Get latest semantic version of current local repository');
            console.log("    repoInfo -v -p <local repo directory path>");
            console.log('');
            console.log('Get all commit sha\'s since provided tag of current local repository');
            console.log("    repoInfo -c -t v1.0.1341 -p <local repo directory path>");
            console.log('');
            console.log('Get all jira id\'s since provided tag of current local repository');
            console.log("    repoInfo -c -t v1.0.1341  -j -p <local repo directory path>");
            console.log('');
        })
    if (!instance.program.path && !instance.program.help && !verifyPath(instance.progrsm.path)) {
        throw new Error('Repository path not provided to command')
    }
    instance.program.parse(options);

}

function verifyPath(path) {
    if (fs.existsSync(path)) return true
    else {
        throw new Error('Missing repository path provided to command')
    }
}

module.exports = ProgramOptions;