/*
 *    git_reset.js
 *
 *    reset a preped, but not pushed commit
 *
 */

// I have to use exec because I get a strange bad argument error when using spawn.
var exec = require('child_process').exec,
spawn = require('child_process').spawn,

checkFolder = function (cwd, done) {

    console.log('okay so the computer is at least trying to follow simple instructions');

    // check if the folder is a git folder
    //var isGit = exec('git reset HEAD\x5E', {
    var isGit = spawn('git', ['reset', 'HEAD^'], {
            cwd : cwd
        });

    isGit.stdout.on('data', function (data) {

        console.log(data.toString('utf8'));

    });

    isGit.stderr.on('data', function (data) {

        console.log(data.toString('utf8'));

    });

    isGit.on('close', function (code) {

        console.log('reset is closing with this code');
        console.log(code);

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
