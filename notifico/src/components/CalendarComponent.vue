<template>
    <v-card class="pa-6">
        <FullCalendar 
                :options="calendarOptions"
                ></FullCalendar>
        <v-dialog v-model="showDialog" persistent>
            <v-card :style="{ position: 'absolute', top: dialogY + 'px', left: dialogX + 'px' }">
                <v-card-title>{{ eventTitle }}</v-card-title>
                <v-card-text>
                <p>Dettagli dell'evento...</p>
                </v-card-text>
                <v-card-actions>
                <v-btn color="primary" @click="showDialog = false">Chiudi</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
    </v-card>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import itLocale from '@fullcalendar/core/locales/it'

import { mapState, mapStores } from 'pinia';

import { useUserDeadlineStore } from '@/stores/user-deadline-store';
import { useUserInfoStore } from '@/stores/user-info';

export default {
    data() {
        return {
            showDialog: false,
            dialogX: 0,
            dialogY: 0,
            eventTitle: "",
        }
    },
    computed: {
        ...mapStores(useUserDeadlineStore, useUserInfoStore),
        ...mapState(useUserDeadlineStore, [
            'userDeadlinesList',
        ]),
        formattedUserDeadlines() {
            return this.userDeadlinesList.map(x => ({
                title: x.title,
                date: x.date,
                deadlined: x.id,
            }))
            ;
        },
        calendarOptions() {
            return {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                locale: itLocale,
                displayEventTime: false,
                events: this.formattedUserDeadlines,
                dateClick: this.onDateClick,
                eventMouseEnter: this.onEventMouseEnter,
                eventMouseLeave: this.onEventMouseLeave,
            };
        },
    },
    methods: {
        onEventMouseEnter(info) {
            console.log('Hovered over info:', info);
            this.showDialog = true;
            this.eventTitle = "Evento su " + info.event._def.title;
            this.dialogX = info.jsEvent.x + 10; // Leggermente spostato a destra
            this.dialogY = info.jsEvent.y + 10; // Leggermente spostato in basso
        },
        onDateClick(day) {
            console.log('Clicked on day:', day);
        },
        onEventMouseLeave() {
            this.showDialog = false;
        },
    },
    components: {
        FullCalendar,
    }
}
</script>

<style>

</style>