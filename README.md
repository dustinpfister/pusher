# pusher

This is a simple tool I have made to help better manage my work flow when working on a project. It automates some representative typing, 


The basic usage would be something like this:

```bash
$ pusher -m "This is a new patch"
```

which would do the following:

* Checks if the current working folder is a git folder
* If it is a git folder it will preform a $git status to check for uncommitted changes.
* If there are changes it will run an array of scripts that do repetitive tasks that must be preformed on each version increase.
* After running scripts it will do a $ git add *
* Then a $ git commit -m "pusher c[cNumber]: This is a new patch"
* And finally a $ git push

## git_isgit.js

git_isgit.js is a simple module I put together where I pass it a path, and a callback, and the module would give me a true or false response via the callback if the path is a git folder.

This can be preformed manually in the CLI like this:

```bash
$ git rev-parse --is-inside-work-tree
```

it can be used in a node project like this:
```js
require('./js/git_isgit.js').check('.',function (isGitFolder) {

    if (isGitFolder) {

        console.log('yes, this is a git folder.');

    } else {

        console.log('not a git folder');

    }

});
```

It will cause an error if false, but return true to the standard out if it is a git folder.

## git_count.js

This script will return the current count of commits in the repositories master branch

```
$ git rev-list --count master
```

## Example scripts

The selection of scripts that will be called depend of course on the project. For example if it is a node project, it would be nice to have a script that will bump the patch count of the version number in package.json with each call of push. However it is silly to use that if it is a pure front-end only project. In some cases 