"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const inquirer = require("inquirer");
const Listr = require('listr');
const Questions_1 = require("../../libraries/Questions");
const Generator_1 = require("../../libraries/Generator");
const chalk = require('chalk');
const log = console.log;
class CmsCrud extends command_1.Command {
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
        const { args, flags } = this.parse(CmsCrud);
        let questions = new Questions_1.default();
        this.inputs = await inquirer.prompt(questions.getCmsCrudQuestions());
        this.inputs['namespace'] = this.inputs.namespace;
        let source = '\\skeletons\\vaahcms\\crud\\';
        let target = args.path;
        let generator = new Generator_1.default(args, flags, this.inputs, source, target);
        log(chalk.green('======================================='));
        log('Generating CRUD for VaahCMS');
        log(chalk.green('---------------------------------------'));
        const tasks = new Listr([
            {
                title: 'Files Generated for CRUD operations',
                task: function () {
                    generator.curdFiles();
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
    //-----------------------------
    successMessage() {
        log(chalk.white.bgGreen.bold("      Files Generated!      "));
        log(chalk.green("=================================================================="));
        log(chalk.green("Following steps:"));
        log("1) Include the router file");
        log("2) Include the vue router file");
        log("3) Include the vue store file");
        log(chalk.green("=================================================================="));
    }
}
exports.default = CmsCrud;
CmsCrud.description = 'To generate CRUD operations for VaahCMS Module';
/*
 *---------------------------------------------------
 * Command Flags/Options
 *---------------------------------------------------
 */
CmsCrud.flags = {
    help: command_1.flags.help({ char: 'h' }),
    name: command_1.flags.help({ char: 'n' }),
    force: command_1.flags.boolean({ char: 'f' }),
};
/*
 *---------------------------------------------------
 * Command Arguments
 *---------------------------------------------------
 */
CmsCrud.args = [
    {
        name: 'path',
        required: false,
        default: './',
    },
];
