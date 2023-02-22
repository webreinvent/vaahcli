"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const inquirer = require("inquirer");
const Listr = require('listr');
const Questions_1 = require("../../libraries/Questions");
const Generator_1 = require("../../libraries/Generator");
const Functions_1 = require("../../libraries/Functions");
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
        let functions = new Functions_1.default();
        let is_updates_available = await functions.isUpdatesAvailable();
        if (is_updates_available) {
            return true;
        }
        const { args, flags } = this.parse(CmsM);
        let questions = new Questions_1.default();
        this.inputs = await inquirer.prompt(questions.getVaahCmsModuleQuestions());
        this.inputs['webpack_port'] = functions.generateRandom(8000, 8999);
        this.inputs['namespace'] = 'VaahCms\\Modules\\' + this.inputs.module_name;
        this.inputs['service_provider_name'] = this.inputs.module_name;
        this.inputs['year'] = (new Date()).getFullYear();
        let source;
        if (this.inputs['module-type'] === 'Module - Vue3 & PrimeVue') {
            source = '\\skeletons\\vaahcms\\module-vue3\\';
        }
        else {
            source = '\\skeletons\\vaahcms\\module\\';
        }
        let target = "./VaahCms/Modules/" + this.inputs.module_name;
        this.inputs['service_provider_name'] = this.inputs.module_name + 'ServiceProvider.php';
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
            log(chalk.green("To use Vue in your project, follow the following steps:"));
            log("1) Add MODULE_" + this.inputs.module_name_upper + "_ENV=develop in your environment file");
            log("2) Run 'npm install' at VaahCms/Modules/" + this.inputs.module_name + " module folder");
            log("3) Now run 'npm run dev' at VaahCms/Modules/" + this.inputs.module_name + " module folder");
            log(`4) Visit <base-url>/public/backend/` + this.inputs.module_name_lower);
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
