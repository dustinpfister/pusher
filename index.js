
var spawn = require('child_process').spawn,
cwd = '.',

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

                require('./js/git_commit.js').call('.', 'looking good', function (success) {

                    log('commit success: ' + success);

                });

            } else {

                log('add all fail');

            }

        });

    } else {

        log('not a git folder');

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
