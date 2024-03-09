import {Args, Command, Flags} from '@oclif/core'

import {Helpers} from '../../libraries/Helpers'
import {Questions} from '../../libraries/Questions'
let fs = require('fs');
const chalk = require('chalk')
import { Listr } from 'listr2'
import ora from 'ora';
const log = console.log
// import inquirer from 'inquirer'
import { select  } from '@inquirer/prompts';

export default class CmsInstall extends Command {
  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};
  repo: string = 'https://github.com/webreinvent/vaahcms-ready';
  target_dir: string = '';
  source_dir: string = '';
  static description = 'Install VaahCMS'

  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    folder: Flags.string({
      description: 'If you want to install VaahCMS in current directory',
      default: '',
    }),
    help: Flags.help({char: 'h'}),
  };

  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = {
    name: Args.string(
      {
        name: 'project_name',
        description: 'Project Name',
        default: 'vaahcms',
      },
    ),
  }


  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */
  public async run(): Promise<any> {
    const {args, flags} = await this.parse(CmsInstall)

    let helpers = new Helpers(args, flags, this.inputs);

    let is_updates_available = await helpers.isUpdatesAvailable();
    if(is_updates_available)
    {
      return false;
    }

    // const {args, flags} = this.parse(CmsInstall)
    //
    // this.args = args
    // this.flags = flags
    //
    // log(this.args)

    await this.printName()

    let questions = new Questions();

    const version_value = await select(questions.getVaahCmsVersions())

    if(version_value)
    {
      await this.spin();
      await this.install();
    }

    /*const {args, flags} = await this.parse(CmsInstall)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /Volumes/Data/projects/vaahcli/src/commands/cms/install.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }*/
  }
  //-----------------------------------

  public async printName(): Promise<any> {
    log(chalk.red(`
     /\\   /\\ __ _   __ _ | |__    / __\\ /\\/\\  / _\\
     \\ \\ / // _\` | / _\` || '_ \\  / /   /    \\ \\ \\
      \\ V /| (_| || (_| || | | |/ /___/ /\\/\\ \\_\\ \\
       \\_/  \\__,_| \\__,_||_| |_|\\____/\\/    \\/\\__/
    `))
  }
  public async install()
  {
    const tasks = new Listr([
      {
        title: 'Creating Project Folder',
        task: () => new Promise((resolve, reject) => {
          {

            let self = this;
            if(this.args.project_name)
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
        title: 'Downloading VaahCMS',
        task: () => new Promise((resolve, reject) => {
          {

            let self = this;
            let repo = 'webreinvent/vaahcms-ready';



            if(self.inputs.version === 'VaahCMS 2.x')
            {
              repo =  'webreinvent/vaahcms-ready#2.x';
              self.inputs.documentation = "https://docs.vaah.dev/vaahcms-2/";
              //repo =  'https://github.com/webreinvent/vaahcms-ready/archive/2.x.zip';
            }

            if(self.inputs.version === 'VaahCMS 1.x')
            {
              self.inputs.documentation = "https://docs.vaah.dev/vaahcms/";
              repo =  'webreinvent/vaahcms-ready#1.x';
            }

            // @ts-ignore
            download(repo, self.target_dir, function (err: any) {
              console.log((err ? reject('Error') : resolve('Success')));
            })

          }
        })
      },
      // /*{
      //   title: 'Extracting VaahCMS Files',
      //   task: () => new Promise((resolve, reject) => {
      //     {
      //       extract(this.source_dir, this.target_dir).then(resolve)
      //         .catch(() => {
      //           reject(new Error('Failed'));
      //         });
      //     }
      //   })
      // }, */
      //
      // /* {
      //   title: 'Installing Dependencies via Composer (Takes 3 - 5 minutes)',
      //   task: () => new Promise((resolve, reject) => {
      //     {
      //
      //       log(chalk.yellow("Be patient, this can take up to 5 - 6 minutes.."));
      //
      //       shell.cd(this.target_dir);
      //
      //       //let project = '.git';
      //
      //       //fs.rmdirSync(project, {recursive: true});
      //
      //       let options = [
      //         'install',
      //         '--ignore-platform-reqs'
      //       ];
      //
      //       let composer;
      //
      //       composer = execa('composer', options);
      //
      //       //---print composer command progress
      //       let output_options = {
      //         buffer: true,
      //         stderr: "inherit"
      //       };
      //       //composer = execa('composer', options, output_options);
      //       //composer.stdout.pipe(process.stdout);
      //       //---end of print composer command progress
      //
      //
      //
      //       composer.then(resolve)
      //         .catch((error: any) => {
      //           return reject(error);
      //         });
      //
      //       return composer;
      //
      //     }
      //   })
      // }, */
      // /*
      //  {
      //   title: 'Publishing Assets',
      //   task: () => new Promise((resolve, reject) => {
      //     {
      //
      //       shell.cd(this.target_dir);
      //
      //       let options = [
      //         'artisan',
      //         'vendor:publish',
      //         '--provider="WebReinvent\\VaahCms\\VaahCmsServiceProvider"',
      //         '--tag=assets',
      //         '--force',
      //       ];
      //
      //       let command = execa('php', options, {
      //         buffer: true,
      //         stderr: "inherit"
      //       });
      //
      //       command.stdout.pipe(process.stdout);
      //
      //       command.then(resolve)
      //         .catch(() => {
      //           reject(new Error('Failed'));
      //         });
      //
      //       return command;
      //     }
      //   })
      // } */

    ]);

    tasks.run().then(()=>{
      // this.spinStop();
    }).catch((err: any) => {

      console.error(err);
      // this.spinStopWithError();

    });

  }
  //-----------------------------------
  public async spin() {

    // const spinner =  ora();
    // this.spinner = Spinner;
    //
    // this.spinner.start('Installing VaahCMS...');
    //
    // this.spinner._spinner = {
    //   "interval": 80,
    //   "frames": [
    //     "⠋",
    //     "⠙",
    //     "⠹",
    //     "⠸",
    //     "⠼",
    //     "⠴",
    //     "⠦",
    //     "⠧",
    //     "⠇",
    //     "⠏"
    //   ]
    // };

  }
}
