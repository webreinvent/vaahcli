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
| Laravel Commands | vaah laravel make:package
|--------------------------------------------------------------------------
*/
let questions = laravel.getQuestions();

program
    .command('laravel make:package')
    .alias('lv:p')
    .action(() => {
        prompt(questions).then(answers => {
            laravel.generatePackage(answers);
        })
});

program
    .command('laravel make:package-reset')
    .alias('lv:p-reset')
    .action((args) => {
        laravel.resetPackage(args);
    });


program
    .command('laravel make:package-file')
    .alias('lv:p-file')
    .arguments('<type>')
    .arguments('<name>')
    .action((type, name) => {
        laravel.generateLaravelFiles(type, name);
    });


program.parse(process.argv);
