const  getQuestions = function () {
  let questions = [
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

  return questions;
};


module.exports = { getQuestions };
