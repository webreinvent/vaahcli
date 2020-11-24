const {Command, flags} = require('@oclif/command');
import * as inquirer from 'inquirer';
import cli from 'cli-ux';
let log = require('color-console');

const questions = [
  {
    type : 'input',
    name : 'vendor_name',
    default: 'WebReinvent',
    message : 'Enter your vendor name: '
  },
  {
    type : 'input',
    name : 'package_name',
    default: 'LvTags',
    message : 'Enter your package name: '
  },
  {
    type : 'input',
    name : 'description',
    default: 'description',
    message : 'Enter your package description: '
  },
  {
    type : 'input',
    name : 'homepage',
    default: 'https://www.webreinvent.com',
    message : 'Enter homepage url: '
  },
  {
    type : 'input',
    name : 'author_name',
    default: 'pradeep',
    message : 'Enter Author name: '
  },
  {
    type : 'input',
    name : 'author_email',
    default: 'we@webreinvent.com',
    message : 'Enter Author email: '
  },

];

class MCommand extends Command {
  async run() {



    let responses = await inquirer.prompt([questions]);

    console.log('--->', responses);

  }
}




MCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
};

module.exports = MCommand;
