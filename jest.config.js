// const nextJest = require("next/jest");
// const createJestConfig = nextJest({
//   dir: "./",
// });
// const customJestConfig = {
//   moduleDirectories: ["node_modules", "<rootDir>/"],
//   testEnvironment: "jest-environment-jsdom",
// };
// module.exports = createJestConfig(customJestConfig);
const nextJest = require("next/jest");

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
};

const createJestConfig = nextJest({
  dir: "./",
})(customJestConfig);

module.exports = async () => {
  // Create Next.js jest configuration presets
  const jestConfig = await createJestConfig();

  // Custom `moduleNameMapper` configuration
  const moduleNameMapper = {
    ...jestConfig.moduleNameMapper,
    "^@/(.*)$": "<rootDir>/src/$1",
  };

  return { ...jestConfig, moduleNameMapper };
};
