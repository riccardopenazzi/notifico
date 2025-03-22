<template>
    <v-container fluid class="d-flex align-center justify-center" style="height: 100vh; background-color: #121212;">
        <v-card class="mx-auto text-center py-5 px-4" width="500" elevation="10" style="background-color: #1e1e1e; color: white;">
            <v-card-title class="text-h6 font-weight-bold">{{ cardTitle }}</v-card-title>
            <v-card-text>
                <LoginForm
                        v-show="currentScreen == 'login'"
                        @signup-click="currentScreen = 'signup'"
                        ></LoginForm>
                <SignupForm 
                        @login-click="currentScreen = 'login'"
                        v-show="currentScreen == 'signup'"
                        ></SignupForm>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapStores, mapWritableState } from 'pinia';

import { useUiStore } from '../stores/ui-store';

import SignupForm from '../components/SignupForm.vue';
import LoginForm from '../components/LoginForm.vue';

export default {
    data() {
        return {
            currentScreen: 'login',
        }
    },
    computed: {
        ...mapStores(
            useUiStore,
        ),
        ...mapWritableState(useUiStore, [
            'showNavigationBar',
            'showTopBar',
        ]),
        cardTitle() {
            return this.currentScreen == 'login' ? 'Accedi' : 'Registrati';
        },
    },
    methods: {
    },
    beforeMount() {
        this.showNavigationBar = false;
        this.showTopBar = false;
    },
    beforeUnmount() {
        this.showNavigationBar = true;
        this.showTopBar = true;
    },
    components: {
        SignupForm,
        LoginForm,
    },
}
</script>