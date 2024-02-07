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
* [Vaah](#vaah)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Vaah](#vaah)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Vaah](#vaah)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Vaah](#vaah)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Vaah](#vaah)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Vaah](#vaah)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Vaah](#vaah)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
* [Vaah](#vaah)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
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
$ vaah (-v|--version|version)
vaah/2.3.8 win32-x64 node-v18.12.1
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g vaah
$ vaah COMMAND
running command...
$ vaah (-v|--version|version)
vaah/2.3.7 win32-x64 node-v18.12.1
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g vaah
$ vaah COMMAND
running command...
$ vaah (-v|--version|version)
vaah/2.3.6 win32-x64 node-v18.12.1
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g vaah
$ vaah COMMAND
running command...
$ vaah (-v|--version|version)
vaah/2.3.5 win32-x64 node-v18.12.1
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g vaah
$ vaah COMMAND
running command...
$ vaah (-v|--version|version)
vaah/2.3.4 win32-x64 node-v18.12.1
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g vaah
$ vaah COMMAND
running command...
$ vaah (-v|--version|version)
vaah/2.3.3 win32-x64 node-v18.12.1
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g vaah
$ vaah COMMAND
running command...
$ vaah (-v|--version|version)
vaah/2.3.2 win32-x64 node-v18.12.1
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g vaah
$ vaah COMMAND
running command...
$ vaah (-v|--version|version)
vaah/2.3.1 win32-x64 node-v18.12.1
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g vaah
$ vaah COMMAND
running command...
$ vaah (-v|--version|version)
vaah/2.3.0 win32-x64 node-v18.12.1
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g vaah
$ vaah COMMAND
running command...
$ vaah (-v|--version|version)
vaah/2.2.8 darwin-arm64 node-v18.18.0
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
* [`vaah cms:m-crud`](#vaah-cmsm-crud)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:auth`

```
USAGE
  $ vaah cms:auth

OPTIONS
  --help  Generate Auth operation for VaahCMS Themes
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/auth.ts)_

## `vaah cms:crud`

```
USAGE
  $ vaah cms:crud

OPTIONS
  --help  Generate CRUD operation for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

```
USAGE
  $ vaah cms:install [PROJECT_NAME]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

OPTIONS
  -h, --help  show CLI help
  --here      If you want to install VaahCMS in current directory
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/install.ts)_

## `vaah cms:m`

```
USAGE
  $ vaah cms:m

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/m.ts)_

## `vaah cms:m-crud`

```
USAGE
  $ vaah cms:m-crud

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m-crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/m-crud.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

```
USAGE
  $ vaah cms:settings

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/settings.ts)_

## `vaah cms:t`

```
USAGE
  $ vaah cms:t

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

```
USAGE
  $ vaah cms:taxonomies

OPTIONS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

```
USAGE
  $ vaah cms:users

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/cms/users.ts)_

## `vaah flutter:install`

```
USAGE
  $ vaah flutter:install

OPTIONS
  --help  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/flutter/install.ts)_

## `vaah hello [FILE]`

```
USAGE
  $ vaah hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vaah hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v2.3.8/src/commands/hello.ts)_

## `vaah help [COMMAND]`

```
USAGE
  $ vaah help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
