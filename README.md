## Angular 2 CLI

Vorpal & Webpack based CLI for Angular2 applications.

### Installation

```sh
npm i ng2-cli -g
```

### Usage

Start cli with the `ng2` command.

### Available Commands

* [new](#new)
* [generate](#generate)
* [serve](#serve)
* [build](#build)
* [info](#info)
* [find](#find)
* [pwd](#pwd)
* [cd](#cd)
* [clear](#clear)

## new

Creates new project and steps into directory.

```sh
new my-awesome-project
```

#### Available options

* `name` - name of your project (required)
* `path` - path where project will be created
* `skip-npm` - skips the npm dependencies installation
* `skip-git` - skips git initialization

## generate

Generates Angular2 component.

Scaffold  | Usage
---       | ---
Component | `generate component my-new-component`
Directive | `generate directive my-new-directive`
Pipe      | `generate pipe my-new-pipe`
Service   | `generate service my-new-service`
Class     | `generate class my-new-class`
Interface | `generate interface my-new-interface`

All generated components are automatically imported into main AppModule and injected in declarations.

## server

Serves your application.

```sh
server
```

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

Prints the info of the current project.

```
info
```

## find

Searches for projects in current directory.

```
find
```

## pwd

Prints current working directory.

```
pwd
```

## cd

Changes current working directory.

```
cd /Users/jan/Desktop/app
```
