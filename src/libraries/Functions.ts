const axios = require('axios');

const chalk = require('chalk');
let fs = require('fs');
let path = require('path');
let ejs = require('ejs');
let fsSync = require('fs-sync');
var dateFormat = require('dateformat');

var semver = require('semver');
const package_json = require("./../../package.json");


const log = console.log;

export default class Helpers {

  package_url: string = 'https://api.npms.io/v2/package/vaah';


  //-------------------------------------------------------
  async isUpdatesAvailable()
  {
    let version = 0;
    let pack = {
      collected: {
        metadata: {
          version: 0
        }
      },
    };
    pack = await axios.get(this.package_url).then(function (response: any) {
      return response.data;
    })

    version = pack.collected.metadata.version;

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
  //-------------------------------------------------------

  //-------------------------------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------


}
