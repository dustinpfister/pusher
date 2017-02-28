/*
 *    git_push.js
 *
 *    push a commit to the remote
 *
 */

var spawn = require('child_process').spawn,

checkFolder = function (cwd, done) {

    // check if the folder is a git folder
    var isGit = spawn('git', ['push'], {
            cwd : cwd
        });

    isGit.stdout.on('data', function (data) {

        //done(true);
        console.log(data.toString('utf8'));

    });

    isGit.stderr.on('data', function (data) {

        //done(false);
        console.log(data.toString('utf8'));

    });

    isGit.on('close', function (code) {

        done(true);

    });

};

exports.call = function (cwd, done) {

    cwd = cwd || './';
    done = done || function (success) {
        console.log('git_push: ' + success);
    };

    checkFolder(cwd, done);

};
