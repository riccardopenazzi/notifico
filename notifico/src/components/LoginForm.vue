<template>
    <v-card
            class="pa-3 bg-primary"
            >
        <v-form
                @submit="execLogin">
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
            <v-btn
                    color="success"
                    prepend-icon="mdi-check"
                    @click="execLogin"
                    >
                Accedi
            </v-btn>
        </v-form>
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
    },
    mounted() {
    },
    components: {
    },
}
</script>