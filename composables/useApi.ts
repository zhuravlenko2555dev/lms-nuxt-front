import type {UseFetchOptions} from "#app"

export const useApi = async <T>(url: string | (() => string), options: UseFetchOptions<T> = {}) => {
    const { $apiFetch } = useNuxtApp()

    return useFetch(url, {
        $fetch: $apiFetch,
        watch: false,
        ...options
    })
}
