import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer';
const Listr = require('listr');

import Questions from "../../libraries/Questions";
import Generator from "../../libraries/Generator";
import Functions from '../../libraries/Functions'


const chalk = require('chalk');
const log = console.log;


export default class CmsMCrud extends Command {
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
  static args = [];


  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */
  async run() {

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }

    const {args, flags} = this.parse(CmsMCrud)

    let questions = new Questions();

    this.inputs = await inquirer.prompt(questions.getModuleCrudQuestions());

    this.inputs['namespace'] = 'VaahCms\\Modules\\'+this.inputs.module_name;

    let source = '\\skeletons\\vaahcms\\module-crud\\';
    let target = "./VaahCms/Modules/"+this.inputs.module_name;

    let generator = new Generator(args, flags, this.inputs, source, target);


    log(chalk.green('======================================='));
    log('Generating CRUD for Module: '+chalk.green(this.inputs.module_name));
    log(chalk.green('---------------------------------------'));


    const tasks = new Listr([
      {
        title: 'Files Generated for CRUD operations',
        task: function () {
          generator.files();
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


  //---------------------------------------------------
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

  //---------------------------------------------------
  //---------------------------------------------------

}
