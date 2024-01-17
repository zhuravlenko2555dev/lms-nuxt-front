<script lang="ts" setup>
import {useSubmit} from "~/composables/useSubmit"

definePageMeta({
    layout: false,
    middleware: 'guest'
})

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

const form = reactive({
    email: '',
    password: '',
    remember: false
})

const { submit, inProgress, validationErrors } = useSubmit(
    () => {
        return login(form)
    },
    {
        onSuccess: () => router.push("/admin/dashboard")
    }
)
</script>

<template>
    <div class="page page-center">
        <div class="container container-tight py-4">
<!--            TODO: create logo SVG-->
<!--            <div class="text-center mb-4">-->
<!--                <NuxtLink to="/" class="navbar-brand navbar-brand-autodark">-->
<!--                    LMS-->
<!--                </NuxtLink>-->
<!--            </div>-->
            <div class="card card-md">
                <div class="card-body">
                    <h2 class="h2 text-center mb-4">Login to your account</h2>
                    <form @submit.prevent="submit" autocomplete="off" novalidate>
                        <div class="mb-3">
                            <label class="form-label" for="email">Email address</label>
                            <input
                                id="email"
                                class="form-control"
                                :class="{'is-invalid': validationErrors?.email?.length}"
                                placeholder="example@email.com"
                                type="email"
                                v-model="form.email"
                                autocomplete="off"
                                required
                                autofocus
                            >
                            <div v-if="validationErrors?.email?.length" class="invalid-feedback">
                                {{ validationErrors?.email[0] }}
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="form-label" for="password">Password</label>
                            <input
                                id="password"
                                class="form-control"
                                :class="{'is-invalid': validationErrors?.password?.length}"
                                placeholder="Your password"
                                type="password"
                                v-model="form.password"
                                required
                                autoComplete="current-password"
                            >
                            <div v-if="validationErrors?.password?.length" class="invalid-feedback">
                                {{ validationErrors?.password[0] }}
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="form.remember">
                                <span class="form-check-label">Remember me on this device</span>
                            </label>
                        </div>
                        <div class="form-footer">
                            <button
                                class="btn btn-primary w-100"
                                type="submit"
                                :disabled="inProgress"
                                :class="{'btn-loading': inProgress}"
                            >Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
