## npm init

```shell-session
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (gulp-bower) my-sandbox-gulp-bower
version: (0.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: scheakur
license: (ISC) MIT
About to write to /Users/xxx/src/sandbox/gulp-bower/package.json:

{
  "name": "my-sandbox-gulp-bower",
  "version": "0.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "scheakur",
  "license": "MIT"
}


Is this ok? (yes)
```


## install gulp

```
$ npm install --save-dev gulp gulp-util
npm WARN package.json my-sandbox-gulp-bower@0.0.0 No description
npm WARN package.json my-sandbox-gulp-bower@0.0.0 No repository field.
npm WARN package.json my-sandbox-gulp-bower@0.0.0 No README data
npm http GET https://registry.npmjs.org/gulp
npm http GET https://registry.npmjs.org/gulp-util
npm http 304 https://registry.npmjs.org/gulp
npm http 304 https://registry.npmjs.org/gulp-util
npm http GET https://registry.npmjs.org/archy
npm http GET https://registry.npmjs.org/chalk
npm http GET https://registry.npmjs.org/deprecated
npm http GET https://registry.npmjs.org/interpret
npm http GET https://registry.npmjs.org/liftoff
npm http GET https://registry.npmjs.org/minimist
npm http GET https://registry.npmjs.org/orchestrator
npm http GET https://registry.npmjs.org/pretty-hrtime
npm http GET https://registry.npmjs.org/semver
npm http GET https://registry.npmjs.org/tildify
npm http GET https://registry.npmjs.org/vinyl-fs
npm http GET https://registry.npmjs.org/lodash.template
npm http GET https://registry.npmjs.org/lodash._reinterpolate
npm http GET https://registry.npmjs.org/vinyl
npm http GET https://registry.npmjs.org/through2
npm http GET https://registry.npmjs.org/dateformat
npm http GET https://registry.npmjs.org/multipipe
npm http 304 https://registry.npmjs.org/chalk
npm http 304 https://registry.npmjs.org/archy
npm http 304 https://registry.npmjs.org/deprecated
npm http 304 https://registry.npmjs.org/interpret
npm http 304 https://registry.npmjs.org/liftoff
npm http 304 https://registry.npmjs.org/orchestrator
npm http 304 https://registry.npmjs.org/semver
npm http 304 https://registry.npmjs.org/minimist
npm http 304 https://registry.npmjs.org/pretty-hrtime
npm http 304 https://registry.npmjs.org/tildify
npm http 304 https://registry.npmjs.org/vinyl-fs
npm http 304 https://registry.npmjs.org/lodash.template
npm http GET https://registry.npmjs.org/has-color
npm http GET https://registry.npmjs.org/ansi-styles
npm http GET https://registry.npmjs.org/strip-ansi
npm http 304 https://registry.npmjs.org/vinyl
npm http 304 https://registry.npmjs.org/lodash._reinterpolate
npm http GET https://registry.npmjs.org/sequencify
npm http 304 https://registry.npmjs.org/has-color
npm http GET https://registry.npmjs.org/glob-stream
npm http GET https://registry.npmjs.org/glob-watcher
npm http GET https://registry.npmjs.org/graceful-fs
npm http GET https://registry.npmjs.org/map-stream
npm http GET https://registry.npmjs.org/mkdirp
npm http GET https://registry.npmjs.org/strip-bom
npm http 304 https://registry.npmjs.org/ansi-styles
npm http 304 https://registry.npmjs.org/dateformat
npm http 304 https://registry.npmjs.org/strip-ansi
npm http 304 https://registry.npmjs.org/through2
npm http GET https://registry.npmjs.org/findup-sync
npm http GET https://registry.npmjs.org/resolve
npm http GET https://registry.npmjs.org/extend
npm http 304 https://registry.npmjs.org/multipipe
npm http GET https://registry.npmjs.org/lodash.defaults
npm http GET https://registry.npmjs.org/lodash.escape
npm http GET https://registry.npmjs.org/lodash._escapestringchar
npm http GET https://registry.npmjs.org/lodash.keys
npm http GET https://registry.npmjs.org/lodash.templatesettings
npm http GET https://registry.npmjs.org/lodash.values
npm http GET https://registry.npmjs.org/readable-stream
npm http GET https://registry.npmjs.org/xtend
npm http GET https://registry.npmjs.org/duplexer2/0.0.2
npm http 304 https://registry.npmjs.org/glob-stream
npm http 304 https://registry.npmjs.org/graceful-fs
npm http GET https://registry.npmjs.org/clone-stats
npm http 304 https://registry.npmjs.org/sequencify
npm http 304 https://registry.npmjs.org/glob-watcher
npm http 304 https://registry.npmjs.org/map-stream
npm http 304 https://registry.npmjs.org/mkdirp
npm http 304 https://registry.npmjs.org/findup-sync
npm http 304 https://registry.npmjs.org/strip-bom
npm http GET https://registry.npmjs.org/first-chunk-stream
npm http GET https://registry.npmjs.org/is-utf8
npm http 304 https://registry.npmjs.org/lodash.escape
npm http GET https://registry.npmjs.org/gaze
npm http 304 https://registry.npmjs.org/extend
npm http GET https://registry.npmjs.org/glob
npm http GET https://registry.npmjs.org/minimatch
npm http GET https://registry.npmjs.org/ordered-read-streams
npm http GET https://registry.npmjs.org/glob2base
npm http GET https://registry.npmjs.org/unique-stream
npm http GET https://registry.npmjs.org/through
npm http GET https://registry.npmjs.org/minimist/0.0.8
npm http 304 https://registry.npmjs.org/resolve
npm http GET https://registry.npmjs.org/glob
npm http GET https://registry.npmjs.org/lodash
npm http 304 https://registry.npmjs.org/lodash.defaults
npm http 304 https://registry.npmjs.org/lodash._escapestringchar
npm http 304 https://registry.npmjs.org/lodash.keys
npm http 304 https://registry.npmjs.org/lodash.templatesettings
npm http 304 https://registry.npmjs.org/readable-stream
npm http 304 https://registry.npmjs.org/xtend
npm http 304 https://registry.npmjs.org/lodash.values
npm http GET https://registry.npmjs.org/lodash._escapehtmlchar
npm http GET https://registry.npmjs.org/lodash._reunescapedhtml
npm http GET https://registry.npmjs.org/lodash._objecttypes
npm http GET https://registry.npmjs.org/lodash._isnative
npm http GET https://registry.npmjs.org/lodash.isobject
npm http GET https://registry.npmjs.org/lodash._shimkeys
npm http GET https://registry.npmjs.org/object-keys
npm http GET https://registry.npmjs.org/core-util-is
npm http GET https://registry.npmjs.org/isarray/0.0.1
npm http GET https://registry.npmjs.org/string_decoder
npm http GET https://registry.npmjs.org/inherits
npm http 304 https://registry.npmjs.org/duplexer2/0.0.2
npm http 304 https://registry.npmjs.org/is-utf8
npm http 304 https://registry.npmjs.org/first-chunk-stream
npm http 304 https://registry.npmjs.org/clone-stats
npm http 304 https://registry.npmjs.org/glob
npm http 304 https://registry.npmjs.org/minimatch
npm http 304 https://registry.npmjs.org/gaze
npm http GET https://registry.npmjs.org/globule
npm http 304 https://registry.npmjs.org/ordered-read-streams
npm http 304 https://registry.npmjs.org/glob
npm http 304 https://registry.npmjs.org/glob2base
npm http 304 https://registry.npmjs.org/minimist/0.0.8
npm http 304 https://registry.npmjs.org/through
npm http 304 https://registry.npmjs.org/unique-stream
npm http GET https://registry.npmjs.org/lodash.findindex
npm http GET https://registry.npmjs.org/lru-cache
npm http GET https://registry.npmjs.org/sigmund
npm http GET https://registry.npmjs.org/inherits
npm http GET https://registry.npmjs.org/once
npm http 304 https://registry.npmjs.org/lodash
npm http 304 https://registry.npmjs.org/lodash._escapehtmlchar
npm http 304 https://registry.npmjs.org/lodash._reunescapedhtml
npm http 304 https://registry.npmjs.org/lodash._objecttypes
npm http 304 https://registry.npmjs.org/lodash._isnative
npm http GET https://registry.npmjs.org/lodash._htmlescapes
npm http 304 https://registry.npmjs.org/lodash.isobject
npm http 304 https://registry.npmjs.org/lodash._shimkeys
npm http 304 https://registry.npmjs.org/core-util-is
npm http 304 https://registry.npmjs.org/inherits
npm http 304 https://registry.npmjs.org/isarray/0.0.1
npm http 304 https://registry.npmjs.org/object-keys
npm http 304 https://registry.npmjs.org/string_decoder
npm http 304 https://registry.npmjs.org/globule
npm http 304 https://registry.npmjs.org/lru-cache
npm http 304 https://registry.npmjs.org/sigmund
npm http 304 https://registry.npmjs.org/lodash.findindex
npm http GET https://registry.npmjs.org/lodash.createcallback
npm http 304 https://registry.npmjs.org/inherits
npm http 304 https://registry.npmjs.org/once
npm http 304 https://registry.npmjs.org/lodash._htmlescapes
npm http 304 https://registry.npmjs.org/lodash.createcallback
npm http GET https://registry.npmjs.org/lodash._basecreatecallback
npm http GET https://registry.npmjs.org/lodash._baseisequal
npm http GET https://registry.npmjs.org/lodash.property
npm http 304 https://registry.npmjs.org/lodash.property
npm http 304 https://registry.npmjs.org/lodash._basecreatecallback
npm http 304 https://registry.npmjs.org/lodash._baseisequal
npm http GET https://registry.npmjs.org/lodash.bind
npm http GET https://registry.npmjs.org/lodash.identity
npm http GET https://registry.npmjs.org/lodash._setbinddata
npm http GET https://registry.npmjs.org/lodash.support
npm http GET https://registry.npmjs.org/lodash.forin
npm http GET https://registry.npmjs.org/lodash._getarray
npm http GET https://registry.npmjs.org/lodash.isfunction
npm http GET https://registry.npmjs.org/lodash._releasearray
npm http 304 https://registry.npmjs.org/lodash.identity
npm http 304 https://registry.npmjs.org/lodash.support
npm http 304 https://registry.npmjs.org/lodash.bind
npm http 304 https://registry.npmjs.org/lodash._setbinddata
npm http GET https://registry.npmjs.org/lodash._createwrapper
npm http GET https://registry.npmjs.org/lodash._slice
npm http GET https://registry.npmjs.org/lodash.noop
npm http 304 https://registry.npmjs.org/lodash.forin
npm http 304 https://registry.npmjs.org/lodash._getarray
npm http 304 https://registry.npmjs.org/lodash._releasearray
npm http 304 https://registry.npmjs.org/lodash.isfunction
npm http GET https://registry.npmjs.org/lodash._arraypool
npm http GET https://registry.npmjs.org/lodash._maxpoolsize
npm http 304 https://registry.npmjs.org/lodash._slice
npm http 304 https://registry.npmjs.org/lodash._createwrapper
npm http 304 https://registry.npmjs.org/lodash.noop
npm http GET https://registry.npmjs.org/lodash._basebind
npm http GET https://registry.npmjs.org/lodash._basecreatewrapper
npm http 304 https://registry.npmjs.org/lodash._arraypool
npm http 304 https://registry.npmjs.org/lodash._maxpoolsize
npm http 304 https://registry.npmjs.org/lodash._basebind
npm http 304 https://registry.npmjs.org/lodash._basecreatewrapper
npm http GET https://registry.npmjs.org/lodash._basecreate
npm http 304 https://registry.npmjs.org/lodash._basecreate
gulp-util@2.2.16 node_modules/gulp-util
├── lodash._reinterpolate@2.4.1
├── dateformat@1.0.8-1.2.3
├── chalk@0.4.0 (ansi-styles@1.0.0, has-color@0.1.7, strip-ansi@0.1.1)
├── minimist@0.1.0
├── vinyl@0.2.3 (clone-stats@0.0.1)
├── through2@0.4.2 (xtend@2.1.2, readable-stream@1.0.27-1)
├── multipipe@0.1.1 (duplexer2@0.0.2)
└── lodash.template@2.4.1 (lodash._escapestringchar@2.4.1, lodash.values@2.4.1, lodash.templatesettings@2.4.1, lodash.defaults@2.4.1, lodash.keys@2.4.1, lodash.escape@2.4.1)

gulp@3.7.0 node_modules/gulp
├── tildify@0.2.0
├── interpret@0.3.3
├── pretty-hrtime@0.2.1
├── deprecated@0.0.1
├── archy@0.0.2
├── minimist@0.1.0
├── semver@2.3.0
├── chalk@0.4.0 (ansi-styles@1.0.0, has-color@0.1.7, strip-ansi@0.1.1)
├── orchestrator@0.3.3 (sequencify@0.0.7)
├── liftoff@0.11.1 (extend@1.2.1, resolve@0.7.0, findup-sync@0.1.3)
└── vinyl-fs@0.2.1 (map-stream@0.1.0, graceful-fs@3.0.0, strip-bom@0.3.1, vinyl@0.2.3, mkdirp@0.5.0, glob-watcher@0.0.6, glob-stream@3.1.11)
```

