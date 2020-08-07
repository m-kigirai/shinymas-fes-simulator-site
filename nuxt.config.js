export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "シャニマス フェス計算機(β)",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "google-site-verification",
        content: "VQv-I7dfQbkMa1izftgHkxRW_rZNYPi8n7LGsQyerMo"
      },
      {
        hid: "description",
        name: "description",
        content:
          "THE iDOLM@STER ShinyColorsのフェスモード(フェスリハーサル・グレードフェス)の各種計算（アピール値算出、思い出アピール値算出)を行えるサイトです。"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/css/style.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/localStorage.js", mode: "client" },
    { src: "~/plugins/calculator.js" },
    { src: "~/plugins/utils.js" }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-164310861-1"
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
