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
        let functions = new Functions_1.default();
        let is_updates_available = await functions.isUpdatesAvailable();
        if (is_updates_available) {
            return true;
        }
        const { args, flags } = this.parse(CmsCrud);
        let questions = new Questions_1.default();
        this.primary = await inquirer.prompt(questions.getCrudQuestionsPrimary());
        let get_questions = questions.getCrudQuestions(this.primary.for);
        this.inputs = await inquirer.prompt(get_questions);
        this.inputs.for = this.primary.for;
        let target = "";
        let source = '\\skeletons\\vaahcms\\crud\\';
        if (this.inputs.for == 'Module - Vue3 & PrimeVue') {
            source = '\\skeletons\\vaahcms\\crud-vue3\\';
            this.inputs['namespace'] = 'VaahCms\\Modules\\' + this.inputs.folder_name;
            target = "./VaahCms/Modules/" + this.inputs.folder_name;
        }
        else if (this.inputs.for == 'Module - Vue2 & Buefy') {
            source = '\\skeletons\\vaahcms\\crud\\';
            this.inputs['namespace'] = 'VaahCms\\Modules\\' + this.inputs.folder_name;
            target = "./VaahCms/Modules/" + this.inputs.folder_name;
        }
        else if (this.inputs.for == 'Theme') {
            this.inputs['namespace'] = 'VaahCms\\Themes\\' + this.inputs.folder_name;
            target = "./VaahCms/Themes/" + this.inputs.folder_name;
        }
        else {
            source = '\\skeletons\\vaahcms\\crud-vue3\\';
            target = this.inputs.path;
        }
        //console.log('--->', this.inputs);
        let generator = new Generator_1.default(args, flags, this.inputs, source, target);
        log(chalk.green('======================================='));
        log('Generating CRUD Files');
        log(chalk.green('---------------------------------------'));
        const tasks = new Listr([
            {
                title: 'Files Generated for CRUD operations',
                task: function () {
                    generator.generateCrudFiles();
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
        log(chalk.green("Now, follow following steps:"));
        if (this.inputs['generate_migration'] === 'true') {
            log("0) Re-activate module to run migrations");
        }
        log("1) Include the laravel router file in the module's route file");
        log("2) Include the vue router file");
        if (this.inputs.for == 'Module - Vue2 & Buefy') {
            log("3) Include the vue store file");
            log("4) Add vue router link to you menu");
        }
        if (this.inputs.for == 'Module - Vue3 & PrimeVue') {
            log("3) Add vue router link to you menu");
        }
        log(chalk.green("=================================================================="));
    }
}
exports.default = CmsCrud;
CmsCrud.description = 'Generate CRUD operations for VaahCMS';
/*
 *---------------------------------------------------
 * Command Flags/Options
 *---------------------------------------------------
 */
CmsCrud.flags = {
    help: command_1.flags.boolean({
        description: 'Generate CRUD operation for VaahCMS',
        default: false,
    }),
};
/*
 *---------------------------------------------------
 * Command Arguments
 *---------------------------------------------------
 */
CmsCrud.args = [];
