#!/usr/bin/env node
'use strict';
const program = require('commander');
const { prompt } = require('inquirer');
const {getInstalledPathSync}  = require('get-installed-path');


const { helloWorld } = require('./scripts/hello-world');
const laravel = require('./scripts/laravel');

const production = false;
let package_file = null;

if(!production)
{
    package_file = "./package.json";
} else
{
    package_file = getInstalledPathSync('vaah')+"/package.json";
}

const package_config = laravel.parseJsonFileContent(package_file);

let questions;

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
| Package Command | vaah helloWorld
|--------------------------------------------------------------------------
*/

questions = [
    {
        type : 'input',
        name : 'name',
        message : 'Enter your name ...'
    },
];

program
    .command('helloWorld')
    .alias('a')
    .description('Test HelloWorld')
    .action(() => {

        prompt(questions).then(answers => {
            helloWorld(answers);
        })

    });



/*
|--------------------------------------------------------------------------
| Laravel Commands | vaah laravel make:package
|--------------------------------------------------------------------------
*/

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


program.parse(process.argv);
