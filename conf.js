/**
 * Config file of the project "Site Filtering". 
 */
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
exports.config = {
  baseUrl: 'https://www.upwork.com/',
  params: {
    search: {
      freelancers: 'Freelancers',
      expectedLocation: 'Russia',
      speciality: 'Web developers',
    }
  },
  capabilities: {
    browserName: 'firefox',
    chromeOptions: {
      'args': ['disable-infobars=true', '--window-size=800,600'],
    }
  },
  seleniumServerJar: './node_modules/selenium/selenium-server-standalone-3.4.0.jar',
  specs: ['./specs/webdev_find_todo-spec.js'],
  frameworks: ['jasmine'],
  onPrepare: function() {
    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: './target'
      })
    );
  }
};