/*
 *  isGit.js
 *
 *
 */

var spawn = require('child_process').spawn,

checkFolder = function (cwd, done) {

    // check if the folder is a git folder
    var isGit = spawn('git', ['push'], {
            cwd : cwd
        });

    isGit.stdout.on('data', function (data) {

        done(true);

    });

    isGit.stderr.on('data', function (data) {

        done(false);

    });

    isGit.on('close', function (code) {});

};

exports.call = function (cwd, done) {

    cwd = cwd || './';
    done = done || function (success) {
        console.log('git_push: ' + success);
    };

    checkFolder(cwd, done);

};
