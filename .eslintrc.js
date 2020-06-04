module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended"],
  // add your custom rules here
  rules: {
    semi: ["error", "always"], // セミコロンは常時
    quotes: ["error", "double"], // ダブルクォート強制
    "arrow-parens": 0, // 無名関数の書き方
    "space-before-function-paren": 0, // 関数の括弧の前のスペースの有無を気にしない
    "no-console": "off", //console.log();OK
    "no-unused-vars": "off", //使っていない変数あってもOK
    "object-shorthand": "off", // shorthand は強制しない
    "vue/html-indent": ["error", 2], // vueのインデントは2.
    "vue/html-self-closing": "off", //imgタグのようにタグが１つで完結してもOK
    "vue/singleline-html-element-content-newline": "off",
    "vue/max-attributes-per-line": "off"
  }
};
