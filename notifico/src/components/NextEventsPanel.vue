<template>
    <v-sheet class="mt-5">
        <v-list>
            <v-list-item
                    v-for="(event, index) in nextEvenetsList"
                    :key="index"
                    :title="formatDate(event.date) + ' - ' + event.title"
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
    </v-sheet>
</template>

<script>
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

export default {
    data() {
        return {

        }
    },
    computed: {
        nextEvenetsList() {
            return [{
                title: 'Bollo auto Opel',
                date: new Date(),
            },{
                title: 'Tasse università',
                date: new Date(),
            },{
                title: 'Assicurazione moto',
                date: new Date(),
            }]
        }
    },
    methods: {
        formatDate(date) {
            return format(date, "dd/MM/yyyy", { locale: it });
        }
    },
}
</script>