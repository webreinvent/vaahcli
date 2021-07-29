"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@oclif/command");
let fs = require('fs');
let ora = require('ora');
const execa = require('execa');
const Listr = require('listr');
var shell = require('shelljs');
const { exec } = require('child_process');
let fsSync = require('fs-sync');
const fsPromises = fs.promises;
// @ts-ignore
const gitly_1 = require("gitly");
const Functions_1 = require("../../libraries/Functions");
const chalk = require('chalk');
const log = console.log;
class CmsInstall extends command_1.Command {
    constructor() {
        super(...arguments);
        this.args = {};
        this.flags = {};
        this.inputs = {};
        this.spinner = {};
        this.repo = 'https://github.com/webreinvent/vaahcms-ready';
        this.target_dir = './';
        this.source_dir = '';
        //-----------------------------------
        //-----------------------------------
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
        const { args, flags } = this.parse(CmsInstall);
        this.args = args;
        this.flags = flags;
        await this.printName();
        await this.spin();
        if (!flags.here) {
            this.target_dir = this.target_dir + args.project_name;
        }
        await this.install();
    }
    //-----------------------------------
    //-----------------------------------
    async install() {
        const tasks = new Listr([
            {
                title: 'Creating Project Folder',
                task: () => new Promise((resolve, reject) => {
                    {
                        let self = this;
                        if (this.args.project_name) {
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
                title: 'Downloading VaahCMS',
                task: () => new Promise((resolve, reject) => {
                    {
                        let self = this;
                        // @ts-ignore
                        gitly_1.download('webreinvent/vaahcms-ready').then(download => {
                            self.source_dir = download;
                        }).then(resolve)
                            .catch(() => {
                            reject(new Error('Failed'));
                        });
                    }
                })
            },
            {
                title: 'Extracting VaahCMS Files',
                task: () => new Promise((resolve, reject) => {
                    {
                        gitly_1.extract(this.source_dir, this.target_dir).then(resolve)
                            .catch(() => {
                            reject(new Error('Failed'));
                        });
                    }
                })
            },
            {
                title: 'Installing Dependencies via Composer (Takes 3 - 5 minutes)',
                task: () => new Promise((resolve, reject) => {
                    {
                        log(chalk.yellow("Be patient, this can take up to 5 - 6 minutes.."));
                        shell.cd(this.target_dir);
                        //let project = '.git';
                        //fs.rmdirSync(project, {recursive: true});
                        let options = [
                            'install',
                            '--ignore-platform-reqs'
                        ];
                        let composer;
                        composer = execa('composer', options);
                        //---print composer command progress
                        let output_options = {
                            buffer: true,
                            stderr: "inherit"
                        };
                        //composer = execa('composer', options, output_options);
                        //composer.stdout.pipe(process.stdout);
                        //---end of print composer command progress
                        composer.then(resolve)
                            .catch((error) => {
                            return reject(error);
                        });
                        return composer;
                    }
                })
            }
            /*,
            {
              title: 'Configuring VaahCMS',
              task: () => new Promise((resolve, reject) => {
                {
      
                  shell.cd(this.target_dir);
      
                  let options = [
                    'artisan',
                    'vendor:publish',
                    '--provider="WebReinvent\\VaahCms\\VaahCmsServiceProvider"',
                    '--tag=assets',
                    '--force',
                  ];
      
                  let command = execa('php', options, {
                    buffer: true,
                    stderr: "inherit"
                  });
      
                  command.stdout.pipe(process.stdout);
      
                  command.then(resolve)
                    .catch(() => {
                      reject(new Error('Failed'));
                    });
      
                  return command;
                }
              })
            }*/
        ]);
        tasks.run().then(() => {
            this.spinStop();
        }).catch((err) => {
            console.error(err);
            this.spinStopWithError();
        });
    }
    //-----------------------------------
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
        log(chalk.white.bgGreen.bold("      VaahCMS Installed!      "));
        log(chalk.black("=================================================================="));
        log("Open the project folder and run the following command ");
        log(chalk.green("php artisan serve"));
        log("then visit following url to setup:");
        log(chalk.green("http://127.0.0.1:8000/vaahcms/setup"));
        log("Or");
        log("In case of " + chalk.green("Xampp or Wamp") + ", visit following url to setup:");
        log(chalk.green("http://localhost/<project-folder-path>/public/vaahcms/setup"));
        log(chalk.black("=================================================================="));
    }
    //-----------------------------------
    async spinStopWithError() {
        this.spinner.succeed();
        log(chalk.white.bgRed.bold("      VaahCMS Installation Failed!      "));
    }
}
exports.default = CmsInstall;
CmsInstall.description = 'Install VaahCMS';
/*
 *---------------------------------------------------
 * Command Flags/Options
 *---------------------------------------------------
 */
CmsInstall.flags = {
    here: command_1.flags.boolean({
        description: 'If you want to install VaahCMS in current directory',
        default: false,
    }),
    help: command_1.flags.help({ char: 'h' }),
};
/*
 *---------------------------------------------------
 * Command Arguments
 *---------------------------------------------------
 */
CmsInstall.args = [
    {
        name: 'project_name',
        description: 'Enter the project folder name',
        default: 'vaahcms',
    }
];
