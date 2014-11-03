# grunt-init Chaplin Boilerplate V1.0.0
Based on https://github.com/chaplinjs/grunt-init-chaplin.

> Create a complete Chaplin.js application with [grunt-init](http://gruntjs.com/project-scaffolding).

This boilerplate using Chaplin with :

- grunt
- bower
- require
- almond
- jquery
- handlebars (pre-compile template)
- bootstrap

## Requirements

- [npm](https://npmjs.org/)
- [grunt-init](http://gruntjs.com/project-scaffolding).


## Installation

Once grunt-init is installed, place this template in your `~/.grunt-init/`
directory (`%USERPROFILE%\.grunt-init\` on Windows). It's recommended that you
use git to clone this template into that directory, as follows:

```sh
git clone git://github.com/akenny44/Grunt-init_Chaplin_boilerplate.git ~/.grunt-init/chaplin-boilerplate
```


## Create new project with template

At the command-line, change into an empty directory, run this command
and follow the prompts.

```sh
grunt-init chaplin-boilerplate
```

> Note that this template will generate files in the current directory, so
be sure to change to a new directory first if you don't want to overwrite
existing files.


## Get dependencies

Go to root folder of your new project and run this command for get node dependencies.

```sh
npm install
```

> now you can use grunt commande for build or run your app.


And run this other command for get bower packages.

```sh
grunt prepare
```

> now your application have all bower dependencies in "src/components".


## Run server

For launch application with connect node plugin, run this commande.

```sh
grunt server_dev
```

> now you can connect to your app with url : http://localhost:8000

This command will run **build_dev** task for build development appliation.

## Build application for development

```sh
grunt build_dev
```

> This commande will do this actions :
* **JSHint**, a tool that helps to detect errors.
* pre-compile **Handlebars** templates.

## Build application for production

```sh
grunt build_prod
```

> This commande will do this actions :
* actions in **build_dev** task.
* join and minify **CSS** files.
* join and minify **JS** require files.
* minify **index.html** file.

> Your application folder (build) will contains 3 minifed files (html/javascript/css)
+-- build
|  +-- scripts
|  |  -- main.js
|  +-- css
|  |  -- main.css
|  -- index.html



Launch prod. application with this commande.

```sh
grunt server_prod
```


## Changelog

V1.0.0 : initial version
