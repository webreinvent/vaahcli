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
    person: Args.string({description: 'Person to say hello to', required: true}),
  }

  static description = 'Say hello'

  static examples = [
    `$ oex hello friend --from oclif
hello friend from oclif! (./src/commands/hello/index.ts)
`,
  ]

  static flags = {
    from: Flags.string({char: 'f', description: 'Who is saying hello', required: true}),
  }

  async run() {

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }

    const {args, flags} = await this.parse(CmsInstall)


    await this.printName();

    let questions = new Questions();

    const inputs = await inquirer.prompt(questions.getVaahCmsVersions());

    if(inputs.version)
    {
      await this.spin();
      await this.install();
    }

    this.log(`hello ${args.person} from ${flags.from}! (./src/commands/hello/index.ts)`)
  }

  //-----------------------------------
  //-----------------------------------
  async install() {
    this.log('his.target_dir',this.target_dir)
    const tasks = new Listr([
      {
        title: 'Creating Project Folder',
        task: () => new Promise((resolve, reject) => {
          {
            let self = this;
              fs.mkdir(self.target_dir, () => {
                // if (error != null) {
                //   log("");
                //   log(chalk.red("- Project Folder Already Exists"));
                //   return reject(error);
                // }
                // resolve();
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
              self.inputs.documentation = "https://docs.vaah.dev/vaahcms-2/";
              //repo =  'https://github.com/webreinvent/vaahcms-ready/archive/2.x.zip';
            }
            if (self.inputs.version === 'VaahCMS 1.x') {
              self.inputs.documentation = "https://docs.vaah.dev/vaahcms/";
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
    }).catch(() => {
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
