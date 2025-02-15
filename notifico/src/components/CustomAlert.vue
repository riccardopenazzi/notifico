<template>
    <v-snackbar
            v-model="isAlertVisible"
            :color="alert.color"
            :timeout="alert.timeout"
            :multi-line="true"
            :title="alert.title"
            vertical
            :location="alert.location"
            >
        <v-row
                align="center"
                justify="start"
                no-gutters
                class="px-1"
                >
            <v-icon class="pr-3" dark size="30px">{{ alert.icon }}</v-icon>
            <v-col>
                <div v-if="alert.title" class="mb-2">{{ alert.title }}</div>
                <p>{{ alert.message }}</p>
            </v-col>
        </v-row>
    </v-snackbar>
</template>

<script>
import { mapStores, mapWritableState } from 'pinia';

import { useAlertStore } from '../stores/alert-store';

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapStores(useAlertStore),
        ...mapWritableState(useAlertStore, ['alert', 'isAlertVisible']),
    },
    methods: {
    },
    mounted() {
    },
    components: {
    },
}
</script>

<style lang="scss">

</style>