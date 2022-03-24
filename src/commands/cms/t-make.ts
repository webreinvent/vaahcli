import {Command, flags} from '@oclif/command'
const Listr = require('listr');

import Generator from "../../libraries/Generator";
import Helpers from "../../libraries/Helpers";
import Functions from '../../libraries/Functions'


const chalk = require('chalk');
const log = console.log;



export default class CmsTMake extends Command {
  questions: {[k: string]: any} = {};
  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};


  static description = 'Generate for VaahCMS Theme';


  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    frontend: flags.boolean({
      char: 'f',
      default: true,
    }),
    backend: flags.boolean({
      char: 'b',
      default: false,
    }),
    help: flags.help({char: 'h'}),
    name: flags.help({char: 'n'}),
  };


  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = [
    {
      name: 'type',
      required: true,
      options:[
        'migration',
        'seed',
        'model',
        'controller',
        'view',
        'middleware',
        'observer',
        'trait',
        'test',
        'event',
        'listener',
        'mail',
        'notification',
      ]
    },
    {
      name: 'theme',
      required: true,
    },
    {
      name: 'name',
      required: true,
    }
  ];


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

    const {args, flags} = this.parse(CmsTMake);

    this.args = args;
    this.flags = flags;
    this.inputs['for'] = 'theme';

    let helpers = new Helpers(this.args, this.flags, this.inputs);

    let params: any = helpers.getDerivedVariables();



    for(let key in params)
    {
      this.inputs[key] = params[key];
    }

    for(let key in this.args)
    {
      this.inputs[key] = this.args[key];
    }

    for(let key in this.flags)
    {
      this.inputs[key] = this.flags[key];
    }

    let source = '\\skeletons\\vaahcms\\theme-files\\';


    let generator = new Generator(args, flags, this.inputs, source, this.inputs['target_dir']);


    log(chalk.green('======================================='));
    log('Generating Files for Theme: '+chalk.green(this.args.theme));
    log(chalk.green('---------------------------------------'));


    const tasks = new Listr([
      {
        title: 'File Generated',
        task: function () {
          generator.file();
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
