const assert = require('assert');
let log = require('color-console');
//let readlineSync = require('readline-sync');
let fs = require('fs');
let path = require('path');
let fsSync = require('fs-sync');
let ejs = require('ejs');
let fsExtra = require('fs-extra');
let dateFormat = require('dateformat');
const {getInstalledPathSync}  = require('get-installed-path');
let now = new Date();



/*
|--------------------------------------------------------------------------
| Install NuxtJs Setup
|--------------------------------------------------------------------------
*/
const install = (name) => {

    let template_path = globalFileSourcePath+'/skeletons/vaahnuxt/assets';

    let des = './';

    if(name)
    {
        des += name+'/';
    }

    fsExtra.copySync(template_path, des);

    console.info('success | vendor: '+name);

};

/*
|--------------------------------------------------------------------------
| Update NuxtJs Setup
|--------------------------------------------------------------------------
*/
const update = (name) => {

    console.info('success | vendor: '+name);

};

module.exports = {install, update};
