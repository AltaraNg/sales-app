module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true,
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:vue/essential",
    "eslint:recommended",
  ],
  plugins: ["prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
