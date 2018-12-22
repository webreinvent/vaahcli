#!/usr/bin/env node
'use strict';
const program = require('commander');
const { prompt } = require('inquirer');
const {getInstalledPathSync}  = require('get-installed-path');


const vaah = require('./scripts/vaah');
const laravel = require('./scripts/laravel');

/*
|--------------------------------------------------------------------------
| Get Package Configurations
|--------------------------------------------------------------------------
*/
//global.app_env = "production";
global.globalAppEnv = "dev";
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
let questions;
questions = [
    {
        type : 'input',
        name : 'vendor_name',
        default: 'WebReinvent',
        message : 'Enter your vendor name: '
    },
    {
        type : 'input',
        name : 'package_name',
        default: 'LvTags',
        message : 'Enter your package name: '
    },
    {
        type : 'input',
        name : 'description',
        default: 'description',
        message : 'Enter your package description: '
    },
    {
        type : 'input',
        name : 'homepage',
        default: 'https://www.webreinvent.com',
        message : 'Enter homepage url: '
    },
    {
        type : 'input',
        name : 'author_name',
        default: 'pradeep',
        message : 'Enter Author name: '
    },
    {
        type : 'input',
        name : 'author_email',
        default: 'we@webreinvent.com',
        message : 'Enter Author email: '
    },

];

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
    .command('laravel make:package-files')
    .alias('lv:p-files')
    .arguments('<type>')
    .arguments('<name>')
    .action((type, name) => {
        laravel.generateLaravelFiles(type, name);
    });


program.parse(process.argv);
