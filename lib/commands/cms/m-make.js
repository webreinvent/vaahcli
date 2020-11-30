"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const Listr = require('listr');
const Generator_1 = require("../../libraries/Generator");
const Helpers_1 = require("../../libraries/Helpers");
const chalk = require('chalk');
const log = console.log;
class CmsMMake extends command_1.Command {
    constructor() {
        super(...arguments);
        this.questions = {};
        this.args = {};
        this.flags = {};
        this.inputs = {};
        //----------------------------------------------------------
        //----------------------------------------------------------
        //----------------------------------------------------------
        //----------------------------------------------------------
        //----------------------------------------------------------
    }
    /*
     *---------------------------------------------------
     * Command Execution
     *---------------------------------------------------
     */
    async run() {
        const { args, flags } = this.parse(CmsMMake);
        this.args = args;
        this.flags = flags;
        /*let questions = new Questions();
        this.inputs = await inquirer.prompt(questions.getModuleCrudQuestions());*/
        let helpers = new Helpers_1.default(this.args, this.flags, this.inputs);
        this.inputs['for'] = 'module';
        let params = helpers.getDerivedVariables();
        console.log('--->', params);
        for (let key in params) {
            this.inputs[key] = params[key];
        }
        for (let key in this.args) {
            this.inputs[key] = this.args[key];
        }
        for (let key in this.flags) {
            this.inputs[key] = this.flags[key];
        }
        let source = '\\skeletons\\vaahcms\\module-files\\';
        console.log('--->', this.inputs);
        let generator = new Generator_1.default(args, flags, this.inputs, source, this.inputs['target_dir']);
        log(chalk.green('======================================='));
        log('Generating Files for Module: ' + chalk.green(this.args.module));
        log(chalk.green('---------------------------------------'));
        const tasks = new Listr([
            {
                title: 'File Generated',
                task: function () {
                    generator.file();
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
exports.default = CmsMMake;
CmsMMake.description = 'Generate for VaahCMS Module';
/*
 *---------------------------------------------------
 * Command Flags/Options
 *---------------------------------------------------
 */
CmsMMake.flags = {
    frontend: command_1.flags.boolean({
        char: 'f',
        default: false,
    }),
    backend: command_1.flags.boolean({
        char: 'b',
        default: true,
    }),
    help: command_1.flags.help({ char: 'h' }),
    name: command_1.flags.help({ char: 'n' }),
};
/*
 *---------------------------------------------------
 * Command Arguments
 *---------------------------------------------------
 */
CmsMMake.args = [
    {
        name: 'type',
        required: true,
        options: [
            'migration',
            'seed',
            'model',
            'controller',
            'view',
            'middleware',
            'observer',
            'trait',
            'test',
            'event',
            'listener',
            'mail',
            'notification',
        ]
    },
    {
        name: 'module',
        required: true,
    },
    {
        name: 'name',
        required: true,
    }
];
