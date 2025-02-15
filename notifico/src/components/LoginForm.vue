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