// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/scss/main.scss'],
    plugins: [
      {
          src: '~/plugins/tabler.ts',
          mode: 'client'
      }
    ],
    imports: {
        dirs: [
            'types/*.ts',
            'types/**/*.ts'
        ]
    }
})
