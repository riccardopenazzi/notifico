<template>
    <v-dialog 
            max-width="600"
            v-model="addDeadlinePopupVisible"
            overlay-opacity="0.6" 
            persistent
            transition="dialog-bottom-transition"
            >
        <v-card 
                :class="{'dark-popup': $vuetify.theme.global.current.dark}" 
                class="popup-card"
                elevation="12"
                rounded="lg"
                >
            <v-card-title class="d-flex justify-space-between align-center">
                <span>Aggiungi Scadenza</span>
                <v-btn icon @click="addDeadlinePopupVisible = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <AddDeadlineForm @deadline-correct-registration="addDeadlinePopupVisible = false"></AddDeadlineForm>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapStores, mapWritableState } from 'pinia';

import { useUserDeadlineStore } from '@/stores/user-deadline-store';

import AddDeadlineForm from './AddDeadlineForm.vue';

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapStores(useUserDeadlineStore),
        ...mapWritableState(useUserDeadlineStore, [
            'addDeadlinePopupVisible',
        ]),
    },
    methods: {
    },
    mounted() {
    },
    components: {
        AddDeadlineForm,
    },
}
</script>

<style lang="scss">
.popup-card {
    border-radius: 12px;
    padding: 20px;
    background-color: var(--v-theme-surface);
    color: var(--v-theme-on-surface);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
}

.dark-popup {
    background-color: #1d1c1c;
    color: #ffffff;
    box-shadow: 0 10px 50px rgba(255, 255, 255, 0.2);
}


</style>