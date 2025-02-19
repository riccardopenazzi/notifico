<template>
    <v-card class="pa-6">
        <!-- <v-calendar
                :weekdays="[0, 1, 2, 3, 4, 5, 6]"
                view-mode="month"
                class="calendar-component"
                >
        </v-calendar> -->
        <FullCalendar :options="calendarOptions"></FullCalendar>
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
            };
        },
    },
    components: {
        FullCalendar,
    }
}
</script>

<style>

</style>