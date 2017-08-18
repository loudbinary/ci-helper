const _ = require('lodash');
exports.run = function(po,pa) {
    let programOptions = po;
    let programActions = pa;
    return new Promise((resolve,reject)=>{
        switch(true) {
            // Get head
            case programOptions.program.head:
                programActions.getHead(programOptions.program.path);
                resolve(null);
                break;
            // Get latest version tag.
            case !_.isEmpty(programOptions.program.versionTag):
                programActions.getLatestTag(programOptions.program.path);
                resolve(null);
                break;
            // Get current branch
            case programOptions.program.branch:
                programActions.getBranch(programOptions.program.path);
                resolve(null);
                break;
            case programOptions.program.commits && _.isEmpty(programOptions.program.tag):
                reject('Unable to get commits, missing required --tag');
                break;
            case !programOptions.program.commits && !_.isEmpty(programOptions.program.tag):
                reject('Unable to get commits, missing required boolean --commits');
                break;
            case programOptions.program.commits && !_.isEmpty(programOptions.program.tag) && _.isEmpty(programOptions.program.jiraProjectId):
                programActions.getCommits(programOptions.program.tag,programOptions.program.path);
                resolve(null);
                break;
            case programOptions.program.commits && !_.isEmpty(programOptions.program.tag) && !_.isEmpty(programOptions.program.jiraProjectId):
                programActions.getJiraIds(programOptions.program.tag,programOptions.program.path);
                resolve(null);
                break;
        }
    })

};


