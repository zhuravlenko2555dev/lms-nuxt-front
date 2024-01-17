// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    app: {
        head: {
            title: 'LMS',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
            meta: [
                { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' }
            ]
        },
    },
    css: ['~/assets/scss/main.scss'],
    plugins: [
        {
            src: '~/plugins/tabler.ts',
            mode: 'client'
        },
    ],
    imports: {
        dirs: [
            'types/*.ts',
            'types/**/*.ts'
        ]
    },
    runtimeConfig: {
        public: {},
        internalApiURL: '',
    },
    router: {
        options: {
            strict: true
        }
    },
    routeRules: {
        '/admin': { redirect: '/admin/dashboard' },
        '/login': { ssr: false },
        '/admin/**': { ssr: false }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    quietDeps: true
                }
            }
        }
    }
})
