import {Args, Command, Flags} from '@oclif/core'
const chalk = require('chalk');
let ora = require('ora');
const Listr = require('listr');
import Functions from '../../libraries/Functions'
import Questions from '../../libraries/Questions'
let fs = require('fs');
const inquirer = require('inquirer')
const download = require('download-git-repo');

export default class CmsInstall extends Command {
  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};
  target_dir: string = './';
  source_dir: string = '';
  inputs: {[k: string]: any} = {};

  static args = {
    project_name: Args.string({description: 'Enter the project folder name', default: 'vaahcms'}),
  }

  static description = 'Install VaahCMS'

  static flags = {
    here: Flags.boolean({
      description: 'If you want to install VaahCMS in current directory',
      default: false,
    }),
    help: Flags.help({char: 'h'}),
  }

  async run() {

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }

    const {args, flags} = await this.parse(CmsInstall)

    this.args = args;
    this.flags = flags;

    await this.printName();

    if(!flags.here)
    {
      this.target_dir = this.target_dir+args.project_name;
    }

    let questions = new Questions();

    this.inputs = await inquirer.prompt(questions.getVaahCmsVersions());

    if(this.inputs.version)
    {
      await this.spin();
      await this.install();
    }

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
            if(self.flags.here){
              return resolve(true);
            }
            fs.mkdir(self.target_dir, (err = null,result = null) => {
              if (err != null) {
                this.log("");
                this.log(chalk.red("- Project Folder Already Exists"));
                return reject(err);
              }
              resolve(result);
            });
          }
        })
      },
      {
        title: 'Downloading VaahCMS',
        task: () => new Promise((resolve, reject) => {
          {
            let self = this;
            let repo = 'webreinvent/vaahcms-ready';
            if (self.inputs.version === 'VaahCMS 2.x') {
              repo = 'webreinvent/vaahcms-ready#2.x';
              self.inputs.documentation = "https://docs.vaah.dev/vaahcms-2x";
              //repo =  'https://github.com/webreinvent/vaahcms-ready/archive/2.x.zip';
            }
            if (self.inputs.version === 'VaahCMS 1.x') {
              self.inputs.documentation = "https://docs.vaah.dev/vaahcms-1x";
              repo = 'webreinvent/vaahcms-ready#1.x';
            }
            // @ts-ignore
            download(repo, self.target_dir, function (err) {
              console.log((err ? reject('Error') : resolve('Success')));
            });
          }
        })
      },
    ]);
    tasks.run().then(() => {
      this.spinStop();
    }).catch((err = null) => {
      console.error(err);
      this.spinStopWithError();
    });
  }

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
  async printName()
  {
    this.log(chalk.red(`
 /\\   /\\ __ _   __ _ | |__    / __\\ /\\/\\  / _\\
 \\ \\ / // _\` | / _\` || '_ \\  / /   /    \\ \\ \\
  \\ V /| (_| || (_| || | | |/ /___/ /\\/\\ \\_\\ \\
   \\_/  \\__,_| \\__,_||_| |_|\\____/\\/    \\/\\__/
`));
  }
  //-----------------------------------
  async spinStop()
  {

    this.spinner.succeed();

    this.log(chalk.white.bgGreen.bold("      VaahCMS Installed!      "));

    this.log(chalk.black("=================================================================="));
    this.log("Open the project folder "+chalk.green(this.args.project_name)+" in terminal and follow the steps ");
    this.log("Step 1. Run "+chalk.green("composer install")+" command");
    this.log("Step 2. Run "+chalk.green("php artisan serve")+" command");
    this.log("and visit following url to setup:");
    this.log(chalk.green("http://127.0.0.1:8000/vaahcms/setup"));
    this.log(chalk.bold(chalk.blueBright("OR")));
    this.log("Step 2. In case of "+chalk.green("Xampp or Wamp")+", visit following url to setup:");
    this.log(chalk.green("http://localhost/<project-folder-path>/public/vaahcms/setup"));

    this.log(chalk.redBright("------"));

    this.log(chalk.bold(chalk.blueBright("Documentation: "))+this.inputs.documentation);
    this.log(chalk.black("=================================================================="));

  }
  //-----------------------------------
  async spinStopWithError()
  {

    this.spinner.succeed();

    this.log(chalk.white.bgRed.bold("      VaahCMS Installation Failed!      "));

  }

}
