
const chalk = require('chalk');
let fs = require('fs');
let path = require('path');
let ejs = require('ejs');
let fsSync = require('fs-sync');

const log = console.log;

export default class Generator {
  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};
  skeleton_dir: string;
  target_dir: string;


  constructor(args: object, flags: object, inputs: object, skeleton_dir:string, target_dir:string) {
    this.args = args;
    this.flags = flags;
    this.inputs = inputs;
    this.skeleton_dir = skeleton_dir;
    this.target_dir = target_dir;

    this.setLowerAndUpperCaseValues();
  }

  //-------------------------------------------------------

  setLowerAndUpperCaseValues()
  {

    if(Object.keys(this.args).length)
    {
      for (let key in this.args) {
        if (typeof this.inputs[key] === 'string'){
          this.args[key+'_lower'] = this.args[key].toLowerCase();
          this.args[key+'_upper'] = this.args[key].toUpperCase();
        }

      }
    }

    if(Object.keys(this.flags).length)
    {
      for (let key in this.flags) {
        if (typeof this.inputs[key] === 'string'){
          this.flags[key+'_lower'] = this.flags[key].toLowerCase();
          this.flags[key+'_upper'] = this.flags[key].toUpperCase();
        }

      }
    }

    if(Object.keys(this.inputs).length)
    {
      for (let key in this.inputs) {

        if (typeof this.inputs[key] === 'string'){
          this.inputs[key+'_lower'] = this.inputs[key].toLowerCase();
          this.inputs[key+'_upper'] = this.inputs[key].toUpperCase();
        }

      }
    }

  }

  //-------------------------------------------------------
  scanRecursiveFiles(dir: string, files:  any[] = []  )
  {

    fs.readdirSync(dir).forEach((file: any) => {

      //let fullPath = path.join(dir, file);
      let fullPath = path.join(dir, file);

      let short_path = fullPath.split("src");

      let file_path;

      if(short_path[1])
      {
        file_path = short_path[1];
      }


      if (fs.lstatSync(fullPath).isDirectory()) {
        this.scanRecursiveFiles(fullPath, files);
      } else {
        files.push(file_path);
      }
    });

    return files;

  }
  //-------------------------------------------------------
  getFilesFromSkeletonDirector() {

    let template_path = __dirname+'/../'+this.skeleton_dir;
    let files_list: any[] = [];
    files_list = this.scanRecursiveFiles(template_path, files_list);
    return files_list;

  };
  //-------------------------------------------------------

  files()
  {

/*
    log(chalk.red(`===ARG===`));
    log(this.args);


    log(chalk.green(`===FLAGS===`));
    log(this.flags);


    log(chalk.blue(`===RESPONSE===`));
    log(this.inputs);
*/


    let get_files = this.getFilesFromSkeletonDirector();


    let self = this;

    get_files.forEach(function(file) {
      self.copyFilesToDestination(file);
    });

  }


  //-------------------------------------------------------
  getFileDestination(file_path:string)
  {
    //let file_name = path.basename(file_path);

    let destination: string = '';

    destination = file_path.replace(this.skeleton_dir, "");

    destination = this.target_dir+'/'+destination;

    return destination;
  }
  //-------------------------------------------------------
  copyFilesToDestination(file_path:string)
  {

    let file_name = path.basename(file_path);

    let destination = this.getFileDestination(file_path);

    let file_readable_path = __dirname+"./../"+file_path;

    let file_content = fs.readFileSync(file_readable_path).toString();
    let parsed_file_content = ejs.render(file_content, this.inputs);

    destination = destination.replace('.ejs', "");

    fsSync.write(destination, parsed_file_content);

    log(chalk.green(destination));

  }
  //-------------------------------------------------------
  //-------------------------------------------------------
  //-------------------------------------------------------


}
