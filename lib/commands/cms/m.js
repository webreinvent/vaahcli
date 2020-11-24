"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const inquirer = require("inquirer");
const Listr = require('listr');
const Questions_1 = require("../../libraries/Questions");
const Generator_1 = require("../../libraries/Generator");
const chalk = require('chalk');
const log = console.log;
class CmsM extends command_1.Command {
    constructor() {
        super(...arguments);
        this.questions = {};
        this.inputs = {};
    }
    /*
     *---------------------------------------------------
     * Command Execution
     *---------------------------------------------------
     */
    async run() {
        const { args, flags } = this.parse(CmsM);
        let questions = new Questions_1.default();
        this.inputs = await inquirer.prompt(questions.getVaahCmsModuleQuestions());
        this.inputs['namespace'] = 'VaahCms\\Modules\\' + this.inputs.module_name;
        this.inputs['service_provider_name'] = this.inputs.module_name;
        this.inputs['year'] = (new Date()).getFullYear();
        let source = '\\skeletons\\vaahcms\\module\\';
        let target = "./VaahCms/Modules/" + this.inputs.module_name;
        let generator = new Generator_1.default(args, flags, this.inputs, source, target);
        log(chalk.green('======================================='));
        log('Generating Module: ' + chalk.green(this.inputs.module_name));
        log(chalk.green('---------------------------------------'));
        const tasks = new Listr([
            {
                title: 'Files Generated',
                task: function () {
                    generator.files();
                }
            }
        ]);
        tasks.run().then((ctx) => {
            log(chalk.green('======================================='));
        }).catch((err) => {
            console.error(err);
        });
    }
}
exports.default = CmsM;
CmsM.description = 'To generate module for VaahCMS';
/*
 *---------------------------------------------------
 * Command Flags/Options
 *---------------------------------------------------
 */
CmsM.flags = {
    help: command_1.flags.help({ char: 'h' }),
    name: command_1.flags.help({ char: 'n' }),
    force: command_1.flags.boolean({ char: 'f' }),
};
/*
 *---------------------------------------------------
 * Command Arguments
 *---------------------------------------------------
 */
CmsM.args = [];
