<template>
    <v-container fluid>
        <v-row class="mt-5">
            <v-col cols="8">
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="8">
                        <v-tabs
                                v-model="currentTab"
                                >
                            <v-tab
                                    value="login"
                                    >
                                Ho già un account
                            </v-tab>
                            <v-tab
                                    value="signup"
                                    >
                                Nuovo utente
                            </v-tab>
                        </v-tabs>
                        <v-tabs-window
                                v-model="currentTab">
                            <v-tabs-window-item
                                    value="login"
                                    >
                                <LoginForm></LoginForm>
                            </v-tabs-window-item>
                            <v-tabs-window-item
                                    value="signup"
                                    >
                                <SignupForm></SignupForm>
                            </v-tabs-window-item>
                        </v-tabs-window>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="4"></v-col>
        </v-row>
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
            currentTab: 'login',
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