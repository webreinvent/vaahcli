import {Command, flags} from '@oclif/command'
import * as inquirer from 'inquirer';
const Listr = require('listr');

import Questions from "../../libraries/Questions";
import Generator from "../../libraries/Generator";


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


    tasks.run().then((ctx: any) => {
      log(chalk.green('======================================='));
    }).catch((err: any) => {
      console.error(err);
    });



  }
}
