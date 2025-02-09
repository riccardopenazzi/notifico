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
import { mapStores, mapWritableState } from 'pinia';
import { useSignupStore } from '../stores/signup-store.js';
import hackerImg from '../assets/hacker.png';
import gamerImg from '../assets/gamer.png';
import manImg from '../assets/man.png';
import womanImg from '../assets/woman.png';

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapStores(
            useSignupStore,
        ),
        ...mapWritableState(useSignupStore, [
            'form',
        ]),
        avatarsList() {
            return [{
                label: 'hacker',
                value: 'hacker',
                src: hackerImg,
            },{
                label: 'gamer',
                value: 'gamer',
                src: gamerImg,
            },{
                label: 'man',
                value: 'man',
                src: manImg,
            },{
                label: 'woman',
                value: 'woman',
                src: womanImg,
            }]
        }
    },
    methods: {
        execSignup() {
            console.log('Eseguo signup');
            console.log(this.form.data);
            this.$router.push('/dashboard');
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