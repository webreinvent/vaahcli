import {Args, Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')
const Listr = require('listr');

import Questions from "../../libraries/Questions";
import Generator from "../../libraries/Generator";
import Functions from '../../libraries/Functions'


const chalk = require('chalk');


export default class CmsT extends Command {

  questions: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};


  static description = 'To generate theme for VaahCMS';


  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    help: Flags.help({char: 'h'}),
    name: Flags.help({char: 'n'}),
    force: Flags.boolean({char: 'f'}),
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

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }

    const {args, flags} = await this.parse(CmsT);

    let questions = new Questions();

    this.inputs = await inquirer.prompt(questions.getVaahCmsThemeQuestions());

    this.inputs['webpack_port'] = functions.generateRandom(8000, 8999);

    this.inputs['namespace'] = 'VaahCms\\Themes\\'+this.inputs.theme_name;
    this.inputs['service_provider_name'] = this.inputs.theme_name+'ServiceProvider.php';

    this.inputs['year'] = (new Date()).getFullYear();

    let source = '/skeletons/vaahcms/theme/';
    let target = "./VaahCms/Themes/"+this.inputs.theme_name;

    let generator = new Generator(args, flags, this.inputs, source, target);


    this.log(chalk.green('======================================='));
    this.log('Generating Theme: '+chalk.green(this.inputs.theme_name));
    this.log(chalk.green('---------------------------------------'));


    const tasks = new Listr([
      {
        title: 'Files Generated',
        task: function () {
          generator.files();

        }
      }
    ]);


    tasks.run().then((ctx: any) => {
      this.log(chalk.green('======================================='));
    }).catch((err: any) => {
      console.error(err);
    });


  }
}
