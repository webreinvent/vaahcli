"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const Questions_1 = require("../../libraries/Questions");
const inquirer = require("inquirer");
const Generator_1 = require("../../libraries/Generator");
const Functions_1 = require("../../libraries/Functions");
let fs = require('fs');
let ora = require('ora');
const execa = require('execa');
const Listr = require('listr');
var shell = require('shelljs');
const { exec } = require('child_process');
let fsSync = require('fs-sync');
const fsPromises = fs.promises;
const chalk = require('chalk');
const log = console.log;
class CmsCrud extends command_1.Command {
    constructor() {
        super(...arguments);
        this.args = {};
        this.flags = {};
        this.primary = {};
        this.inputs = {};
        this.primary_inputs = {};
        this.spinner = {};
        this.repo = 'https://github.com/webreinvent/vaahcms-ready';
        this.target_dir = './';
        this.source_dir = '';
        //---------------------------------------------------
        //---------------------------------------------------
    }
    /*
     *---------------------------------------------------
     * Command Execution
     *---------------------------------------------------
     */
    async run() {
        // log(chalk.white.bgGreen.bold("      This command are only for Vue 3 module      "));
        let functions = new Functions_1.default();
        let is_updates_available = await functions.isUpdatesAvailable();
        if (is_updates_available) {
            return true;
        }
        const { args, flags } = this.parse(CmsCrud);
        let questions = new Questions_1.default();
        let get_questions = questions.getFlutterQuestions();
        this.inputs = await inquirer.prompt(get_questions);
        this.inputs = Object.assign(Object.assign({}, this.primary_inputs), this.inputs);
        this.inputs.for = this.primary.for;
        let target = "";
        let source = '\\skeletons\\flutter\\install\\';
        target = "./vaahflutter";
        let generator = new Generator_1.default(args, flags, this.inputs, source, target);
        log(chalk.green('======================================='));
        log('Generating CRUD Files');
        log(chalk.green('---------------------------------------'));
        const tasks = new Listr([
            {
                title: 'Files Generated for CRUD operations',
                task: function () {
                    generator.generateFlutterFiles();
                }
            }
        ]);
        let self = this;
        tasks.run().then((ctx) => {
            self.successMessage();
        }).catch((err) => {
            console.error(err);
        });
    }
    //---------------------------------------------------
    successMessage() {
        log(chalk.white.bgGreen.bold("      Files Generated!      "));
        log(chalk.green("=================================================================="));
    }
}
exports.default = CmsCrud;
CmsCrud.description = 'Vue 3: Generate Taxonomies CRUD operations for VaahCMS';
/*
 *---------------------------------------------------
 * Command Flags/Options
 *---------------------------------------------------
 */
CmsCrud.flags = {
    help: command_1.flags.boolean({
        description: 'Vue 3: Generate Taxonomies CRUD operations for VaahCMS',
        default: false,
    }),
};
/*
 *---------------------------------------------------
 * Command Arguments
 *---------------------------------------------------
 */
CmsCrud.args = [];
