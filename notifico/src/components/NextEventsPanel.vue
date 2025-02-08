<template>
    <v-expansion-panels
            v-model="panel"
            >
        <v-expansion-panel 
                title="Prossime 3 scadenze"
                >
            <v-expansion-panel-text>
                <v-list>
                    <v-list-item
                            v-for="(event, index) in nextEventsList"
                            :key="index"
                            :title="formattedDate(event.date) + ' - ' + event.title"
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
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import { formatDate } from '@/utils/dateUtils';

export default {
    data() {
        return {
            panel: [0],
        }
    },
    computed: {
        nextEventsList() {
            return [{
                    title: 'Bollo auto Opel',
                    date: new Date(2025, 1, 5),
                },
                {
                    title: 'Tasse università',
                    date: new Date(2025, 1, 15),
                },
                {
                    title: 'Assicurazione moto',
                    date: new Date(2025, 1, 25),
                }];
        },
        formattedDate() {
            return date => {
                return formatDate(date);
            }
        }
    },
    methods: {
    },
    mounted() {
    },
}
</script>