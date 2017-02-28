# pusher

This is a simple tool I have made to help better manage my work flow when working on a project. It automates some repetitive typing, but can also be used to run some scripts that should be called on each commit. It can be considered a kind of pre-release tool.

## why pusher?

I am sure there are many great tools out there all ready, this is just my take on such a project in the spirit of "If you want a job done right you have to do it yourself". I also started working on this as a way to learn how to make CLI tools with node.js, as well as a motivator to get more professional with all kinds of process that should be called before committing to a master branch.

One basic function of pusher is to condense this:

```bash
$ git add *
$ git commit -m "This is a new patch"
$ git push
```

into this:

```bash
$ pusher -m "This is a new patch"
```

However it also does a few more things before doing so.

The process so far is something like this:

* Pusher checks if the current working folder is a git folder
* if so it will run a collection of scripts that complete tasks that need to happen with each new commit, such as bumping up a version number.
* After running scripts it will do a $ git add *
* Then a $ git commit -m "pusher c[cNumber]: This is a new patch"
* And finally a $ git push

## git_addall.js

This is used to stage all changes.

This can be preformed manually in the CLI like this:
```bash
$ git add *
```

## git_commit.js

This is used to commit all staged changes.

This can be preformed manually in the CLI like this:
```bash
$ git commit -m "a new commit"
```

## git_count.js

This is used to get a count of commits in the master branch

This can be preformed manually in the CLI like this:
```bash
$ git rev-list --count master
```

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

## git_push.js

This will push the commit to the remote

This can be preformed manually in the CLI like this:
```bash
$ git push
```

## git_reset.js

This will reset staged changes

This can be preformed manually in the CLI like this:
```bash
$ git reset HEAD^
```

## Example scripts

The selection of scripts that will be called depend of course on the project. For example if it is a node project, it would be nice to have a script that will bump the patch count of the version number in package.json with each call of push. However it is silly to use that if it is a pure front-end only project.

regardless if you use node.js or not for your project, pusher will look for a package.json file, and follow what is in any "pusher" key that it finds. So say you have a script called npm.js, that will bump up the patch number of the version number in packgae.json each time it is called.


You will want the package.json file in the root name space to at least look like this:
```
{
  "version": "1.0.0",
  "pusher": {

    "npm": "./scripts/npm.js"
  
  }

}
```

pusher will execute any "call" method that is exported in npm.js

## Other tools like this?

When ever I get an idea for a project I take a look to see if there is all ready something like it. It is true that is almost always the case, so here are some other projects of interest to look into if I never finish this.


### release-it

[release-it](https://www.npmjs.com/package/release-it)

looks like a good one for doing an automatic bump version, commit, tag, push, ect