* [`vaah cms:auth`](#vaah-cmsauth)
* [`vaah cms:crud`](#vaah-cmscrud)
* [`vaah cms:install [PROJECT_NAME]`](#vaah-cmsinstall-project_name)
* [`vaah cms:m`](#vaah-cmsm)
* [`vaah cms:m-crud`](#vaah-cmsm-crud)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:auth`

```
USAGE
  $ vaah cms:auth

OPTIONS
  --help  Generate Auth operation for VaahCMS Themes
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/auth.ts)_

## `vaah cms:crud`

```
USAGE
  $ vaah cms:crud

OPTIONS
  --help  Generate CRUD operation for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

```
USAGE
  $ vaah cms:install [PROJECT_NAME]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

OPTIONS
  -h, --help  show CLI help
  --here      If you want to install VaahCMS in current directory
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/install.ts)_

## `vaah cms:m`

```
USAGE
  $ vaah cms:m

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/m.ts)_

## `vaah cms:m-crud`

```
USAGE
  $ vaah cms:m-crud

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m-crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/m-crud.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

```
USAGE
  $ vaah cms:settings

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/settings.ts)_

## `vaah cms:t`

```
USAGE
  $ vaah cms:t

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

```
USAGE
  $ vaah cms:taxonomies

OPTIONS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

```
USAGE
  $ vaah cms:users

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/cms/users.ts)_

## `vaah flutter:install`

```
USAGE
  $ vaah flutter:install

OPTIONS
  --help  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/flutter/install.ts)_

## `vaah hello [FILE]`

```
USAGE
  $ vaah hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vaah hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v2.3.7/src/commands/hello.ts)_

## `vaah help [COMMAND]`

```
USAGE
  $ vaah help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
* [`vaah cms:auth`](#vaah-cmsauth)
* [`vaah cms:crud`](#vaah-cmscrud)
* [`vaah cms:install [PROJECT_NAME]`](#vaah-cmsinstall-project_name)
* [`vaah cms:m`](#vaah-cmsm)
* [`vaah cms:m-crud`](#vaah-cmsm-crud)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:auth`

```
USAGE
  $ vaah cms:auth

OPTIONS
  --help  Generate Auth operation for VaahCMS Themes
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/auth.ts)_

## `vaah cms:crud`

```
USAGE
  $ vaah cms:crud

OPTIONS
  --help  Generate CRUD operation for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

```
USAGE
  $ vaah cms:install [PROJECT_NAME]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

OPTIONS
  -h, --help  show CLI help
  --here      If you want to install VaahCMS in current directory
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/install.ts)_

## `vaah cms:m`

```
USAGE
  $ vaah cms:m

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/m.ts)_

## `vaah cms:m-crud`

```
USAGE
  $ vaah cms:m-crud

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m-crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/m-crud.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

```
USAGE
  $ vaah cms:settings

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/settings.ts)_

## `vaah cms:t`

```
USAGE
  $ vaah cms:t

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

```
USAGE
  $ vaah cms:taxonomies

OPTIONS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

```
USAGE
  $ vaah cms:users

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/cms/users.ts)_

## `vaah flutter:install`

```
USAGE
  $ vaah flutter:install

OPTIONS
  --help  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/flutter/install.ts)_

## `vaah hello [FILE]`

```
USAGE
  $ vaah hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vaah hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v2.3.6/src/commands/hello.ts)_

## `vaah help [COMMAND]`

```
USAGE
  $ vaah help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
* [`vaah cms:auth`](#vaah-cmsauth)
* [`vaah cms:crud`](#vaah-cmscrud)
* [`vaah cms:install [PROJECT_NAME]`](#vaah-cmsinstall-project_name)
* [`vaah cms:m`](#vaah-cmsm)
* [`vaah cms:m-crud`](#vaah-cmsm-crud)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:auth`

```
USAGE
  $ vaah cms:auth

OPTIONS
  --help  Generate Auth operation for VaahCMS Themes
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/auth.ts)_

## `vaah cms:crud`

```
USAGE
  $ vaah cms:crud

OPTIONS
  --help  Generate CRUD operation for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

```
USAGE
  $ vaah cms:install [PROJECT_NAME]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

OPTIONS
  -h, --help  show CLI help
  --here      If you want to install VaahCMS in current directory
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/install.ts)_

## `vaah cms:m`

```
USAGE
  $ vaah cms:m

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/m.ts)_

## `vaah cms:m-crud`

```
USAGE
  $ vaah cms:m-crud

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m-crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/m-crud.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

```
USAGE
  $ vaah cms:settings

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/settings.ts)_

## `vaah cms:t`

```
USAGE
  $ vaah cms:t

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

```
USAGE
  $ vaah cms:taxonomies

OPTIONS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

```
USAGE
  $ vaah cms:users

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/cms/users.ts)_

## `vaah flutter:install`

```
USAGE
  $ vaah flutter:install

OPTIONS
  --help  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/flutter/install.ts)_

## `vaah hello [FILE]`

```
USAGE
  $ vaah hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vaah hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v2.3.5/src/commands/hello.ts)_

## `vaah help [COMMAND]`

```
USAGE
  $ vaah help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
* [`vaah cms:auth`](#vaah-cmsauth)
* [`vaah cms:crud`](#vaah-cmscrud)
* [`vaah cms:install [PROJECT_NAME]`](#vaah-cmsinstall-project_name)
* [`vaah cms:m`](#vaah-cmsm)
* [`vaah cms:m-crud`](#vaah-cmsm-crud)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:auth`

```
USAGE
  $ vaah cms:auth

OPTIONS
  --help  Generate Auth operation for VaahCMS Themes
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/auth.ts)_

## `vaah cms:crud`

```
USAGE
  $ vaah cms:crud

OPTIONS
  --help  Generate CRUD operation for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

```
USAGE
  $ vaah cms:install [PROJECT_NAME]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

OPTIONS
  -h, --help  show CLI help
  --here      If you want to install VaahCMS in current directory
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/install.ts)_

## `vaah cms:m`

```
USAGE
  $ vaah cms:m

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/m.ts)_

## `vaah cms:m-crud`

```
USAGE
  $ vaah cms:m-crud

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m-crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/m-crud.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

```
USAGE
  $ vaah cms:settings

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/settings.ts)_

## `vaah cms:t`

```
USAGE
  $ vaah cms:t

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

```
USAGE
  $ vaah cms:taxonomies

OPTIONS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

```
USAGE
  $ vaah cms:users

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/cms/users.ts)_

## `vaah flutter:install`

```
USAGE
  $ vaah flutter:install

OPTIONS
  --help  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/flutter/install.ts)_

## `vaah hello [FILE]`

```
USAGE
  $ vaah hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vaah hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v2.3.4/src/commands/hello.ts)_

## `vaah help [COMMAND]`

```
USAGE
  $ vaah help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
* [`vaah cms:auth`](#vaah-cmsauth)
* [`vaah cms:crud`](#vaah-cmscrud)
* [`vaah cms:install [PROJECT_NAME]`](#vaah-cmsinstall-project_name)
* [`vaah cms:m`](#vaah-cmsm)
* [`vaah cms:m-crud`](#vaah-cmsm-crud)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:auth`

```
USAGE
  $ vaah cms:auth

OPTIONS
  --help  Generate Auth operation for VaahCMS Themes
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/auth.ts)_

## `vaah cms:crud`

```
USAGE
  $ vaah cms:crud

OPTIONS
  --help  Generate CRUD operation for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

```
USAGE
  $ vaah cms:install [PROJECT_NAME]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

OPTIONS
  -h, --help  show CLI help
  --here      If you want to install VaahCMS in current directory
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/install.ts)_

## `vaah cms:m`

```
USAGE
  $ vaah cms:m

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/m.ts)_

## `vaah cms:m-crud`

```
USAGE
  $ vaah cms:m-crud

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m-crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/m-crud.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

```
USAGE
  $ vaah cms:settings

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/settings.ts)_

## `vaah cms:t`

```
USAGE
  $ vaah cms:t

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

```
USAGE
  $ vaah cms:taxonomies

OPTIONS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

```
USAGE
  $ vaah cms:users

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/cms/users.ts)_

## `vaah flutter:install`

```
USAGE
  $ vaah flutter:install

OPTIONS
  --help  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/flutter/install.ts)_

## `vaah hello [FILE]`

```
USAGE
  $ vaah hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vaah hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v2.3.3/src/commands/hello.ts)_

## `vaah help [COMMAND]`

```
USAGE
  $ vaah help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
* [`vaah cms:auth`](#vaah-cmsauth)
* [`vaah cms:crud`](#vaah-cmscrud)
* [`vaah cms:install [PROJECT_NAME]`](#vaah-cmsinstall-project_name)
* [`vaah cms:m`](#vaah-cmsm)
* [`vaah cms:m-crud`](#vaah-cmsm-crud)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:auth`

```
USAGE
  $ vaah cms:auth

OPTIONS
  --help  Generate Auth operation for VaahCMS Themes
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/auth.ts)_

## `vaah cms:crud`

```
USAGE
  $ vaah cms:crud

OPTIONS
  --help  Generate CRUD operation for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

```
USAGE
  $ vaah cms:install [PROJECT_NAME]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

OPTIONS
  -h, --help  show CLI help
  --here      If you want to install VaahCMS in current directory
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/install.ts)_

## `vaah cms:m`

```
USAGE
  $ vaah cms:m

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/m.ts)_

## `vaah cms:m-crud`

```
USAGE
  $ vaah cms:m-crud

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m-crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/m-crud.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

```
USAGE
  $ vaah cms:settings

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/settings.ts)_

## `vaah cms:t`

```
USAGE
  $ vaah cms:t

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

```
USAGE
  $ vaah cms:taxonomies

OPTIONS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

```
USAGE
  $ vaah cms:users

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/cms/users.ts)_

## `vaah flutter:install`

```
USAGE
  $ vaah flutter:install

OPTIONS
  --help  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/flutter/install.ts)_

## `vaah hello [FILE]`

```
USAGE
  $ vaah hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vaah hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v2.3.2/src/commands/hello.ts)_

## `vaah help [COMMAND]`

```
USAGE
  $ vaah help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
* [`vaah cms:auth`](#vaah-cmsauth)
* [`vaah cms:crud`](#vaah-cmscrud)
* [`vaah cms:install [PROJECT_NAME]`](#vaah-cmsinstall-project_name)
* [`vaah cms:m`](#vaah-cmsm)
* [`vaah cms:m-crud`](#vaah-cmsm-crud)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:auth`

```
USAGE
  $ vaah cms:auth

OPTIONS
  --help  Generate Auth operation for VaahCMS Themes
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/auth.ts)_

## `vaah cms:crud`

```
USAGE
  $ vaah cms:crud

OPTIONS
  --help  Generate CRUD operation for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

```
USAGE
  $ vaah cms:install [PROJECT_NAME]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

OPTIONS
  -h, --help  show CLI help
  --here      If you want to install VaahCMS in current directory
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/install.ts)_

## `vaah cms:m`

```
USAGE
  $ vaah cms:m

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/m.ts)_

## `vaah cms:m-crud`

```
USAGE
  $ vaah cms:m-crud

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m-crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/m-crud.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

```
USAGE
  $ vaah cms:settings

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/settings.ts)_

## `vaah cms:t`

```
USAGE
  $ vaah cms:t

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

```
USAGE
  $ vaah cms:taxonomies

OPTIONS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

```
USAGE
  $ vaah cms:users

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/cms/users.ts)_

## `vaah flutter:install`

```
USAGE
  $ vaah flutter:install

OPTIONS
  --help  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/flutter/install.ts)_

## `vaah hello [FILE]`

```
USAGE
  $ vaah hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vaah hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v2.3.1/src/commands/hello.ts)_

## `vaah help [COMMAND]`

```
USAGE
  $ vaah help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
* [`vaah cms:auth`](#vaah-cmsauth)
* [`vaah cms:crud`](#vaah-cmscrud)
* [`vaah cms:install [PROJECT_NAME]`](#vaah-cmsinstall-project_name)
* [`vaah cms:m`](#vaah-cmsm)
* [`vaah cms:m-crud`](#vaah-cmsm-crud)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:auth`

```
USAGE
  $ vaah cms:auth

OPTIONS
  --help  Generate Auth operation for VaahCMS Themes
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/auth.ts)_

## `vaah cms:crud`

```
USAGE
  $ vaah cms:crud

OPTIONS
  --help  Generate CRUD operation for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

```
USAGE
  $ vaah cms:install [PROJECT_NAME]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

OPTIONS
  -h, --help  show CLI help
  --here      If you want to install VaahCMS in current directory
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/install.ts)_

## `vaah cms:m`

```
USAGE
  $ vaah cms:m

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/m.ts)_

## `vaah cms:m-crud`

```
USAGE
  $ vaah cms:m-crud

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m-crud.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/m-crud.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

```
USAGE
  $ vaah cms:settings

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/settings.ts)_

## `vaah cms:t`

```
USAGE
  $ vaah cms:t

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

```
USAGE
  $ vaah cms:taxonomies

OPTIONS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

```
USAGE
  $ vaah cms:users

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/cms/users.ts)_

## `vaah flutter:install`

```
USAGE
  $ vaah flutter:install

OPTIONS
  --help  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/flutter/install.ts)_

## `vaah hello [FILE]`

```
USAGE
  $ vaah hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vaah hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v2.3.0/src/commands/hello.ts)_

## `vaah help [COMMAND]`

```
USAGE
  $ vaah help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
* [`vaah cms:auth`](#vaah-cmsauth)
* [`vaah cms:crud`](#vaah-cmscrud)
* [`vaah cms:install [PROJECT_NAME]`](#vaah-cmsinstall-project_name)
* [`vaah cms:m`](#vaah-cmsm)
* [`vaah cms:m-crud`](#vaah-cmsm-crud)
* [`vaah cms:m-make TYPE MODULE NAME`](#vaah-cmsm-make-type-module-name)
* [`vaah cms:settings`](#vaah-cmssettings)
* [`vaah cms:t`](#vaah-cmst)
* [`vaah cms:t-make TYPE THEME NAME`](#vaah-cmst-make-type-theme-name)
* [`vaah cms:taxonomies`](#vaah-cmstaxonomies)
* [`vaah cms:users`](#vaah-cmsusers)
* [`vaah flutter:install`](#vaah-flutterinstall)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:auth`

```
USAGE
  $ vaah cms:auth

OPTIONS
  --help  Generate Auth operation for VaahCMS Themes
```

_See code: [src/commands/cms/auth.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/auth.ts)_

## `vaah cms:crud`

```
USAGE
  $ vaah cms:crud

OPTIONS
  --help  Generate CRUD operation for VaahCMS
```

_See code: [src/commands/cms/crud.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/crud.ts)_

## `vaah cms:install [PROJECT_NAME]`

```
USAGE
  $ vaah cms:install [PROJECT_NAME]

ARGUMENTS
  PROJECT_NAME  [default: vaahcms] Enter the project folder name

OPTIONS
  -h, --help  show CLI help
  --here      If you want to install VaahCMS in current directory
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/install.ts)_

## `vaah cms:m`

```
USAGE
  $ vaah cms:m

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/m.ts)_

## `vaah cms:m-crud`

```
USAGE
  $ vaah cms:m-crud

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m-crud.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/m-crud.ts)_

## `vaah cms:m-make TYPE MODULE NAME`

```
USAGE
  $ vaah cms:m-make TYPE MODULE NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/m-make.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/m-make.ts)_

## `vaah cms:settings`

```
USAGE
  $ vaah cms:settings

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/settings.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/settings.ts)_

## `vaah cms:t`

```
USAGE
  $ vaah cms:t

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/t.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/t.ts)_

## `vaah cms:t-make TYPE THEME NAME`

```
USAGE
  $ vaah cms:t-make TYPE THEME NAME

OPTIONS
  -b, --backend
  -f, --frontend
  -h, --help      show CLI help
  -n, --name      show CLI help
```

_See code: [src/commands/cms/t-make.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/t-make.ts)_

## `vaah cms:taxonomies`

```
USAGE
  $ vaah cms:taxonomies

OPTIONS
  --help  Vue 3: Generate Taxonomies CRUD operations for VaahCMS
```

_See code: [src/commands/cms/taxonomies.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/taxonomies.ts)_

## `vaah cms:users`

```
USAGE
  $ vaah cms:users

OPTIONS
  --help  Vue3: Generate User CRUD for VaahCMS
```

_See code: [src/commands/cms/users.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/cms/users.ts)_

## `vaah flutter:install`

```
USAGE
  $ vaah flutter:install

OPTIONS
  --help  Installation of VaahFlutter
```

_See code: [src/commands/flutter/install.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/flutter/install.ts)_

## `vaah hello [FILE]`

```
USAGE
  $ vaah hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vaah hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v2.2.8/src/commands/hello.ts)_

## `vaah help [COMMAND]`

```
USAGE
  $ vaah help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->




#### Oclif Docs:
- Spinner - https://oclif.io/docs/spinner 


#### Framework
- https://oclif.io/ - For developing CLI Tool
- https://yeoman.io/ - SCAFFOLDING TOOL 

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
