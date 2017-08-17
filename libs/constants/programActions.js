const  Git = require('./../git');
let git;

exports.getHead = function(repoPath){
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

exports.getLatestTag = function(repoPath) {
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

exports.getBranch = function(repoPath) {
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

exports.getCommits = function(tag,repoPath) {
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
