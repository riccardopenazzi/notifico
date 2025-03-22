<template>
    <v-card class="pa-6">
        <FullCalendar 
                :options="calendarOptions"
                ></FullCalendar>
        <v-menu v-model="showDialog" absolute offset-y :activator="menuActivator">
            <v-card width="300px">
                <v-card-title>{{ hoverEvent.title }}</v-card-title>
                <v-card-text v-if="hoverEvent.extendedProps.description">
                    <v-col>
                        <p>{{ hoverEvent.extendedProps.description }}</p>
                    </v-col>
                </v-card-text>
            </v-card>
        </v-menu>
    </v-card>
</template>

<script>
import { ref } from 'vue';

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
            hoverEvent: '',
            menuActivator: ref(null),
        }
    },
    computed: {
        ...mapStores(useUserDeadlineStore, useUserInfoStore),
        ...mapState(useUserDeadlineStore, [
            'userDeadlinesList',
        ]),
        formattedUserDeadlines() {
            console.log(this.userDeadlinesList)
            return this.userDeadlinesList.map(x => ({
                title: x.title,
                date: x.date,
                deadlined: x.id,
                description: x.description,
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
                titleFormat: {
                    month: 'long',
                    year: 'numeric',
                },
                customButtons: {
                    //Trovato su stackoverflow, se mi servirà per aggiungere pulsanti poi
                },
                datesSet: (info) => {
                    const titleElement = document.querySelector('.fc-toolbar-title');
                    if (titleElement) {
                        const originalTitle = info.view.title;
                        if (titleElement.textContent !== originalTitle.charAt(0).toUpperCase() + originalTitle.slice(1)) {
                            titleElement.textContent = originalTitle.charAt(0).toUpperCase() + originalTitle.slice(1);
                        }
                    }
                },
            };
        },
    },
    methods: {
        onEventMouseEnter(info) {
            if (!this.showDialog) {
                this.menuActivator = info.el;
                this.hoverEvent = info.event;
                this.$nextTick(() => {
                    this.showDialog = true;
                });
            }
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