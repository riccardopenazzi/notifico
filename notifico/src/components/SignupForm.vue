<template class="signup-form--wrapper">
    <v-card
            class="pa-3 mx-auto signup-form--card"
            style="background-color: #1e1e1e;"
            elevation="0"
            max-width="400"
            >
        <v-form
                @submit.prevent="execSignup">
            <v-text-field
                    v-model="form.data.name"
                    label="Nome"
                    required
                    variant="solo-filled"
                    :rules="nameRules"
                    class="mb-3 rounded-xl"
                    >
            </v-text-field>
            <v-text-field
                    v-model="form.data.surname"
                    label="Cognome"
                    required
                    variant="solo-filled"
                    :rules="surnameRules"
                    class="mb-3 rounded-xl"
                    >
            </v-text-field>
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
                    class="mb-3 rounded-xl"
                    >
            </v-text-field>
            <v-text-field
                    v-model="form.data.confirmPassword"
                    label="Conferma password"
                    required
                    type="password"
                    variant="solo-filled"
                    :rules="checkPasswordRules"
                    class="mb-3 rounded-xl"
                    >
            </v-text-field>
            <v-radio-group
                    label="Avatar"
                    v-model="form.data.avatar"
                    class="d-flex"
                    :rules="avatarRules"
                    >
                <v-row 
                        class="d-flex justify-space-between align-center mt-2"
                        >
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
                    color="primary"
                    type="submit"
                    width="100%"
                    class="rounded-xl mt-8"
                    >
                Registrati
            </v-btn>
        </v-form>
        <v-row class="mt-5 d-flex justify-center">
            <div>Hai già un account?</div>
            <div 
                    class="cursor-pointer text-primary text-decoration-underline"
                    @click="onLoginClick"
                    >
                Accedi
            </div>
        </v-row>
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
        nameRules() {
            return [
                v => !!v || 'Il nome è obbligatorio',
            ];
        },
        surnameRules() {
            return [
                v => !!v || 'Il cognome è obbligatorio',
            ];
        },
        emailRules() {
            return [
                v => !!v || 'L\'email è obbligatoria',
                v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || 'Inserisci un\'email valida',
            ];
        },
        passwordRules() {
            return [
                v => !!v || 'La password è obbligatoria',
                v => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v) || 'La password deve avere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale',
            ];
        },
        checkPasswordRules() {
            return [
                v => v === this.form.data.password || 'Le password non corrispondono',
            ];
        },
        avatarRules() {
            return [
                v => !!v || 'Seleziona un avatar',
            ];
        },
        isFormValid() {
            return true 
                    && this.form.data.name 
                    && this.form.data.surname 
                    && this.form.data.email 
                    && this.form.data.password 
                    && this.form.data.confirmPassword 
                    && this.form.data.avatar
                    && this.form.data.password === this.form.data.confirmPassword
                    ;
        },
    },
    methods: {
        execSignup() {
            if (!this.isFormValid) {
                this.alertStoreStore.showAlert({
                    title: 'Dati non validi',
                    message: 'Inserisci tutti i dati richiesti',
                    color: 'error',
                });
                return;
            }
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
        onLoginClick() {
            this.$emit('loginClick');
        },
    },
    mounted() {
    },
    components: {
    },
    emits: ['loginCick'],
}
</script>

<style>
/* Nasconde il cerchio di selezione dei radio */
.signup-form--card .v-selection-control__input {
    display: none;
}

/* Stile per gli avatar */
.avatar-radio {
    flex: 1; /* Ogni avatar occupa lo stesso spazio */
    display: flex;
    justify-content: center; /* Centra l'immagine all'interno del contenitore */
    align-items: center;
    cursor: pointer;
}

/* Stile per l'avatar selezionato */
.selected-avatar {
    border: 3px solid green;
    border-radius: 50%;
    padding: 1px;
}

/* Aggiunge margine tra gli avatar */
.v-row {
    gap: 10px; /* Spaziatura uniforme tra gli avatar */
}
</style>