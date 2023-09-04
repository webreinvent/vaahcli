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
const download = require('download-git-repo');
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
        this.repo = 'https://github.com/webreinvent/vaahflutter';
        this.target_dir = './';
        this.source_dir = '';
        //-----------------------------------
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
        await this.spin();
        await this.install();
    }
    //---------------------------------------------------
    async install() {
        let self = this;
        let source = '\\skeletons\\flutter\\install\\';
        this.target_dir = this.target_dir + this.inputs.app_name;
        let generator = new Generator_1.default(this.args, command_1.flags, this.inputs, source, this.target_dir);
        const tasks = new Listr([
            {
                title: 'Creating Project Folder',
                task: () => new Promise((resolve, reject) => {
                    {
                        let self = this;
                        if (this.inputs.app_name) {
                            fs.mkdir(self.target_dir, (error, result) => {
                                if (error != null) {
                                    log("");
                                    log(chalk.red("- Project Folder Already Exists"));
                                    return reject(error);
                                }
                                resolve(result);
                            });
                        }
                    }
                })
            },
            {
                title: 'Downloading VaahFlutter',
                task: () => new Promise((resolve, reject) => {
                    {
                        let self = this;
                        let repo = '';
                        repo = 'webreinvent/vaahflutter';
                        self.inputs.documentation = "https://docs.vaah.dev/vaahflutter";
                        // @ts-ignore
                        download(repo, self.target_dir, function (err) {
                            console.log((err ? reject('Error') : resolve('Success')));
                        });
                    }
                })
            },
            {
                title: 'Configuring The Project',
                task: function () {
                    generator.generateFlutterFiles();
                }
            }
        ]);
        tasks.run().then((ctx) => {
            this.spinStop();
        }).catch((err) => {
            console.error(err);
            this.spinStopWithError();
        });
    }
    //---------------------------------------------------
    successMessage() {
        log(chalk.white.bgGreen.bold("      Files Generated!      "));
        log(chalk.green("=================================================================="));
    }
    //---------------------------------------------------
    //-----------------------------------
    async spin() {
        this.spinner = ora();
        this.spinner.start('Installing VaahCMS...');
        this.spinner._spinner = {
            "interval": 80,
            "frames": [
                "⠋",
                "⠙",
                "⠹",
                "⠸",
                "⠼",
                "⠴",
                "⠦",
                "⠧",
                "⠇",
                "⠏"
            ]
        };
    }
    //-----------------------------------
    async printName() {
        log(chalk.red(`
 /\\   /\\ __ _   __ _ | |__    / __\\ /\\/\\  / _\\
 \\ \\ / // _\` | / _\` || '_ \\  / /   /    \\ \\ \\
  \\ V /| (_| || (_| || | | |/ /___/ /\\/\\ \\_\\ \\
   \\_/  \\__,_| \\__,_||_| |_|\\____/\\/    \\/\\__/
`));
    }
    //-----------------------------------
    async spinStop() {
        this.spinner.succeed();
        log(chalk.white.bgGreen.bold("      VaahFlutter Installed!      "));
        log(chalk.black("=================================================================="));
        log("Open the project folder " + chalk.green(this.inputs.app_name) + " in terminal and follow the steps ");
        log("Step 1. Run " + chalk.green("flutter pub get") + " command");
        log("Step 2. Run " + chalk.green("flutter run") + " command");
        log(chalk.redBright("------"));
        log(chalk.bold(chalk.blueBright("Documentation: ")) + this.inputs.documentation);
        log(chalk.black("=================================================================="));
    }
    //-----------------------------------
    async spinStopWithError() {
        this.spinner.succeed();
        log(chalk.white.bgRed.bold("      VaahCMS Installation Failed!      "));
    }
}
exports.default = CmsCrud;
CmsCrud.description = 'Installation of VaahFlutter';
/*
 *---------------------------------------------------
 * Command Flags/Options
 *---------------------------------------------------
 */
CmsCrud.flags = {
    help: command_1.flags.boolean({
        description: 'Installation of VaahFlutter',
        default: false,
    }),
};
/*
 *---------------------------------------------------
 * Command Arguments
 *---------------------------------------------------
 */
CmsCrud.args = [];
