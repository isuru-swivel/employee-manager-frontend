const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "https://sonarqube.swiveltech.lk/",
    options: {
      "sonar.sources": ".",
      "sonar.javascript.lcov.reportPaths": "test/coverage/lcov.info",
      "sonar.inclusions": "src/**", // Entry point of your code
    },
  },
  () => {}
);
