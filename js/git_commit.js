/*
 *  git_addall.js
 *
 *    gets a count of commits for the master branch
 *
 */

var spawn = require('child_process').spawn,

checkFolder = function (cwd, mess, done) {

    // check if the folder is a git folder
    var isGit = spawn('git', ['commit', '-m', 'pusher: ' + mess], {
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

exports.call = function (cwd, mess, done) {

    cwd = cwd || './';
    mess = mess | '';
    done = done || function (success) {
        console.log('git_commit.js : ' + sucess);
    };

    checkFolder(cwd, mess, done);

};
