<template>
    <v-card class="calendar-container">
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
                events: [
                    /* { title: 'Evento 1', start: '2025-02-10' },
                    { title: 'Evento 2', start: '2025-02-12' } */
                ]
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