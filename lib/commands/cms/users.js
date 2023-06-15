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
        this.primary = await inquirer.prompt(questions.getUserQuestionsPrimary());
        let get_questions = questions.getUserQuestions(this.primary.for);
        this.inputs = await inquirer.prompt(get_questions);
        this.inputs.for = this.primary.for;
        let target = "";
        let source = '\\skeletons\\vaahcms\\users\\';
        this.inputs['namespace_controller'] = '';
        this.inputs['namespace'] = 'VaahCms\\Modules\\' + this.inputs.folder_name;
        target = "./VaahCms/Modules/" + this.inputs.folder_name;
        if (this.inputs.for == 'Custom Path') {
            this.inputs['namespace_controller'] = this.inputs['namespace'] + '\\Http\\Controllers';
            target = this.inputs.path;
        }
        let generator = new Generator_1.default(args, flags, this.inputs, source, target);
        log(chalk.green('======================================='));
        log('Vue 3: Generating User CRUD Files');
        log(chalk.green('---------------------------------------'));
        const tasks = new Listr([
            {
                title: 'Files Generated for User CRUD operations',
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
            log("0.1) Update the migration file with the table name and columns");
            log("0.2) Re-activate module to run migrations");
        }
        log("2) Include the crud router file in the module's backend route file");
        log("3) Include the vue router file");
        log("5) Add vue router link to you /Vue/Components/Aside.vue file");
        log(chalk.green("=================================================================="));
    }
}
exports.default = CmsCrud;
CmsCrud.description = 'Vue3: Generate User CRUD for VaahCMS';
/*
 *---------------------------------------------------
 * Command Flags/Options
 *---------------------------------------------------
 */
CmsCrud.flags = {
    help: command_1.flags.boolean({
        description: 'Vue3: Generate User CRUD for VaahCMS',
        default: false,
    }),
};
/*
 *---------------------------------------------------
 * Command Arguments
 *---------------------------------------------------
 */
CmsCrud.args = [];
