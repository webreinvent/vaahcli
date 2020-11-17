#!/usr/bin/env node
'use strict';
const program = require('commander');
const { prompt } = require('inquirer');
const {getInstalledPathSync}  = require('get-installed-path');

const vaah = require('./scripts/vaah');
const laravel = require('./scripts/laravel');
const vaahcms = require('./scripts/vaahcms');
const vaahcms_module_crud = require('./scripts/vaahcms-module-crud');
const vaahcms_theme = require('./scripts/vaahcms-theme');
const nuxt = require('./scripts/nuxt');


/*
|--------------------------------------------------------------------------
| Get Package Configurations
|--------------------------------------------------------------------------
*/
global.globalAppEnv = "production";
//global.globalAppEnv = "dev";
//global.globalFileSourcePath = null;

if(globalAppEnv == 'dev')
{
    global.globalFileSourcePath = '.';

} else
{
    global.globalFileSourcePath = getInstalledPathSync('vaah');
}

let package_file = global.globalFileSourcePath+"/package.json";

const package_config = laravel.parseJsonFileContent(package_file);



/*
|--------------------------------------------------------------------------
| Package Details
|--------------------------------------------------------------------------
*/
program
    .version(package_config.version)
    .description(package_config.description);



/*
|--------------------------------------------------------------------------
| Package Command | vaah release
|--------------------------------------------------------------------------
| It will make the package release ready.
| It will copy readme, license, package.json file and increase version of the package
| After this command you can use `npm publish` to publish the package
*/
let release_type;
release_type = [
    {
        type : 'checkbox',
        choices: ["patch", "minor", "major"],
        name : 'type',
        default: 'patch',
        message : 'Choose the release type: '
    },
];

program
    .command('release')
    .alias('r')
    .description('Make the package release ready!')
    .action(() => {
        prompt(release_type).then(answers => {
            vaah.releaseReady(answers)
        })
    });



/*
|--------------------------------------------------------------------------
| Laravel Commands | node vaah laravel:package
|--------------------------------------------------------------------------
*/
let lv_questions = laravel.getQuestions();


// node vaah laravel:package
program
    .command('laravel:package')
    .alias('lv:p')
    .action(() => {
        prompt(lv_questions).then(answers => {
            laravel.generatePackage(answers);
        })
    });

// node vaah laravel:package-reset
program
    .command('laravel:package-reset')
    .alias('lv:p-reset')
    .action((args) => {
        laravel.resetPackage(args);
    });

// node vaah laravel:package-file
program
    .command('laravel:package-file')
    .alias('lv:p-file')
    .arguments('<type>')
    .arguments('<name>')
    .action((type, name) => {
        laravel.generateLaravelFiles(type, name);
    });



/*
|--------------------------------------------------------------------------
| Laravel Commands | node vaah cms:modules
|--------------------------------------------------------------------------
*/

// node vaah cms:module
let cms_questions = vaahcms.getQuestions();

program
    .command('cms:module')
    .alias('cms:m')
    .action(() => {
        prompt(cms_questions).then(answers => {
            vaahcms.generatePackage(answers);
        })
    });


// node vaah cms:module-reset <name>
program
    .command('cms:module-reset')
    .alias('cms:m-reset')
    .arguments('<module_name>')
    .action((module_name) => {
        vaahcms.resetModule(module_name);
    });


// node vaah cms:file <name>
program
    .command('cms:module:make')
    .alias('cms:m:make')
    .arguments('<type>')
    .arguments('<module>')
    .arguments('<name>')
    .option('-f, --folder [value]', 'Folder Name', "")
    .action((type, module, name, args) => {
        vaahcms.generateModuleFiles(type, module, name, args.folder);
    });

let vaahcms_module_crud_questions = vaahcms_module_crud.getQuestions();


program
    .command('cms:module:crud')
    .alias('cms:m:crud')
    .action(() => {
        prompt(vaahcms_module_crud_questions).then(answers => {
            vaahcms_module_crud.generatePackage(answers);
        })
    });



/*
|--------------------------------------------------------------------------
| Laravel Commands | node vaah cms:theme
|--------------------------------------------------------------------------
*/

// node vaah cms:theme
let vaahcms_theme_questions = vaahcms_theme.getQuestions();

program
    .command('cms:theme')
    .alias('cms:t')
    .action(() => {
        prompt(vaahcms_theme_questions).then(answers => {
            vaahcms_theme.generatePackage(answers);
        })
    });


// node vaah cms:theme-reset <name>
program
    .command('cms:theme-reset')
    .alias('cms:t-reset')
    .arguments('<theme_name>')
    .action((theme_name) => {
        vaahcms_theme.resetTheme(theme_name);
    });


// node vaah cms:theme:make <name>
program
    .command('cms:theme:make')
    .alias('cms:t:make')
    .arguments('<type>')
    .arguments('<theme>')
    .arguments('<name>')
    .option('-f, --folder [value]', 'Folder Name', "")
    .action((type, theme, name, args) => {
        vaahcms_theme.generateThemeFiles(type, theme, name, args.folder);
    });


/*
|--------------------------------------------------------------------------
| Nuxt | node vaah nuxt:<commands>
|--------------------------------------------------------------------------
*/

// node vaah nuxt:install --folder Foo
program
    .command('nuxt:install')
    .alias('nuxt:i')
    .option('-f, --folder <name>')
    .action((args) => {
        nuxt.install(args.folder);
    });

// node vaah nuxt:update -folder Foo
program
    .command('nuxt:update')
    .alias('nuxt:u')
    .option('-f, --folder <name>')
    .action((args) => {
        nuxt.update(args.folder);
    });

program.parse(process.argv);
