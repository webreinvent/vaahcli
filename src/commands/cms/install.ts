import {Command, flags} from '@oclif/command'

let fs = require('fs');
let ora = require('ora');
const execa = require('execa');
const Listr = require('listr');
var shell = require('shelljs');


const chalk = require('chalk');

const log = console.log;


export default class CmsInstall extends Command {
  inputs: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};


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

    await this.spin();
    await this.install();



  }

  //-----------------------------------
  async install()
  {
    const tasks = new Listr([
      {
        title: 'Downloading Repository',
        task: () => new Promise((resolve, reject) => {
          {

            const folder = './../repo-download-test/vaahcms-ready/';
            const path = './../repo-download-test/vaahcms-ready';

            fs.rmdirSync(folder, { recursive: true });

            //shell.cd(path);
            //execa('git clone https://github.com/webreinvent/vaahcms-ready');

            let options = [
              'clone',
              'https://github.com/webreinvent/vaahcms-ready',
              path
            ] ;

            let git = execa('git', options);

            fs.rmdirSync(folder+'.git/', { recursive: true });


            //const cmd = execa('npm', ['run', 'test']);
            git.then(resolve)
              .catch(() => {
                reject(new Error('Failed'));
              });


            return git;
          }
        })
      },
      {
        title: 'Installing Dependencies via Composer',
        task: () => new Promise((resolve, reject) => {
          {

            const folder = './../repo-download-test/vaahcms-ready/';

            shell.cd(folder);

            let options = [
              'install',
            ];

            let composer = execa('composer', options);

            composer.then(resolve)
              .catch(() => {
                reject(new Error('Failed'));
              });

            return composer;
          }
        })
      },
      {
        title: 'Run tests',
        task: () => execa('npm', ['install'])
      }
      /*{
        title: 'Run tests',
        task: () => execa('npm', ['test'])
      },
      {
        title: 'Publish package',
        task: () => execa('npm', ['publish'])
      }*/
    ]);

    tasks.run().then(()=>{
      this.spinStop();
    }).catch((err: any) => {
      console.error(err);
    });

  }
  //-----------------------------------
  //-----------------------------------
  //-----------------------------------
  async spin() {

    let options = {
      spinner: 'toggle9'
    };

    this.spinner = ora(options);


    this.spinner.start('Spinning');
  }
  //-----------------------------------
  async spinStop()
  {
    this.spinner.succeed();

  }
  //-----------------------------------
  //-----------------------------------
  //-----------------------------------


}
