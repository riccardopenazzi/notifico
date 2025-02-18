<template class="signup-form--wrapper">
    <v-card
            class="pa-3 bg-primary"
            >
        <v-form>
            <v-text-field
                    v-model="form.data.name"
                    label="Nome"
                    required
                    variant="outlined"
                    >
            </v-text-field>
            <v-text-field
                    v-model="form.data.surname"
                    label="Cognome"
                    required
                    variant="outlined"
                    >
            </v-text-field>
            <v-text-field
                    v-model="form.data.email"
                    label="Email"
                    required
                    type="email"
                    variant="outlined"
                    >
            </v-text-field>
            <v-text-field
                    v-model="form.data.password"
                    label="Password"
                    required
                    type="password"
                    variant="outlined"
                    >
            </v-text-field>
            <v-text-field
                    v-model="form.data.confirmPassword"
                    label="Conferma password"
                    required
                    type="password"
                    variant="outlined"
                    >
            </v-text-field>
            <v-radio-group
                    label="Avatar"
                    v-model="form.data.avatar"
                    class="d-flex justify-center"
                    >
                <v-row class="d-flex justify-center mt-2">
                    <v-radio
                            v-for="(avatar, index) in avatarsList"
                            :key="index"
                            :value="avatar.value"
                            class="avatar-radio mx-2"
                            >
                        <v-img
                                :src="avatar.src"
                                width="50"
                                height="50"
                                :class="form.data.avatar == avatar.value ? 'selected-avatar' : ''"
                                @click="form.data.avatar = avatar.value"
                                >
                        </v-img>
                    </v-radio>
                </v-row>
            </v-radio-group>
            <v-btn
                    color="success"
                    prepend-icon="mdi-check"
                    @click="execSignup"
                    >
                Registrati
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
import { mapStores, mapWritableState, mapState } from 'pinia';
import { useSignupStore } from '../stores/signup-store.js';
import { useAlertStore } from '../stores/alert-store.js';
import { useAssetsStore } from '@/stores/assets-store.js';

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapStores(
            useSignupStore,
            useAlertStore,
            useAssetsStore,
        ),
        ...mapWritableState(useSignupStore, [
            'form',
        ]),
        ...mapState(useAssetsStore, [
            'avatarsList',
        ]),
    },
    methods: {
        execSignup() {
            let signupStore = useSignupStore();
            let vars = {
                content: this.form.data,
            };
            signupStore.executeSignup(vars)
                    .then(vars => {
                        let alertStore = useAlertStore();
                        if (vars.success) {
                            alertStore.showAlert({
                                message: 'Registrazione avvenuta con successo',
                                color: 'success',
                            });
                            this.$router.push({ name: 'Dashboard' });
                        } else {
                            console.error('Signup error');
                            console.error(vars);
                            alertStore.showAlert({
                                title: 'Errore nella registrazione',
                                message: vars.serverMessage,
                                color: 'error',
                            });
                        }
                    })
                    ;
        },
    },
    mounted() {
    },
    components: {
    },
}
</script>

<style lang="scss">
    .signup-form--wrapper {
        
    }
    .v-selection-control__input {
        display: none;
    }
    .avatar-radio {
        cursor: pointer;
    }
     .selected-avatar {
        border: 3px solid green;
        border-radius: 50%;
        padding: 1px;
    }
</style>