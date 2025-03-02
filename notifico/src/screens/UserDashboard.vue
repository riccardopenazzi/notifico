<template>
	<v-container fluid>
		<v-row>
			<h1 class="ml-3 mt-2">{{`Dashboard di ${userInfo.data.name}`}}</h1>
		</v-row>
		<v-row>
			<v-col cols="6">
				<CalendarComponent></CalendarComponent>
			</v-col>
			<v-col cols="1"></v-col>
			<v-col cols="4">
				<AddDeadlineFormPanel></AddDeadlineFormPanel>
				<NextDeadlinesPanel class="mt-5"></NextDeadlinesPanel>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState, mapStores } from 'pinia';

import { useUserInfoStore } from '../stores/user-info';

import CalendarComponent from '../components/CalendarComponent.vue';
import NextDeadlinesPanel from '../components/NextDeadlinesPanel.vue';
import AddDeadlineFormPanel from '../components/AddDeadlineFormPanel.vue';

export default {
	data() {
		return {

		}
	},
	computed: {
		...mapStores(
			useUserInfoStore,
		),
		...mapState(useUserInfoStore, [
				'userInfo',
			],
		),
	},
	mounted() {
	},
	components: {
		CalendarComponent,
		NextDeadlinesPanel,
		AddDeadlineFormPanel,
	}
}
</script>