import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  router: {
    base: '/WeatherApp'
  },
  publicRuntimeConfig: {
    WEATHER_APP_SECRET: process.env.WEATHER_APP_SECRET,
  },
  css: ["~/assets/css/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});
