const assert = require('assert');

/**
 * @function  [test]
 * @returns {String} Status
 */
const helloWorld = (args) => {
    console.info('success | your name is = '+args.name);
};



module.exports = { helloWorld };
