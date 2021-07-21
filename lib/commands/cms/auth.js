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
        this.inputs = await inquirer.prompt(questions.getAuthQuestions());
        let target = "";
        let source = '\\skeletons\\vaahcms\\auth\\';
        this.inputs['namespace'] = 'VaahCms\\Themes\\' + this.inputs.theme_name;
        target = "./VaahCms/Themes/" + this.inputs.theme_name;
        let generator = new Generator_1.default(args, flags, this.inputs, source, target);
        log(chalk.green('======================================='));
        log('Generating Auth Files');
        log(chalk.green('---------------------------------------'));
        const tasks = new Listr([
            {
                title: 'Files Generated for Auth operations',
                task: function () {
                    generator.generateAuthFiles();
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
        log(chalk.green("Following steps:"));
        log("1) Include Routes/frontend/routes-auth.php in Routes/frontend.php of the theme");
        log("2) Include VueScripts.js in webpack.mix.js, sample code is below:");
        let code = '    //To js minification\n' +
            '    let jses = [\n' +
            '        \'./Resources/assets/js/VueScripts.js\',\n' +
            '    ];\n' +
            '\n' +
            '    mix.js(jses,  output_folder+\'/build/script.js\');';
        log(chalk.blue(code));
        log("3) Include the script in your master blade layout:");
        code = '    <script src="{{vh_theme_assets_url("ThemeName", "build/script.js")}}"></script>';
        log(chalk.blue(code));
        log("4) Run 'npm run dev' in the root folder of the theme");
        log(chalk.green("5) Now, following routes will be available:"));
        log(chalk.green("a) <public-url>/signin"));
        log(chalk.green("b) <public-url>/signup"));
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
        description: 'Generate Auth operation for VaahCMS Themes',
        default: false,
    }),
};
/*
 *---------------------------------------------------
 * Command Arguments
 *---------------------------------------------------
 */
CmsCrud.args = [];
