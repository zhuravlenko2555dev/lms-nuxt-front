export type User = {
    id: number,
    first_name: string,
    last_name: string,
    middle_name?: string | null,
    email: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string,

    // TODO: specify types
    roles: any[],
    abilities: any[]
}

export const useAuth = () => {
    const { $apiFetch } = useNuxtApp()
    const router = useRouter()

    const user = useState<User | undefined | null>("auth.user", () => undefined)
    const isLoggedIn = computed(() => !!user.value)

    async function login(credentials: any) {
        if (isLoggedIn.value) return

        await $apiFetch("/api/auth/login", {
            method: "post",
            body: credentials
        })

        try {
            user.value = await fetchAuthUser()
        } catch {
            user.value = null
        }
    }

    async function logout() {
        if (!isLoggedIn.value) return

        await $apiFetch("/api/auth/logout", {
            method: "post"
        })
        user.value = null

        await router.push("/login")
    }

    async function fetchAuthUser() {
        try {
            return await $apiFetch<User>("/api/auth/me")
        } catch (error: any) {
            if ([401, 419].includes(error?.response?.status)) return null
            throw error
        }
    }

    return {
        user,
        isLoggedIn,
        login,
        logout,
        fetchAuthUser
    }
}
