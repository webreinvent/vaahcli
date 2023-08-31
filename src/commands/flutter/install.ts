import {Command, flags} from '@oclif/command'
import Questions from '../../libraries/Questions'
import * as inquirer from 'inquirer'
import Generator from '../../libraries/Generator'
import Helpers from '../../libraries/Helpers'
import Functions from '../../libraries/Functions'

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

export default class CmsCrud extends Command {

  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  primary: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};
  primary_inputs: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};
  repo: string = 'https://github.com/webreinvent/vaahflutter';
  target_dir: string = './';
  source_dir: string = '';

  static description = 'Installation of VaahFlutter'

  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    help: flags.boolean({
      description: 'Installation of VaahFlutter',
      default: false,
    }),
  };

  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = [];

  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */
  async run() {

    // log(chalk.white.bgGreen.bold("      This command are only for Vue 3 module      "));

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }


    const {args, flags} = this.parse(CmsCrud)

    let questions = new Questions();

    let get_questions = questions.getFlutterQuestions();

    this.inputs = await inquirer.prompt(get_questions);

    this.inputs = {
      ...this.primary_inputs,
      ...this.inputs
    };

    this.inputs.for = this.primary.for;

    await this.spin();
    await this.install();

  }

  //---------------------------------------------------
  async install()
  {

    let self = this;

    let source = '\\skeletons\\flutter\\install\\';

    this.target_dir = this.target_dir+this.inputs.app_name;

    let generator = new Generator(this.args, flags, this.inputs, source, this.target_dir);

    const tasks = new Listr([
      {
        title: 'Creating Project Folder',
        task: () => new Promise((resolve, reject) => {
          {

            let self = this;
            if(this.inputs.app_name)
            {

              fs.mkdir(self.target_dir, (error: null, result: unknown) => {
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

            repo =  'webreinvent/vaahflutter';
            self.inputs.documentation = "https://docs.vaah.dev/vaahflutter";

            // @ts-ignore
            download(repo, self.target_dir, function (err: any) {
              console.log((err ? reject('Error') : resolve('Success')));
            })

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

    tasks.run().then((ctx: any) => {
      this.spinStop();
    }).catch((err: any) => {
      console.error(err);
      this.spinStopWithError();
    });
  }
  //---------------------------------------------------
  successMessage()
  {

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
  async printName()
  {
    log(chalk.red(`
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

    log(chalk.white.bgGreen.bold("      VaahFlutter Installed!      "));

    log(chalk.black("=================================================================="));
    log("Open the project folder "+chalk.green(this.inputs.app_name)+" in terminal and follow the steps ");
    log("Step 1. Run "+chalk.green("flutter pub get")+" command");
    log("Step 2. Run "+chalk.green("flutter run")+" command");
    log(chalk.redBright("------"));
    log(chalk.bold(chalk.blueBright("Documentation: "))+this.inputs.documentation);
    log(chalk.black("=================================================================="));

  }
  //-----------------------------------
  async spinStopWithError()
  {

    this.spinner.succeed();

    log(chalk.white.bgRed.bold("      VaahCMS Installation Failed!      "));

  }
  //-----------------------------------
  //---------------------------------------------------


}
