# Vaah

> Command line tool to Generate Files for Rapid Development

Please consider starring the project to show your :heart: and support.


## Feature Roadmap

#### Completed
:white_check_mark: VaahCMS Installer

:white_check_mark: VaahCMS Module Generator

:white_check_mark: VaahCMS Module CRUD Generator

:white_check_mark: VaahCMS Theme Generator

:white_check_mark: VaahCMS Theme Auth Generator

:white_check_mark: VaahCMS Modules Files  (migration, model, view, controller, seed )

:white_check_mark: VaahCMS Themes Files  (migration, model, view, controller, seed )

#### Planned
:black_square_button: Laravel Package Development

:black_square_button: Laravel Files (migration, model, view, controller, seed )

:black_square_button: WordPress Theme

:black_square_button: WordPress Plugin


## Install

Install with [npm](https://www.npmjs.com/):

```sh
npm install -g vaah
```


---

[Quick Command Generator](https://vaah.dev/cms/docs/generators)

## VaahCms Installer
- `vaah cms:install` or `npx vaah cms:install` : It will install vaahcms in newly created `vaahcms` folder
- `vaah cms:install [FOLDER]` : To install VaahCMS
- `vaah cms:install --here` : To install VaahCMS in current director


## VaahFlutter Installer
- `vaah flutter:install` or `npx vaah flutter:install` : It will install VaahFlutter in newly created `vaahflutter` folder

## VaahCms Module Generators
List of commands:
- `vaah cms:m`  or `npx vaah cms:m` : To generate module
- `vaah cms:crud`  or `npx vaah cms:crud` : To generator crud operation file for module
- `vaah cms:users`  or `npx vaah cms:users` : Vue 3: To Generate Users CRUD operations for VaahCMS
- `vaah cms:taxonomies`  or `npx vaah cms:taxonomies` : Vue 3: To Generate Taxonomies CRUD operations for VaahCMS
- `vaah cms:settings`  or `npx vaah cms:settings` : Vue 3: To Generate Setting for VaahCMS

All following commands accept option parameter `-f <folder_name>` or `-folder <folder_name>`
- `vaah cms:m-make migration <module> <name>` : To generate module migration
- `vaah cms:m-make seed <module> <name>` : To generate module seed
- `vaah cms:m-make model <module> <name>` : To generate module model
- `vaah cms:m-make controller <module> <name>` : To generate module controller
- `vaah cms:m-make view <module> <name>` : To generate module view
- `vaah cms:m-make middleware <module> <name>` : To generate module middleware
- `vaah cms:m-make observer <module> <name>` : To generate module observer
- `vaah cms:m-make trait <module> <name>` : To generate module trait
- `vaah cms:m-make test <module> <name>` : To generate module browser test
- `vaah cms:m-make event <module> <name>` : To generate module events
- `vaah cms:m-make listener <module> <name>` : To generate module listener
- `vaah cms:m-make mail <module> <name>` : To generate module email
- `vaah cms:m-make notification <module> <name>` : To generate module notification

## VaahCms Theme Generators
List of commands:
- `vaah cms:t`  or `npx vaah cms:t` : To generate theme
- `vaah cms:auth`  or `npx vaah cms:auth`: Generate Sign in & Sign up, authentication scaffolding


All following commands accept option parameter `-f <folder_name>` or `-folder <folder_name>`
- `vaah cms:t-make migration <theme> <name>` : To generate theme migration
- `vaah cms:t-make seed <theme> <name>` : To generate theme seed
- `vaah cms:t-make model <theme> <name>` : To generate theme model
- `vaah cms:t-make controller <theme> <name>` : To generate theme controller
- `vaah cms:t-make view <theme> <theme>` : To generate theme view
- `vaah cms:t-make middleware <theme> <name>` : To generate theme middleware
- `vaah cms:t-make observer <theme> <name>` : To generate theme observer
- `vaah cms:t-make trait <theme> <name>` : To generate theme trait
- `vaah cms:t-make test <theme> <name>` : To generate theme browser test


## Laravel Generators

### Laravel Package Development
1. Create a folder as `packages` at root of laravel installation
2. Create your package folder. Eg. if your package name is `HelloWorld` then your folder name should be `hello-world`
3. Open the folder in command line and run `vaah laravel make:package`. It will start wizard and ask you the Vendor Name & Package Name.
4. Once your package is generated, you need add the path in composer.json file of laravel:
    ```json
     ...
        "autoload-dev": {
            "classmap": [
                "tests/TestCase.php"
            ],
            "psr-4": {
                "YourVendorName\\YourPackageName\\": "packages-scr-path"
            }
        },
        ...
    ```
5. Register your package's service provider at `config/app.php`: `YourVendorName\YourPackageName\YourPackageNameServiceProvider::class,`. 

6. Finally, run `composer dump-autoload`. 

**That's it, your package is ready for use in development environment.**

#### You have access to following commands as well:

| Command        | Alias           | Details  |
| ------------- |:-------------:| -----:|
| `vaah laravel make:package`      | `vaah lv:p` | To general Laravel package |
| `vaah laravel make:package-reset`      | `vaah lv:p-reset`      | To reset/delete generate files. |
| `vaah laravel make:package-file [type] [name]`      | `vaah lv:p-file [type] [name]`      | To generate package file. |

List of commands:
- `vaah lv:p-file model fileName`
- `vaah lv:p-file view fileName`
- `vaah lv:p-file controller fileName`
- `vaah lv:p-file seed fileName`
- `vaah lv:p-file migration fileName`

## Support us

[WebReinvent](https://www.webreinvent.com) is a web agency based in Delhi, India. You'll find an overview of all our open source projects [on github](https://github.com/webreinvent).

## Setup Development Environment 

#### Step 1:
Clone this repository

#### Step 2:
Run `npm install`


#### Step 4:
Now you can run `vaah` commands in development mode from terminal like:
```sh
bin\run [COMMAND]
bin\run DEBUG=* [COMMAND] //for command debbuging
bin\run lv:p
bin\run cms:install
bin\run cms:m
bin\run cms:crud // crud file for any section
bin\run cms:t
bin\run cms:auth
```

*Windows: If you want to debug the command then run following command first on:
```shell script
set DEBUG=*
```

#### Step 5:
Run following command to publish the package to `npm`:

Change the version in `package.json` then run

```sh
npm publish
```

#### Step 6: Change log
To generate `CHANGELOG.md`, use following command:
```sh
auto-changelog
```

---

### Change Log
- Install `npm install auto-changelog -g`
- To generate `CHANGELOG.md`, run `auto-changelog` in the root folder of the project

Maintain following pre-fixes to your commit messages:
```md
Added:
Changed:
Deprecated:
Removed:
Fixed:
Security:
```

---

<!-- toc -->
* [Vaah](#vaah)
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
vaah/3.0.5 darwin-arm64 node-v18.18.0
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vaah cms:auth`](#vaah-cmsauth)
* [`vaah cms:crud`](#vaah-cmscrud)
* [`vaah cms:install [PROJECT_NAME]`](#vaah-cmsinstall-project_name)
* [`vaah cms:m`](#vaah-cmsm)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello PERSON`](#vaah-hello-person)
* [`vaah hello:world`](#vaah-helloworld)
* [`vaah help [COMMAND]`](#vaah-help-command)
* [`vaah plugins`](#vaah-plugins)
* [`vaah plugins:install PLUGIN...`](#vaah-pluginsinstall-plugin)
* [`vaah plugins:inspect PLUGIN...`](#vaah-pluginsinspect-plugin)
* [`vaah plugins:install PLUGIN...`](#vaah-pluginsinstall-plugin-1)
* [`vaah plugins:link PLUGIN`](#vaah-pluginslink-plugin)
* [`vaah plugins:uninstall PLUGIN...`](#vaah-pluginsuninstall-plugin)
* [`vaah plugins:reset`](#vaah-pluginsreset)
* [`vaah plugins:uninstall PLUGIN...`](#vaah-pluginsuninstall-plugin-1)
* [`vaah plugins:uninstall PLUGIN...`](#vaah-pluginsuninstall-plugin-2)
* [`vaah plugins:update`](#vaah-pluginsupdate)

## `vaah cms:auth`

Generate CRUD operations for VaahCMS

```
USAGE
  $ vaah cms:auth [--help]

FLAGS
  --help  Generate Auth operation for VaahCMS Themes

DESCRIPTION
  Generate CRUD operations for VaahCMS
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/cms/auth.ts)_

## `vaah cms:crud`

Generate CRUD operations for VaahCMS

```
USAGE
  $ vaah cms:crud [--help]

FLAGS
  --help  Generate CRUD operation for VaahCMS

DESCRIPTION
  Generate CRUD operations for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

Install VaahCMS

```
USAGE
  $ vaah cms:install [PROJECT_NAME] [--here] [-h]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

FLAGS
  -h, --help  Show CLI help.
      --here  If you want to install VaahCMS in current directory

DESCRIPTION
  Install VaahCMS
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/cms/install.ts)_

## `vaah cms:m`

To generate module for VaahCMS

```
USAGE
  $ vaah cms:m [-h] [-n] [-f]

FLAGS
  -f, --force
  -h, --help   Show CLI help.
  -n, --name   Show CLI help.

DESCRIPTION
  To generate module for VaahCMS
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/cms/m.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

Generate for VaahCMS Module

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME [-f] [-b] [-h] [-n]

FLAGS
  -b, --backend
  -f, --frontend
  -h, --help      Show CLI help.
  -n, --name      Show CLI help.

DESCRIPTION
  Generate for VaahCMS Module
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

Vue3: Generate User CRUD for VaahCMS

```
USAGE
  $ vaah cms:settings [--help]

FLAGS
  --help  Vue3: Generate User CRUD for VaahCMS

DESCRIPTION
  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/cms/settings.ts)_

## `vaah cms:t`

To generate theme for VaahCMS

```
USAGE
  $ vaah cms:t [-h] [-n] [-f]

FLAGS
  -f, --force
  -h, --help   Show CLI help.
  -n, --name   Show CLI help.

DESCRIPTION
  To generate theme for VaahCMS
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

Generate for VaahCMS Theme

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME [-f] [-b] [-h] [-n]

FLAGS
  -b, --backend
  -f, --frontend
  -h, --help      Show CLI help.
  -n, --name      Show CLI help.

DESCRIPTION
  Generate for VaahCMS Theme
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

Vue 3: Generate Taxonomies CRUD operations for VaahCMS

```
USAGE
  $ vaah cms:taxonomies [--help]

FLAGS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS

DESCRIPTION
  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

Vue3: Generate User CRUD for VaahCMS

```
USAGE
  $ vaah cms:users [--help]

FLAGS
  --help  Vue3: Generate User CRUD for VaahCMS

DESCRIPTION
  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/cms/users.ts)_

## `vaah flutter:install`

Installation of VaahFlutter

```
USAGE
  $ vaah flutter:install [--help]

FLAGS
  --help  Installation of VaahFlutter

DESCRIPTION
  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/flutter/install.ts)_

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

_See code: [src/commands/hello/index.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/hello/index.ts)_

## `vaah hello:world`

Say hello world

```
USAGE
  $ vaah hello:world

DESCRIPTION
  Say hello world

EXAMPLES
  $ vaah hello:world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/webreinvent/vaah/blob/v3.0.5/src/commands/hello/world.ts)_

## `vaah help [COMMAND]`

Display help for vaah.

```
USAGE
  $ vaah help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for vaah.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.0.18/src/commands/help.ts)_

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.8/src/commands/plugins/index.ts)_

## `vaah plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ vaah plugins:add plugins:install PLUGIN...

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ vaah plugins:add

EXAMPLES
  $ vaah plugins:add myplugin 

  $ vaah plugins:add https://github.com/someuser/someplugin

  $ vaah plugins:add someuser/someplugin
```

## `vaah plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ vaah plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

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

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.8/src/commands/plugins/inspect.ts)_

## `vaah plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ vaah plugins:install PLUGIN...

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -s, --silent   Silences yarn output.
  -v, --verbose  Show verbose yarn output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ vaah plugins:add

EXAMPLES
  $ vaah plugins:install myplugin 

  $ vaah plugins:install https://github.com/someuser/someplugin

  $ vaah plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.8/src/commands/plugins/install.ts)_

## `vaah plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ vaah plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ vaah plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.8/src/commands/plugins/link.ts)_

## `vaah plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ vaah plugins:remove plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ vaah plugins:unlink
  $ vaah plugins:remove

EXAMPLES
  $ vaah plugins:remove myplugin
```

## `vaah plugins:reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ vaah plugins:reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.8/src/commands/plugins/reset.ts)_

## `vaah plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ vaah plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ vaah plugins:unlink
  $ vaah plugins:remove

EXAMPLES
  $ vaah plugins:uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.8/src/commands/plugins/uninstall.ts)_

## `vaah plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ vaah plugins:unlink plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ vaah plugins:unlink
  $ vaah plugins:remove

EXAMPLES
  $ vaah plugins:unlink myplugin
```

## `vaah plugins:update`

Update installed plugins.

```
USAGE
  $ vaah plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v4.3.8/src/commands/plugins/update.ts)_
<!-- commandsstop -->




#### Oclif Docs:
- Spinner - https://oclif.io/docs/spinner 


#### Framework
- https://oclif.io/ - For developing CLI Tool
- https://yeoman.io/ - SCAFFOLDING TOOL 

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
