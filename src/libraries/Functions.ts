const axios = require('axios');

const chalk = require('chalk');

var semver = require('semver');
const package_json = require("./../../package.json");


const log = console.log;

export default class Helpers {

  package_url: string = 'https://registry.npmjs.org/vaah/latest';


  //-------------------------------------------------------
  async isUpdatesAvailable()
  {
    let version = 0;
    let pack = {
      version: 0
    };
    pack = await axios.get(this.package_url).then(function (response: any) {
      return response.data;
    })

    version = pack.version;

    let is_updates_available = semver.gt(version, package_json.version);

    if(is_updates_available)
    {
      log(chalk.white.bgRed.bold('New update is available'));
      log(chalk.red('---------------------------------------'));
      log('Installed Version: '+package_json.version);
      log('Available Version: '+version);
      log('Install via: '+chalk.black.bgGreenBright('  npm i vaah -g  '));
      log(chalk.red('---------------------------------------'));
    }

    return is_updates_available;
  }
  //-------------------------------------------------------
  generateRandom(min = 0, max = 100) {

    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor( rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
  }
  //-------------------------------------------------------

  //-------------------------------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------


}
