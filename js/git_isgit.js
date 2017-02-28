/*
 *     git_isgit.js
 *
 *     just check if a folder is a git folder, return true or false
 *
 *     require('./js/isgit.js').check('.',function (isGitFolder) {
 *
 *         if (isGitFolder) {
 *
 *             console.log('yes, this is a git folder.');
 *
 *         } else {
 *
 *             console.log('not a git folder');
 *
 *         }
 *
 *      });
 *
 */

var spawn = require('child_process').spawn,

checkFolder = function (cwd, done) {

    // check if the folder is a git folder
    var isGit = spawn('git', ['rev-parse', '--is-inside-work-tree'],
            {
            cwd : cwd
        });

    isGit.stdout.on('data', function (data) {

        //console.log('looks like it is a git folder');
        //console.log(data.toString('utf8'));

        done(true);

    });

    isGit.stderr.on('data', function (data) {

        done(false);

    });

    isGit.on('close', function (code) {
        //console.log('git process closed with code: ' + code);
    });

};

exports.check = function (cwd, done) {

    cwd = cwd || './';
    done = done || function (isGit) {
        console.log('isGit: ' + isGit);
    };

    checkFolder(cwd,done);

};
