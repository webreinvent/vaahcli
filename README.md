oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g vaah
$ vaah COMMAND
running command...
$ vaah (--version)
vaah/2.0.0 darwin-arm64 node-v18.18.0
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vaah hello PERSON`](#vaah-hello-person)
* [`vaah hello world`](#vaah-hello-world)
* [`vaah help [COMMANDS]`](#vaah-help-commands)
* [`vaah plugins`](#vaah-plugins)
* [`vaah plugins:install PLUGIN...`](#vaah-pluginsinstall-plugin)
* [`vaah plugins:inspect PLUGIN...`](#vaah-pluginsinspect-plugin)
* [`vaah plugins:install PLUGIN...`](#vaah-pluginsinstall-plugin-1)
* [`vaah plugins:link PLUGIN`](#vaah-pluginslink-plugin)
* [`vaah plugins:uninstall PLUGIN...`](#vaah-pluginsuninstall-plugin)
* [`vaah plugins:uninstall PLUGIN...`](#vaah-pluginsuninstall-plugin-1)
* [`vaah plugins:uninstall PLUGIN...`](#vaah-pluginsuninstall-plugin-2)
* [`vaah plugins update`](#vaah-plugins-update)

## `vaah hello PERSON`

Say hello

```
USAGE
  $ vaah hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/webreinvent/vaahcli/blob/v2.0.0/src/commands/hello/index.ts)_

## `vaah hello world`

Say hello world

```
USAGE
  $ vaah hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ vaah hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/webreinvent/vaahcli/blob/v2.0.0/src/commands/hello/world.ts)_

## `vaah help [COMMANDS]`

Display help for vaah.

```
USAGE
  $ vaah help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for vaah.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.20/src/commands/help.ts)_

## `vaah plugins`

List installed plugins.

```
USAGE
  $ vaah plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ vaah plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.3/src/commands/plugins/index.ts)_

## `vaah plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ vaah plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ vaah plugins add

EXAMPLES
  $ vaah plugins:install myplugin 

  $ vaah plugins:install https://github.com/someuser/someplugin

  $ vaah plugins:install someuser/someplugin
```

## `vaah plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ vaah plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ vaah plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.3/src/commands/plugins/inspect.ts)_

## `vaah plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ vaah plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ vaah plugins add

EXAMPLES
  $ vaah plugins:install myplugin 

  $ vaah plugins:install https://github.com/someuser/someplugin

  $ vaah plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.3/src/commands/plugins/install.ts)_

## `vaah plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ vaah plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ vaah plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.3/src/commands/plugins/link.ts)_

## `vaah plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ vaah plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ vaah plugins unlink
  $ vaah plugins remove
```

## `vaah plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ vaah plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ vaah plugins unlink
  $ vaah plugins remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.3/src/commands/plugins/uninstall.ts)_

## `vaah plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ vaah plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ vaah plugins unlink
  $ vaah plugins remove
```

## `vaah plugins update`

Update installed plugins.

```
USAGE
  $ vaah plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v3.8.3/src/commands/plugins/update.ts)_
<!-- commandsstop -->
