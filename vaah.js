#!/usr/bin/env node
'use strict';
const program = require('commander');
const { prompt } = require('inquirer');
const {getInstalledPathSync}  = require('get-installed-path');

const vaah = require('./scripts/vaah');
const laravel = require('./scripts/laravel');
const vaahcms = require('./scripts/vaahcms');


/*
|--------------------------------------------------------------------------
| Get Package Configurations
|--------------------------------------------------------------------------
*/
global.globalAppEnv = "production";
//global.globalAppEnv = "dev";
global.globalFileSourcePath = null;

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
    .command('cms:module-file')
    .alias('cms:m-file')
    .arguments('<module_name>')
    .arguments('<file_type>')
    .arguments('<file_name>')
    .action((module_name, file_type, file_name) => {
        vaahcms.generateModuleFiles(module_name, file_type, file_name);
    });


program.parse(process.argv);