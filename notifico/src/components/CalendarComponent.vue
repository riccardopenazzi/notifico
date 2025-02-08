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

export default {
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                locale: itLocale,
                displayEventTime: false,
                events:[{
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
                }],
            }
        }
    },
    components: {
        FullCalendar,
    }
}
</script>

<style>

</style>