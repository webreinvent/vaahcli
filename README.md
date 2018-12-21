# Vaah

> Command line tool to Generator Files for Rapid Development

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
3. Open the folder in command line and run 
```sh
vaah laravel make:package
```
It will start wizard and ask you the Vendor Name & Package Name.

You have access to following commands as well:
| Command        | Alias           | Details  |

| ------------- |:-------------:| -----:|

| `vaah laravel make:package`      | `vaah lv:p` | To general Laravel package |

| `vaah laravel make:package-reset`      | `vaah lv:p-reset`      |   To reset/delete generate files. |


## Support us

[WebReinvent](https://www.webreinvent.com) is a web agency based in Delhi, India. You'll find an overview of all our open source projects [on github](https://github.com/webreinvent).

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
