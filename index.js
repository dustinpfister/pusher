
var spawn = require('child_process').spawn,
cwd = '.',
mess = '',
prepPush = true,
reset = false,
dontPush = false,
count = -1,

log = function (mess) {

    console.log('pusher: ' + mess);

},

start = function () {

    require('./js/git_isgit.js').check('.', function (isGitFolder) {

        // will return true if a git folder

        if (isGitFolder) {

            log('it is a git folder.');

            if (prepPush) {

                require('./js/git_addall.js').call('.', function (success) {

                    if (success) {

                        log('add all success');

                        require('./js/git_commit.js').call(
                            '.',
                            'pusher c' + count + ': ' + mess,
                            function (success) {

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

                if (reset) {

                    require('./js/git_reset.js').call('.', function () {

                        log('reset okay');

                    });

                } else {

                    log('will not reset');

                }

            }

        } else {

            log('not a git folder, you may need to do a $git init , and set up an origin.');

        }

    });

},

getCount = function () {

    require('./js/git_count.js').call('.', function (theCount) {

        count = theCount;

        log('count = ' + count);

        if (count >= 0) {

            start();

        } else {

            log('problem with the count.');

        }

    });

},

// start by looking at arguments
processArgv = function () {

    var aurgs = process.argv.splice(2, process.argv.length);

    console.log(aurgs);

    aurgs.forEach(function (text, index) {

        switch (text) {

            // set message
        case '-m':

            if (aurgs[index + 1]) {

                mess = aurgs[index + 1];

            }

            break;

            //reset flag = true
        case '-r':

            reset = true;

            // we will not be preping or pushing also then
            prepPush = false;
            dontPush = true;

            break;

            // dont push
        case '-dp':

            dontPush = true;

            break

        }

    })

    log('mess = ' + mess);
    log('prepPush = ' + prepPush);
    log('reset = ' + reset);
    log('dontPush =' + dontPush);

    // get the count
    getCount();

};

processArgv();
