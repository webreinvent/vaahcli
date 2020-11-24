import {Command, flags} from '@oclif/command'

const execa = require('execa');
const Listr = require('listr');


const chalk = require('chalk');
const log = console.log;


export default class CmsInstall extends Command {
  inputs: {[k: string]: any} = {};


  static description = 'Install VaahCMS';


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
  static args = [{name: 'Project Name'}];


  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */
  async run() {

    const {args, flags} = this.parse(CmsInstall);


    const tasks = new Listr([
      {
        title: 'Git',
        task: async () => {

          const {stdout} = await execa('echo', ['unicorns']);
          console.log(stdout);


          /*return new Listr([
            {
              title: 'Checking git status',
              task: () => execa.stdout('git', ['status', '--porcelain']).then((result: string) => {
                if (result !== '') {
                  throw new Error('Unclean working tree. Commit or stash changes first.');
                }
              })
            },
            {
              title: 'Checking remote history',
              task: () => execa.stdout('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD']).then((result: string) => {
                if (result !== '0') {
                  throw new Error('Remote history differ. Please pull changes.');
                }
              })
            }
          ], {concurrent: true});*/




        }
      },
      {
        title: 'Install package dependencies with Yarn',
        task: (ctx: { yarn: boolean; }, task: { skip: (arg0: string) => void; }) => execa('yarn')
          .catch(() => {
            ctx.yarn = false;

            task.skip('Yarn not available, install it via `npm install -g yarn`');
          })
      },
      {
        title: 'Install package dependencies with npm',
        enabled: (ctx: { yarn: boolean; }) => ctx.yarn === false,
        task: () => execa('npm', ['install'])
      },
      {
        title: 'Run tests',
        task: () => execa('npm', ['test'])
      },
      {
        title: 'Publish package',
        task: () => execa('npm', ['publish'])
      }
    ]);

    tasks.run().catch((err: any) => {
      console.error(err);
    });


  }


}
