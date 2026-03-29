const config = {
  requireModule: ["ts-node/register"],
  paths: ["features/**/*.feature"],
  require: ["src/**/*.ts"],
  format: [
    "html:reports/cucumber-report.html",
    "progress-bar",
    "junit:reports/junit-report.xml",
  ],
  formatOptions: { snippetInterface: "async-await" },
  parallel: 1,
};
export default config;
