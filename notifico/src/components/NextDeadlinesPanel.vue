<template>
    <v-expansion-panels
            v-model="panel"
            >
        <v-expansion-panel 
                title="Prossime 3 scadenze"
                >
            <v-expansion-panel-text>
                <v-list v-if="formattedUserDeadlinesList.length > 0">
                    <v-list-item
                            v-for="(deadline, index) in formattedUserDeadlinesList"
                            :key="index"
                            :title="formattedDate(deadline.date) + ' - ' + deadline.title"
                            >
                        <template v-slot:prepend>
                            <v-icon icon="mdi-calendar" color="yellow"></v-icon>
                        </template>
                        <template v-slot:append>
                            <v-icon icon="mdi-close" color="red" class="mr-2"></v-icon>
                            <v-icon icon="mdi-pencil-outline" color="primary"></v-icon>
                        </template>
                    </v-list-item>
                </v-list>
                <div v-else>
                    Nessuna scadenza da segnalare
                </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import { formatDate } from '@/utils/dateUtils';

import { mapState, mapStores } from 'pinia';

import { useUserDeadlineStore } from '@/stores/user-deadline-store';
import { useUserInfoStore } from '@/stores/user-info';

export default {
    data() {
        return {
            panel: [0],
        }
    },
    computed: {
        ...mapStores(useUserDeadlineStore, useUserInfoStore),
        ...mapState(useUserDeadlineStore, [
            'userDeadlinesList',
        ]),
        formattedDate() {
            return date => {
                return formatDate(date);
            }
        },
        formattedUserDeadlinesList() {
            return [ ...this.userDeadlinesList ] //necessaria copia altrimenti modifico lista originale
                    .filter(x => new Date(x.date) >= new Date())
                    .sort((a, b) => a.date < b.date ? -1 : 1) //ordino in ordine crescente di data
                    .slice(0, 3)
                    ;
        }
    },
    methods: {
    },
    mounted() {
        if (!this.userDeadlinesList.length) {
            this.userDeadlineStoreStore.loadUserDeadlines({userId: this.userInfoStoreStore.userInfo.data.id})
        }
    },
}
</script>