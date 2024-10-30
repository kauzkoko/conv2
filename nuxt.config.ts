// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      script: [
        {
          src: "/p5.min.js",
        },
        // {
        //   src: "/p5.sound.min.js",
        // },
      ],
    },
  },
})
