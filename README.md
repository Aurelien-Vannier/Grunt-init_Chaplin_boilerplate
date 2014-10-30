# grunt-init Chaplin Boilerplate
Based on https://github.com/chaplinjs/grunt-init-chaplin.

> Create a complete Chaplin.js application with [grunt-init](http://gruntjs.com/project-scaffolding).

> This boilerplate using Chaplin with :

- grunt
- bower
- require
- almond
- jquery
- handlebars
- bootstrap

## Requirements

- [npm](https://npmjs.org/)
- [grunt-init][].


## Installation

Once grunt-init is installed, place this template in your `~/.grunt-init/`
directory (`%USERPROFILE%\.grunt-init\` on Windows). It's recommended that you
use git to clone this template into that directory, as follows:

```sh
git clone git://github.com/chaplinjs/grunt-init-chaplin.git ~/.grunt-init/chaplin-boilerplate
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
grunt server
```

> now you can connect to your app with url : http://localhost:8000

## Build application for production

```sh
grunt build
```

Launch prod. application with this commande.

```sh
grunt server_prod
```

