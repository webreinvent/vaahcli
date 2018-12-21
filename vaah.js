#!/usr/bin/env node
'use strict';

const program = require('commander');
const { prompt } = require('inquirer');

const { helloWorld } = require('./logic');
const laravel = require('./laravel');

let questions;

/*
|--------------------------------------------------------------------------
| Package Details
|--------------------------------------------------------------------------
*/
program
    .version('0.0.1')
    .description('Contact management system');

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


program.parse(process.argv);
