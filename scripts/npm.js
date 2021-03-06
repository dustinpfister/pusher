
var fs = require('fs');

exports.call = function (done) {

    var pkg,
    version;

    done = done || function () {};

    fs.readFile('package.json', 'utf8', function (err, data) {

        if (err) {

            console.log('error reading JSON');

            done();

        } else {

            try {

                pkg = JSON.parse(data);
                version = pkg.version.split('.');

                // bump patch number
                version[version.length - 1] = Number(version[version.length - 1]) + 1;

                // set version
                pkg.version = version.join('.');

                console.log('bumping package.json');

                fs.writeFile('package.json', JSON.stringify(pkg), function () {

                    console.log('check it out');

                    done();

                })

            } catch (e) {

                console.log('problem with json');

                done();

            }

        }

    });

};
