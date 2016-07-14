## Angular-CLI

### Installation

```sh
npm i "jkuri/angular-cli-vorpal" -g
```

### Usage

Start cli with the `ng2` command.

### Available Commands

* [new](#new)
* [serve](#serve)
* [build](#build)
* [info](#info)
* [pwd](#pwd)
* [cd](#cd)
* [clear](#clear)

## new

Creates new project and steps into directory.

```sh
new --name app --path /Users/jan/Desktop
```

#### Available options

* `name` - name of your project (required)
* `path` - path where project will be created
* `skip-npm` - skips the npm dependencies installation
* `skip-git` - skips git initialization

## serve

Serves your application.

```sh
serve
```

Then open your browser at `http://localhost:4200`

If you want a live-reloading option enabled open at `http://localhost:4200/webpack-dev-server/index.html`

## build

Builds your project.
You must be in project directory to build your project.

```sh
build
```

## clear

Clears the terminal window.

```
clear
```

## info

Prints the info of the current project. (not implemented yet)

```
info
```

## pwd

Prints current working directory.

```
pwd
```

## cd

Changes current working directory.

```
cd -p /Users/jan/Desktop/app
```
