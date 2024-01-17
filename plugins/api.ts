import {$fetch, type FetchContext, type FetchOptions} from "ofetch"

const CSRF_COOKIE = 'XSRF-TOKEN'
const CSRF_HEADER = 'X-XSRF-TOKEN'
const ACCEPT_HEADER = 'Accept'

export default defineNuxtPlugin(async (nuxtApp) => {
    const { internalApiURL } = useRuntimeConfig()

    let options: FetchOptions = {}
    let headers: any = {}

    headers = {
        [ACCEPT_HEADER]: 'application/json'
    }

    if (process.server) {
        options.baseURL = internalApiURL
    }

    options.headers = headers

    const apiFetch = $fetch.create({
        async onRequest(context: FetchContext): Promise<void> {
            let headers: any = {}

            if (process.client) {
                let token = useCookie(CSRF_COOKIE).value as string
                if (
                    !token
                    && ["post", "put", "patch", "delete"].includes(
                        context.options?.method?.toLowerCase() ?? ""
                    )
                ) {
                    token = await csrf()
                }

                if (token) {
                    headers[CSRF_HEADER] = token
                }

                context.options.headers = {
                    ...context.options.headers,
                    ...headers
                }
            }
        },
        ...options
    })

    return {
        provide: {
            apiFetch
        }
    }
})

async function csrf(): Promise<string> {
    await $fetch("/sanctum/csrf-cookie")

    return useCookie(CSRF_COOKIE).value as string
}
