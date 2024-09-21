export default {
  moduleFileExtensions: [
    "mjs",
    // must include "js" to pass validation https://github.com/facebook/jest/issues/12116
    "js",
  ],
  testRegex: `test.mjs$`,
  collectCoverageFrom: [
    "**/**/*.{mjs,js}",
    "!<rootDir>/database/**/*",
    "!<rootDir>/node_modules/",
    "!<rootDir>/jest.config.mjs",
    "!<rootDir>/knexfile.js",
    "!<rootDir>/coverage/**",
  ],
  setupFiles: ["<rootDir>/__tests__/global-setup.mjs"],
};
