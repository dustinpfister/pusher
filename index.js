
var spawn = require('child_process').spawn,
cwd = '.';

require('./js/isgit.js').check('.',function (isGitFolder) {

    // will return true if a git folder

    if (isGitFolder) {


        console.log('yes, this is a git folder.');


    } else {

        console.log('not a git folder');

    }

});

/*
require('./js/isgit.js').check(cwd,function (isGitFolder) {

    // will return true if a git folder

    if (isGitFolder) {

        //var stat = spawn('git', ['status'], {

        var stat = spawn('git', ['rev-parse', '--show-toplevel'], {

                cwd : cwd
            });

        stat.stdout.on('data', function (data) {

            console.log(data.toString('utf8'));

        });

    } else {

        console.log('not a git folder');

    }

});
*/
