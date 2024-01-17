export default defineNuxtPlugin(async (nuxtApp) => {
    const { user, fetchAuthUser } = useAuth()

    if (user.value !== undefined) return
    user.value = await fetchAuthUser()
})
