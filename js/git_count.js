/*
 *  git_count.js
 *
 *    gets a count of commits for the master branch
 *
 */

var spawn = require('child_process').spawn,

checkFolder = function (cwd, done) {

    // check if the folder is a git folder
    var isGit = spawn('git', ['rev-list','--count','master'],
            {
            cwd : cwd
        });

    isGit.stdout.on('data', function (data) {

        done(data.toString('utf8'));

    });

    isGit.stderr.on('data', function (data) {

        done(null);

    });

    isGit.on('close', function (code) {

    });

};

exports.call = function (cwd, done) {

    cwd = cwd || './';
    done = done || function (count) {
        console.log('git_count.js : ' + count);
    };

    checkFolder(cwd,done);

};
