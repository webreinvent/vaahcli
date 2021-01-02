import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer';
const Listr = require('listr');

import Questions from "../../libraries/Questions";
import Generator from "../../libraries/Generator";


const chalk = require('chalk');
const log = console.log;


export default class CmsCrud extends Command {
  questions: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};


  static description = 'To generate CRUD operations for VaahCMS Module';


  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.help({char: 'n'}),
    force: flags.boolean({char: 'f'}),
  };


  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = [
    {
      name: 'path',
      required: false,
      default: './',
    },
  ];


  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */
  async run() {
    const {args, flags} = this.parse(CmsCrud)

    let questions = new Questions();

    this.inputs = await inquirer.prompt(questions.getCmsCrudQuestions());

    this.inputs['namespace'] = this.inputs.namespace;

    let source = '\\skeletons\\vaahcms\\crud\\';
    let target = args.path;

    let generator = new Generator(args, flags, this.inputs, source, target);


    log(chalk.green('======================================='));
    log('Generating CRUD for VaahCMS');
    log(chalk.green('---------------------------------------'));


    const tasks = new Listr([
      {
        title: 'Files Generated for CRUD operations',
        task: function () {
          generator.curdFiles();
        }
      }
    ]);

    let self = this;

    tasks.run().then((ctx: any) => {
      self.successMessage();
    }).catch((err: any) => {
      console.error(err);
    });



  }

  //-----------------------------
  successMessage()
  {
    log(chalk.white.bgGreen.bold("      Files Generated!      "));
    log(chalk.green("=================================================================="));
    log(chalk.green("Following steps:"));
    log("1) Include the router file");
    log("2) Include the vue router file");
    log("3) Include the vue store file");
    log(chalk.green("=================================================================="));

  }

}
