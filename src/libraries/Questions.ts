const chalk = require('chalk');
const log = console.log;

export class Questions {
  questions: { [k: string]: any } = {};

  //-------------------------------------------------------
  getVaahCmsVersions() {
    return {
      message: 'Select the VaahCMS version:',

      choices: [{
        name: 'VaahCMS 2.x',
        value: 'vaahcms-2x',
        description: 'Built with Laravel 10 framework, Vue 3, Pinia and PrimeVue',
      },
      {
        name: 'VaahCMS 1.x',
        value: 'vaahcms-1x',
        description: 'Built with Laravel 9 framework, Vue 2, Vuex, Buefy and Bulma',
      }],
    }
  }
}
