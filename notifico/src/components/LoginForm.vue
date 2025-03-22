<template>
    <v-card
            class="pa-3 mx-auto"
            style="background-color: #1e1e1e;"
            elevation="0"
            :max-width="formWidth"
            >
        <v-form
                @submit.prevent="execLogin">
            <v-text-field
                    v-model="form.data.email"
                    label="Email"
                    required
                    type="email"
                    variant="solo-filled"
                    :rules="emailRules"
                    class="mb-3 rounded-xl"
                    >
            </v-text-field>
            <v-text-field
                    v-model="form.data.password"
                    label="Password"
                    required
                    type="password"
                    variant="solo-filled"
                    :rules="passwordRules"
                    class="mb-3"
                    >
            </v-text-field>
            <v-btn
                    color="primary"
                    type="submit"
                    width="100%"
                    class="rounded-xl"
                    >
                Accedi
            </v-btn>
        </v-form>
        <v-row class="mt-5 d-flex justify-center">
            <div>Non hai un account?</div>
            <div 
                    class="cursor-pointer text-primary text-decoration-underline"
                    @click="onSignupClick"
                    >
                Registrati
            </div>
        </v-row>
    </v-card>
</template>

<script>
import { mapStores, mapWritableState } from 'pinia';
import { useLoginStore } from '../stores/login-store';
import { useAlertStore } from '../stores/alert-store';

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapStores(
            useLoginStore,
            useAlertStore,
        ),
        ...mapWritableState(useLoginStore, [
                'form',
            ],
        ),
        emailRules() {
            return [
                v => !!v || 'L\'email è obbligatoria',
                v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || 'Inserisci un\'email valida',
            ];
        },
        passwordRules() {
            return [
                v => !!v || 'La password è obbligatoria',
            ];
        },
        isFormValid() {
            return true 
                    && this.form.data.email 
                    && this.form.data.password
                    ;
        },
        formWidth() {
            return this.$vuetify.display.smAndDown ? '100%' : '400';
        },
    },
    methods: {
        execLogin() {
            if (!this.isFormValid) {
                let alertStore = useAlertStore();
                alertStore.showAlert({
                    title: 'Dati non validi',
                    message: 'Inserisci tutti i dati richiesti',
                    color: 'error',
                });
                return;
            }
            var loginStore = useLoginStore();
            let vars = {
                content: this.form.data,
            };
            loginStore.executeLogin(vars)
                    .then(vars => {
                        if (vars.success) {
                            this.$router.push({name: 'Dashboard'});
                        } else {
                            console.log('Login failed');
                            console.log(vars);
                            let alertStore = useAlertStore();
                            alertStore.showAlert({
                                title: 'Errore nel login',
                                message: vars.serverMessage,
                                color: 'error',
                            });
                        }
                    })
                    ;
        },
        onSignupClick() {
            this.$emit('signupClick');
        },
    },
    mounted() {
    },
    components: {
    },
    emits: ['signupCick'],
}
</script>