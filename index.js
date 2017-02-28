
var spawn = require('child_process').spawn,
cwd = '.',
mess = 'git_push.js speaks',
dontPush = false,

log = function (mess) {

    console.log('pusher: ' + mess);

};

require('./js/git_isgit.js').check('.', function (isGitFolder) {

    // will return true if a git folder

    if (isGitFolder) {

        log('it is a git folder.');

        require('./js/git_addall.js').call('.', function (success) {

            if (success) {

                log('add all success');

                require('./js/git_commit.js').call('.', mess, function (success) {

                    log('commit success: ' + success);

                    log('ready to push');

                    if (success && !dontPush) {

                        require('./js/git_push.js').call('.', function (success) {

                            if (success) {

                                log('looks like we pushed.');

                            }

                        });

                    }

                });

            } else {

                log('add all fail');

            }

        });

    } else {

        log('not a git folder, you may need to do a $git init , and set up an origin.');

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
