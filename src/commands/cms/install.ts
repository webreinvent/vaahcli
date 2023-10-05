import {Args, Command, Flags} from '@oclif/core'

import {Helpers} from '../../libraries/Helpers'

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
      default: "",
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
      }
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


    /*const {args, flags} = await this.parse(CmsInstall)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /Volumes/Data/projects/vaahcli/src/commands/cms/install.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }*/
  }
}
