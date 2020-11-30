"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
const Listr = require('listr');
const Generator_1 = require("../../libraries/Generator");
const Helpers_1 = require("../../libraries/Helpers");
const chalk = require('chalk');
const log = console.log;
class CmsTMake extends command_1.Command {
    constructor() {
        super(...arguments);
        this.questions = {};
        this.args = {};
        this.flags = {};
        this.inputs = {};
    }
    /*
     *---------------------------------------------------
     * Command Execution
     *---------------------------------------------------
     */
    async run() {
        const { args, flags } = this.parse(CmsTMake);
        this.args = args;
        this.flags = flags;
        this.inputs['for'] = 'theme';
        let helpers = new Helpers_1.default(this.args, this.flags, this.inputs);
        let params = helpers.getDerivedVariables();
        for (let key in params) {
            this.inputs[key] = params[key];
        }
        for (let key in this.args) {
            this.inputs[key] = this.args[key];
        }
        for (let key in this.flags) {
            this.inputs[key] = this.flags[key];
        }
        let source = '\\skeletons\\vaahcms\\theme-files\\';
        let generator = new Generator_1.default(args, flags, this.inputs, source, this.inputs['target_dir']);
        log(chalk.green('======================================='));
        log('Generating Files for Theme: ' + chalk.green(this.args.theme));
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
exports.default = CmsTMake;
CmsTMake.description = 'Generate for VaahCMS Theme';
/*
 *---------------------------------------------------
 * Command Flags/Options
 *---------------------------------------------------
 */
CmsTMake.flags = {
    frontend: command_1.flags.boolean({
        char: 'f',
        default: true,
    }),
    backend: command_1.flags.boolean({
        char: 'b',
        default: false,
    }),
    help: command_1.flags.help({ char: 'h' }),
    name: command_1.flags.help({ char: 'n' }),
};
/*
 *---------------------------------------------------
 * Command Arguments
 *---------------------------------------------------
 */
CmsTMake.args = [
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
        name: 'theme',
        required: true,
    },
    {
        name: 'name',
        required: true,
    }
];