## bower init

```shell-session
$ bower init
[?] name: my-sandbox-gulp-bower
[?] version: 0.0.0
[?] description: 
[?] main file: 
[?] what types of modules does this package expose? amd
[?] keywords: 
[?] authors: scheakur <scheakur@gmail.com>
[?] license: MIT
[?] homepage: https://github.com/scheakur/sandbox
[?] set currently installed components as dependencies? Yes
[?] add commonly ignored files to ignore list? Yes
[?] would you like to mark this package as private which prevents it from being accidentally published to the registry? YesN) y

{
  name: 'my-sandbox-gulp-bower',
  version: '0.0.0',
  homepage: 'https://github.com/scheakur/sandbox',
  authors: [
    'scheakur <scheakur@gmail.com>'
  ],
  moduleType: [
    'amd'
  ],
  license: 'MIT',
  private: true,
  ignore: [
    '**/.*',
    'node_modules',
    'bower_components',
    'test',
    'tests'
  ]
}

[?] Looks good? Yes
```


## install jQuery

```shell-session
$ bower install --save jquery jquery-ui
bower jquery-ui#*           not-cached git://github.com/components/jqueryui.git#*
bower jquery-ui#*              resolve git://github.com/components/jqueryui.git#*
bower jquery#*              not-cached git://github.com/jquery/jquery.git#*
bower jquery#*                 resolve git://github.com/jquery/jquery.git#*
bower jquery-ui#*             download https://github.com/components/jqueryui/archive/1.10.4.tar.gz
bower jquery#*                download https://github.com/jquery/jquery/archive/2.1.1.tar.gz
bower jquery#*                 extract archive.tar.gz
bower jquery-ui#*              extract archive.tar.gz
bower jquery#*                resolved git://github.com/jquery/jquery.git#2.1.1
bower jquery-ui#*             resolved git://github.com/components/jqueryui.git#1.10.4
bower jquery#>=1.6              cached git://github.com/jquery/jquery.git#2.1.1
bower jquery#>=1.6            validate 2.1.1 against git://github.com/jquery/jquery.git#>=1.6
bower jquery#>=1.6             install jquery#2.1.1
bower jquery-ui#~1.10.4        install jquery-ui#1.10.4

jquery#2.1.1 bower_components/jquery

jquery-ui#1.10.4 bower_components/jquery-ui
└── jquery#2.1.1
```


