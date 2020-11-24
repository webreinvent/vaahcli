# Vaah

> Command line tool to Generate Files for Rapid Development

Please consider starring the project to show your :heart: and support.


## Feature Roadmap

#### Completed
:white_check_mark: Laravel Package Development

:white_check_mark: Laravel Files (migration, model, view, controller, seed )

:white_check_mark: VaahCMS Modules

:white_check_mark: VaahCMS Modules Files  (migration, model, view, controller, seed )

:white_check_mark: VaahCMS Themes

:white_check_mark: VaahCMS Themes Files  (migration, model, view, controller, seed )


#### Planned
:black_square_button: WordPress Theme

:black_square_button: WordPress Plugin


## Install

Install with [npm](https://www.npmjs.com/):

```sh
npm install -g vaah
```


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


## VaahCms Module Generators
List of commands:
- `vaah cms:m` : To generate module

All following commands accept option parameter `-f <folder_name>` or `-folder <folder_name>`
- `vaah cms:m:make migration <module> <name>` : To generate module migration
- `vaah cms:m:make seed <module> <name>` : To generate module seed
- `vaah cms:m:make model <module> <name>` : To generate module model
- `vaah cms:m:make controller <module> <name>` : To generate module controller
- `vaah cms:m:make view <module> <name>` : To generate module view
- `vaah cms:m:make middleware <module> <name>` : To generate module middleware
- `vaah cms:m:make observer <module> <name>` : To generate module observer
- `vaah cms:m:make trait <module> <name>` : To generate module trait
- `vaah cms:m:make test <module> <name>` : To generate module browser test
- `vaah cms:m:make event <module> <name>` : To generate module events
- `vaah cms:m:make listener <module> <name>` : To generate module listener
- `vaah cms:m:make mail <module> <name>` : To generate module email
- `vaah cms:m:make notification <module> <name>` : To generate module notification

## VaahCms Theme Generators
List of commands:
- `vaah cms:t` : To generate theme


All following commands accept option parameter `-f <folder_name>` or `-folder <folder_name>`
- `vaah cms:t:make migration <theme> <name>` : To generate theme migration
- `vaah cms:t:make seed <theme> <name>` : To generate theme seed
- `vaah cms:t:make model <theme> <name>` : To generate theme model
- `vaah cms:t:make controller <theme> <name>` : To generate theme controller
- `vaah cms:t:make view <theme> <theme>` : To generate theme view
- `vaah cms:t:make middleware <theme> <name>` : To generate theme middleware
- `vaah cms:t:make observer <theme> <name>` : To generate theme observer
- `vaah cms:t:make trait <theme> <name>` : To generate theme trait
- `vaah cms:t:make test <theme> <name>` : To generate theme browser test


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
bin\run cms:m
bin\run cms:m:crud
bin\run cms:t
```

*Windows: If you want to debug the command then run following command first on:
```shell script
set DEBUG=*
```

#### Step 5:
Run following command to publish the package to `npm`:
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
$ vaah (-v|--version|version)
vaah/1.0.0 win32-x64 node-v12.16.1
$ vaah --help [COMMAND]
USAGE
  $ vaah COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vaah cms:install [FILE]`](#vaah-cmsinstall-file)
* [`vaah cms:m [FILE]`](#vaah-cmsm-file)
* [`vaah hello [FILE]`](#vaah-hello-file)
* [`vaah help [COMMAND]`](#vaah-help-command)

## `vaah cms:install [FILE]`

```
USAGE
  $ vaah cms:install [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/cms/install.ts](https://github.com/webreinvent/vaah/blob/v1.0.0/src/commands/cms/install.ts)_

## `vaah cms:m [FILE]`

```
USAGE
  $ vaah cms:m [FILE]

OPTIONS
  -f, --force
  -h, --help   show CLI help
  -n, --name   show CLI help
```

_See code: [src/commands/cms/m.ts](https://github.com/webreinvent/vaah/blob/v1.0.0/src/commands/cms/m.ts)_

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

_See code: [src/commands/hello.ts](https://github.com/webreinvent/vaah/blob/v1.0.0/src/commands/hello.ts)_

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
