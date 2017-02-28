# pusher

This is a simple tool I have made to help better manage my work flow when working on a project.


The basic usage would be something like this:

```bash
$ pusher -m "This is a new patch"
```

which would do the following:

* checks if the current working folder is a git folder
* if it is checks for a package.json file
* opens the package.json file and bumps the patch number up one
* after writing the change to package.json pusher will do a:
* $ git add *
* $ git commit -m "This is a new patch"
* $ git push