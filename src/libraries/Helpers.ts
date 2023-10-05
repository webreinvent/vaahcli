const axios = require('axios');
const dateFormat = require('dateformat');
const path = require('path');
const semver = require('semver');
const chalk = require('chalk');
const log = console.log;
const package_json_path = path.resolve(__dirname, "..", "..", 'package.json');
const package_json = require(package_json_path);

export class Helpers {
  private _args: {[k: string]: any} = {};
  private _flags: {[k: string]: any} = {};
  private _inputs: {[k: string]: any} = {};
  private _package_url: string = 'https://api.npms.io/v2/package/vaah';

  constructor(args: object, flags: object, inputs: object) {
    this._args = args;
    this._flags = flags;
    this._inputs = inputs;
    this.setLowerAndUpperCaseValues();
  }

  //-------------------------------------------------------
  set args(obj: object) {
    this._args = obj;
  }
  set flags(obj: object) {
    this._flags = obj;
  }
  set inputs(obj: object) {
    this._inputs = obj;
  }

  get args(): object {
    return this._args;
  }

  get flags(): object {
    return this._flags;
  }

  get inputs(): object {
    return this._inputs
  }
  //-------------------------------------------------------
  setLowerAndUpperCaseValues()
  {
    if(Object.keys(this._args).length)
    {
      for (let key in this._args) {
        if (typeof this._inputs[key] === 'string'){
          this._args[key+'_lower'] = this._args[key].toLowerCase();
          this._args[key+'_upper'] = this._args[key].toUpperCase();
        }

      }
    }

    if(Object.keys(this._flags).length)
    {
      for (let key in this._flags) {
        if (typeof this._inputs[key] === 'string'){
          this._flags[key+'_lower'] = this._flags[key].toLowerCase();
          this._flags[key+'_upper'] = this._flags[key].toUpperCase();
        }

      }
    }

    if(Object.keys(this._inputs).length)
    {
      for (let key in this._inputs) {

        if (typeof this._inputs[key] === 'string'){
          this._inputs[key+'_lower'] = this._inputs[key].toLowerCase();
          this._inputs[key+'_upper'] = this._inputs[key].toUpperCase();
        }

      }
    }

  }

  isPackageUpdated()
  {
    axios.get(this._package_url).then(function (response: any) {
      console.log(response);
    })
  }

  //-------------------------------------------------------
  replaceAll(str:string, find:string, replace:string){
    return str.replace(new RegExp(find, 'g'), replace);
  }
  //-------------------------------------------------------
  titleCase(str:string)
  {
    let wordsArray = str.toLowerCase().split(/\s+/);
    let upperCased = wordsArray.map(function(word) {
      return word.charAt(0).toUpperCase() + word.substr(1);
    });
    return upperCased.join(" ");
  }
  //-------------------------------------------------------
  getClassName(str:string)
  {
    let class_name = '';

    class_name = str;
    class_name = this.replaceAll(class_name, "_", " ");
    class_name = this.titleCase(class_name);
    class_name = this.replaceAll(class_name, " ", "");

    return class_name;

  }
  //-------------------------------------------------------
  getMigrationFileName(str:string)
  {
    var now = new Date();
    let name = dateFormat(now, "yyyy_mm_dd_HHMMss_")+str;

    name = this.replaceAll(name, " ", "_");
    name = name.toLowerCase();
    name = name+'.php';

    return name;

  }
  //-------------------------------------------------------
  getMigrationTableName(str:string)
  {
    let name = '';

    name = str.toLowerCase();
    name = this.replaceAll(name, " ", '_');

    return name;

  }
  //-------------------------------------------------------
  async isUpdatesAvailable()
  {
    let version = 0;
    let remote_version = {
      version: 0
    };
    let remote = await axios.get(this._package_url).then(function (response: any) {
      return response.data;
    })

    remote_version = remote.collected.metadata.version;

    if(package_json.debug)
    {
      log('remote_version-->', remote_version)
      log('package_json.version-->', package_json.version)
    }

    let is_updates_available = semver.gt(remote_version, package_json.version);

    if(is_updates_available)
    {
      log(chalk.white.bgRed.bold('New update is available'));
      log(chalk.red('---------------------------------------'));
      log('Installed Version: '+package_json.version);
      log('Available Version: '+remote_version);
      log('Install via: '+chalk.black.bgGreenBright('  npm i vaah -g  '));
      log(chalk.red('---------------------------------------'));
    }

    return is_updates_available;
  }
  //-------------------------------------------------------
  //-------------------------------------------------------


}
