/*
 *  git_reset.js
 *
 *
 */

// I have to use exec because I get a strange bad argument error when using spawn.
var exec = require('child_process').exec,

checkFolder = function (cwd, done) {

    // check if the folder is a git folder
    var isGit = exec('git reset HEAD^', {
            cwd : cwd
        });

    isGit.stdout.on('data', function (data) {

        console.log(data.toString('utf8'));

    });

    isGit.stderr.on('data', function (data) {

        console.log(data.toString('utf8'));

    });

    isGit.on('close', function (code) {

        done(true);

    });

};

exports.call = function (cwd, done) {

    cwd = cwd || './';
    done = done || function (success) {
        console.log('git_reset: ' + success);
    };

    checkFolder(cwd, done);

};
