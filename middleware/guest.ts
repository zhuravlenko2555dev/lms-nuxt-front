export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useAuth()
    if (user.value) return navigateTo("/admin/dashboard", { replace: true })
})
