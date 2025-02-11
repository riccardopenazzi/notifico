<template>
	<v-container fluid>
		<v-row>
			<h1 class="ml-3 mt-2">Dashboard di Riccardo</h1>
		</v-row>
		<v-row>
			<v-col cols="6">
				<CalendarComponent></CalendarComponent>
			</v-col>
			<v-col cols="1"></v-col>
			<v-col cols="4">
				<AddEventPanel></AddEventPanel>
				<NextEventsPanel class="mt-5"></NextEventsPanel>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import CalendarComponent from '../components/CalendarComponent.vue';
import NextEventsPanel from '../components/NextEventsPanel.vue';
import AddEventPanel from '../components/AddEventPanel.vue';

export default {
	data() {
		return {

		}
	},
	mounted() {
	},
	components: {
		CalendarComponent,
		NextEventsPanel,
		AddEventPanel,
	}
}
</script>