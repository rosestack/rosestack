module.exports = {
  extends: [
    "@meslzy/eslint-config",
    "@meslzy/eslint-config/typescript",
    "@meslzy/eslint-config/react",
    "@meslzy/eslint-config/next"
  ],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};