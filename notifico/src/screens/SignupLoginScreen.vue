<template>
    <v-container fluid 
            class="d-flex" 
            style="height: 100vh; overflow: hidden; margin: 0; padding: 0;"
            >
        <div 
                class="left-section d-flex align-center justify-center" 
                style="flex: 1; background-color: #121212;"
                >
            <v-card 
                    class="mx-auto text-center py-5 px-4"
                    width="500" 
                    elevation="10" 
                    style="background-color: #1e1e1e; color: white;"
                    >
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
        </div>

        <div class="right-section d-flex justify-center">
            <div class="right-text-container text-center">
                <h1 style="color: #fff;">Benvenuto su Notifico</h1>
                <p style="color: #fff; font-size: 18px;">La tua piattaforma per notifiche personalizzate</p>
                <p style="color: #fff; font-size: 16px; margin-top: 4rem;">{{ currentSentence }}</p>
            </div>
        </div>
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
            currentSentence: '',
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
        changeSentence() {
            //grazie chagpt per le frasi
            const sentences = [
                "Non perdere mai una scadenza importante con Notifico!",
                "La tua agenda, sempre organizzata e sotto controllo.",
                "Notifico: il modo più semplice per gestire i tuoi impegni.",
                "Ricevi promemoria personalizzati e dimentica lo stress delle scadenze.",
                "Organizza, condividi e resta aggiornato con Notifico.",
                "Più produttività, meno dimenticanze: affidati a Notifico!",
                "Pianifica il tuo tempo, lascia che Notifico si occupi dei promemoria.",
                "Le tue notifiche, quando e come vuoi: Notifico è su misura per te.",
                "Gestisci le tue scadenze con semplicità e precisione.",
                "Resta sempre un passo avanti grazie ai promemoria di Notifico."
            ];

            let newSentence;
            do {
                newSentence = sentences[Math.floor(Math.random() * sentences.length)];
            } while (newSentence === this.currentSentence);
            this.currentSentence = newSentence;
        },
    },
    beforeMount() {
        document.body.classList.add('login-signup-body');
        this.showNavigationBar = false;
        this.showTopBar = false;
        this.changeSentence();
        setInterval(() => {
            this.changeSentence();
        }, 4000);
    },
    beforeUnmount() {
        document.body.classList.remove('login-signup-body');
        this.showNavigationBar = true;
        this.showTopBar = true;
    },
    components: {
        SignupForm,
        LoginForm,
    },
}
</script>

<style>
.left-section {
    z-index: 1;
}

.right-section {
    flex: 1;
    position: relative;
    background-color: #f5f5f5;
    z-index: 0;
    overflow: hidden;
    --mask:
        radial-gradient(24.22px at 34.2px 50%, #000 99%, #0000 101%) 0 calc(50% - 36px)/100% 72px,
        radial-gradient(24.22px at -16.2px 50%, #0000 99%, #000 101%) 18px 50%/100% 72px repeat-y;
    -webkit-mask: var(--mask);
            mask: var(--mask);
    background-color: #0099ff;
}

.right-text-container {
    margin: auto;
}

.login-signup-body .v-application {
    margin: 0 !important;
    padding: 0 !important;
}

.login-signup-body .v-main {
    margin: 0 !important;
    padding: 0 !important;
}
</style>