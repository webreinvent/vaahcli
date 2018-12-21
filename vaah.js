#!/usr/bin/env node
'use strict';

const program = require('commander');
const { prompt } = require('inquirer');

const { helloWorld } = require('./logic');

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
| Package Command | node vaah.js helloWorld
|--------------------------------------------------------------------------
*/

const questions = [
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



program.parse(process.argv);
