# Rapid Laravel packages development with Custom Generators
The one and only node (npm commands) based package to fasten your Laravel package development.



## Setup & Configuration
First we need to setup laravel for package development.

### Step 1
Install fresh laravel, refer to `https://laravel.com/docs/5.7/installation`

### Step 2
Create a folder `packages` at the root folder of laravel.

### Step 3
Create a folder for your package. Example, if your package name is `Laravel Package`, then your folder name should be `laravel-package`.

### Step 4
Clone or Download `https://github.com/webreinvent/lv-package-generator` in your package folder.

### Step 5
Run `npm install` in your package folder.

### Step 6
Now you have following npm commands to play with:

| Command  | Details |
| ------------- | ------------- |
| `npm run start`  | It will start a wizard to generate the package.  |
| `npm run reset`  | Reset the package generated. It will deleted all the generated files.  |
| `npm run readme`  | It will only generate a README.md file  |

The following npm commands are available to generate file:
- `npm run make model:[name]`
- `npm run make view:[name]`
- `npm run make controller:[name]`
- `npm run make seed:[name]`
- `npm run make migration:[name]`

### Step 7
Once your package is generated, you need add the path in composer.json file of laravel:
```json
    ...
    "autoload-dev": {
        "classmap": [
            "tests/TestCase.php"
        ],
        "psr-4": {
            "VendorName\\PackageName\\": "packages-scr-path"
        }
    },
    ...
```

### Step 8
Register your package's service provider at `config/app.php`:

`VendorName\PackageName\PackageNameServiceProvider::class,`

Of course, you need to change `VendorName` & `PackageName` to yours.


**That's it, your package is ready for use in development environment.**

## Support us

[WebReinvent](https://www.webreinvent.com) is a web agency based in Delhi, India. You'll find an overview of all our open source projects [on github](https://github.com/webreinvent).

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