## install gulp-bower-files

```shell-session
$ npm install --save-dev gulp-bower-files
npm WARN package.json my-sandbox-gulp-bower@0.0.0 No description
npm WARN package.json my-sandbox-gulp-bower@0.0.0 No repository field.
npm WARN package.json my-sandbox-gulp-bower@0.0.0 No README data
npm http GET https://registry.npmjs.org/gulp-bower-files
npm http 200 https://registry.npmjs.org/gulp-bower-files
npm http GET https://registry.npmjs.org/gulp-bower-files/-/gulp-bower-files-0.2.4.tgz
npm http 200 https://registry.npmjs.org/gulp-bower-files/-/gulp-bower-files-0.2.4.tgz
gulp-bower-files@0.2.4 node_modules/gulp-bower-files
```

## install other gulp plugins

```shell-session
$ npm install --save-dev gulp-flatten gulp-uglify
npm WARN package.json my-sandbox-gulp-bower@0.0.0 No description
npm WARN package.json my-sandbox-gulp-bower@0.0.0 No repository field.
npm WARN package.json my-sandbox-gulp-bower@0.0.0 No README data
npm http GET https://registry.npmjs.org/gulp-flatten
npm http GET https://registry.npmjs.org/gulp-uglify
npm http 304 https://registry.npmjs.org/gulp-uglify
npm http 304 https://registry.npmjs.org/gulp-flatten
npm http GET https://registry.npmjs.org/through2
npm http GET https://registry.npmjs.org/deepmerge
npm http GET https://registry.npmjs.org/uglify-js
npm http 304 https://registry.npmjs.org/through2
npm http GET https://registry.npmjs.org/readable-stream
npm http GET https://registry.npmjs.org/xtend
npm http 304 https://registry.npmjs.org/deepmerge
npm http 304 https://registry.npmjs.org/uglify-js
npm http GET https://registry.npmjs.org/async
npm http GET https://registry.npmjs.org/uglify-to-browserify
npm http GET https://registry.npmjs.org/source-map
npm http GET https://registry.npmjs.org/optimist
npm http 304 https://registry.npmjs.org/readable-stream
npm http 304 https://registry.npmjs.org/optimist
npm http 304 https://registry.npmjs.org/xtend
npm http GET https://registry.npmjs.org/object-keys
npm http GET https://registry.npmjs.org/core-util-is
npm http GET https://registry.npmjs.org/isarray/0.0.1
npm http GET https://registry.npmjs.org/string_decoder
npm http GET https://registry.npmjs.org/inherits
npm http 304 https://registry.npmjs.org/async
npm http 304 https://registry.npmjs.org/source-map
npm http 304 https://registry.npmjs.org/uglify-to-browserify
npm http 304 https://registry.npmjs.org/isarray/0.0.1
npm http 304 https://registry.npmjs.org/string_decoder
npm http GET https://registry.npmjs.org/wordwrap
npm http GET https://registry.npmjs.org/amdefine
npm http 304 https://registry.npmjs.org/core-util-is
npm http 304 https://registry.npmjs.org/inherits
npm http 304 https://registry.npmjs.org/object-keys
npm http 304 https://registry.npmjs.org/wordwrap
npm http 304 https://registry.npmjs.org/amdefine
gulp-flatten@0.0.2 node_modules/gulp-flatten
└── through2@0.4.2 (readable-stream@1.0.27-1, xtend@2.1.2)

gulp-uglify@0.3.0 node_modules/gulp-uglify
├── deepmerge@0.2.7
├── through2@0.4.2 (readable-stream@1.0.27-1, xtend@2.1.2)
└── uglify-js@2.4.13 (uglify-to-browserify@1.0.2, async@0.2.10, optimist@0.3.7, source-map@0.1.33)
```


## edit gulpfile.js

```shell-session
$ vim gulpfile.js
```


## do gulp bower

```shell-session
$ gulp bower
[gulp] Using gulpfile ~/src/sandbox/gulp-bower/gulpfile.js
[gulp] Starting 'bower'...
[gulp] Finished 'bower' after 6.49 ms
```
