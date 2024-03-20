import {Args, Command, Flags} from '@oclif/core'
import Questions from '../../libraries/Questions'
const inquirer = require('inquirer')
import Generator from '../../libraries/Generator'
import Helpers from '../../libraries/Helpers'
import Functions from '../../libraries/Functions'

let fs = require('fs');
let ora = require('ora');
const Listr = require('listr');

const download = require('download-git-repo');
const chalk = require('chalk');

export default class FlutterInstall extends Command {

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
    help: Flags.boolean({
      description: 'Installation of VaahFlutter',
      default: false,
    }),
  };

  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = {};

  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */
  async run() {

    // this.log(chalk.white.bgGreen.bold("      This command are only for Vue 3 module      "));

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }


    const {args, flags} = await this.parse(FlutterInstall)

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

    let source = '/skeletons/flutter/install/';

    this.target_dir = this.target_dir+this.inputs.app_name;

    let generator = new Generator(this.args, this.flags, this.inputs, source, this.target_dir);

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
                  this.log("");
                  this.log(chalk.red("- Project Folder Already Exists"));
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
        task: () => new Promise((resolve, reject) => {
          generator.generateFlutterFiles();
          resolve(true);
        })
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

  //-----------------------------------
  async spin() {


    this.spinner = ora();

    this.spinner.start('Installing VaahFlutter...');

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
  async spinStop()
  {

    this.spinner.succeed();

    this.log(chalk.white.bgGreen.bold("      VaahFlutter Installed!      "));

    this.log(chalk.black("=================================================================="));
    this.log("Open the project folder "+chalk.green(this.inputs.app_name)+" in terminal and follow the steps ");
    this.log("Step 1. Run "+chalk.green("flutter pub get")+" command");
    this.log("Step 2. Run "+chalk.green("flutter run")+" command");
    this.log(chalk.redBright("------"));
    this.log(chalk.bold(chalk.blueBright("Documentation: "))+this.inputs.documentation);
    this.log(chalk.black("=================================================================="));

  }
  //-----------------------------------
  async spinStopWithError()
  {

    this.spinner.succeed();

    this.log(chalk.white.bgRed.bold("      VaahFlutter Installation Failed!      "));

  }
  //-----------------------------------
  //---------------------------------------------------


}
