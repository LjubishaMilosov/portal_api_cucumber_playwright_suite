export default {
  requireModule: ['ts-node/register'],
  require: ['src/**/*.ts'],
  paths: ['features/**/*.feature'],
  format: ['progress', 'json:reports/cucumber-report.json', 'html:reports/cucumber-report.html'],
  formatOptions: { snippetInterface: 'async-await' },
  parallel: 1,  
};