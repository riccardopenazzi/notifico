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
import ApiService from '@/utils/apiService';

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapStores(
            useLoginStore,
        ),
        ...mapWritableState(useLoginStore, [
                'form',
            ],
        ),
    },
    methods: {
        execLogin() {
            /* console.log('execLogin');
            this.$router.push('/dashboard'); */
            ApiService.get('/users')
                    .then(vars => {
                        console.log(vars);
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