/*
 *    git_addall.js
 *
 *    stage all changes that have been made
 *
 */

var spawn = require('child_process').spawn,

checkFolder = function (cwd, done) {

    // check if the folder is a git folder
    var isGit = spawn('git', ['add', '*'], {
            cwd : cwd
        });

    // just do something on close
    isGit.on('close', function (code) {

        if (code === 0) {

            done(true);

        } else {

            done(false);

        }

    });

};

exports.call = function (cwd, done) {

    cwd = cwd || './';
    done = done || function (success) {
        console.log('git_addall.js : ' + sucess);
    };

    checkFolder(cwd, done);

};
