# Vaah

> Command line tool to Generate Files for Rapid Development

Please consider starring the project to show your :heart: and support.

## Feature Roadmap

#### Completed
:white_check_mark: Laravel Package Development

:white_check_mark: Laravel Files (migration, model, view, controller, seed )


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


## Support us

[WebReinvent](https://www.webreinvent.com) is a web agency based in Delhi, India. You'll find an overview of all our open source projects [on github](https://github.com/webreinvent).

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.