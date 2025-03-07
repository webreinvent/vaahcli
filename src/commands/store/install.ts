import {Args, Command, Flags} from '@oclif/core'
const chalk = require('chalk');
let ora = require('ora');
const Listr = require('listr');
import Functions from '../../libraries/Functions'
import Questions from '../../libraries/Questions'
import Generator from "../../libraries/Generator";
let fs = require('fs');
const inquirer = require('inquirer')
const download = require('download-git-repo');

export default class StoreInstall2 extends Command {
  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};
  target_dir: string = './';
  module_target_dir: string = '/VaahCms/Modules/Store';
  source_dir: string = '';
  inputs: {[k: string]: any} = {};

  static args = {
    project_name: Args.string({description: 'Enter the project folder name', default: 'vaahstore'}),
  }

  static description = 'Install VaahStore'

  static flags = {
    here: Flags.boolean({
      description: 'If you want to install VaahStore in current directory',
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

    const {args, flags} = await this.parse(StoreInstall2)

    this.args = args;
    this.flags = flags;

    await this.printName();

    if(!flags.here)
    {
      this.target_dir = this.target_dir+args.project_name;
    }

    let questions = new Questions();

    this.inputs = await inquirer.prompt(questions.getSetupOptions());

    this.inputs.project_name = args.project_name;

    if(this.inputs.setup === 'wizard')
    {
      await this.spin();
      await this.install();

      return false;
    }

    let database_inputs = await inquirer.prompt(questions.getDatabaseOptions());

    let admin_inputs = await inquirer.prompt(questions.getSuperAdminOptions());

    this.inputs = {
      ...database_inputs,
      ...admin_inputs,
      ...this.inputs
    }

    await this.spin();
    await this.install(true);

  }

  //-----------------------------------
  //-----------------------------------
  async install(withConfiguration = false) {

    let source = '/skeletons/vaahstore/install/';

    this.target_dir = this.target_dir;

    let generator = new Generator(this.args, this.flags, this.inputs, source, this.target_dir);

    let listrOptions = [
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
        title: 'Downloading VaahStore',
        task: () => new Promise((resolve, reject) => {
          {
            let self = this;
            let repo = 'webreinvent/vaahstore-ready';
            // @ts-ignore
            download(repo, self.target_dir, function (err) {
              console.log((err ? reject('Error') : resolve('Success')));
            });
          }
        })
      },
      {
        title: 'Downloading Store Module',
        task: () => new Promise((resolve, reject) => {
          {
            let self = this;
            let repo = 'webreinvent/vaahcms-module-store';
            self.inputs.documentation = "https://docs.vaah.dev/vaahstore";
            // @ts-ignore
            download(repo, self.target_dir+self.module_target_dir, function (err) {
              console.log((err ? reject('Error') : resolve('Success')));
            });
          }
        })
      }
    ];

    if(withConfiguration){
      listrOptions.push({
        title: 'Configuring The Project',
        task: () => new Promise((resolve, reject) => {
          generator.generateVaahStoreFiles();
          resolve(true);
        })
      })
    }

    const tasks = new Listr(listrOptions);
    tasks.run().then(() => {
      this.spinStop();
    }).catch((err = null) => {
      console.error(err);
      this.spinStopWithError();
    });
  }

  async spin() {

    this.spinner = ora();

    this.spinner.start('Installing VaahStore...');

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
__     __          _     ____  _                 
\\ \\   / /_ _  __ _| |__ / ___|| |_ ___  _ __ ___ 
 \\ \\ / / _\` |/ _\` | '_ \\\\___ \\| __/ _ \\| '__/ _ \\
  \\ V / (_| | (_| | | | |___) | || (_) | | |  __/
   \\_/ \\__,_|\\__,_|_| |_|____/ \\__\\___/|_|  \\___|
`));
  }
  //-----------------------------------
  async spinStop()
  {

    this.spinner.succeed();

    this.log(chalk.white.bgGreen.bold("      VaahStore Installed!      "));

    this.log(chalk.black("=================================================================="));
    this.log("Open the project folder "+chalk.green(this.args.project_name)+" in terminal and follow the steps ");
    this.log("Step 1. Run "+chalk.green("composer install")+" command");
    if(this.inputs.setup === 'cli'){
      this.log("Step 2. Run "+chalk.green("php artisan app:setup")+" command");
      this.log("Step 3. Run "+chalk.green("php artisan serve")+" command");
      this.log("and visit following url to setup:");
      this.log(chalk.green("http://127.0.0.1:8000/backend"));
      this.log(chalk.bold(chalk.blueBright("OR")));
      this.log("Step 3. In case of "+chalk.green("Xampp or Wamp")+", visit following url to setup:");
      this.log(chalk.green("http://localhost/"+this.args.project_name+"/public/backend"));
    }else{
      this.log("Step 2. Run "+chalk.green("php artisan serve")+" command");
      this.log("and visit following url to setup:");
      this.log(chalk.green("http://127.0.0.1:8000/vaahcms/setup"));
      this.log(chalk.bold(chalk.blueBright("OR")));
      this.log("Step 2. In case of "+chalk.green("Xampp or Wamp")+", visit following url to setup:");
      this.log(chalk.green("http://localhost/"+this.args.project_name+"/public/vaahcms/setup"));
    }

    this.log(chalk.redBright("------"));

    this.log(chalk.bold(chalk.blueBright("Documentation: "))+this.inputs.documentation);
    this.log(chalk.black("=================================================================="));

  }
  //-----------------------------------
  async spinStopWithError()
  {

    this.spinner.succeed();

    this.log(chalk.white.bgRed.bold("      VaahStore Installation Failed!      "));

  }

}
