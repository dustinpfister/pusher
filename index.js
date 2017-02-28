
var spawn = require('child_process').spawn,
cwd = '.',
mess = 'prepPush bool',
prepPush = true,
dontPush = false,

log = function (mess) {

    console.log('pusher: ' + mess);

};

require('./js/git_isgit.js').check('.', function (isGitFolder) {

    // will return true if a git folder

    if (isGitFolder) {

        log('it is a git folder.');

        if (prepPush) {

            require('./js/git_addall.js').call('.', function (success) {

                if (success) {

                    log('add all success');

                    require('./js/git_commit.js').call('.', mess, function (success) {

                        log('commit success: ' + success);

                        if (success && !dontPush) {

                            log('pushing');

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

            log('will not prep or push');

        }

    } else {

        log('not a git folder, you may need to do a $git init , and set up an origin.');

    }

});
