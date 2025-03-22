<template>
	<v-container fluid>
		<v-row>
			<h1 class="ml-3 mt-2">{{`Dashboard di ${userInfo.data.name}`}}</h1>
		</v-row>
		<v-row>
			<v-col cols="6" class="d-none d-md-block">
				<CalendarComponent></CalendarComponent>
			</v-col>
			<v-col cols="1" class="d-none d-md-block"></v-col>
			<v-col cols="12" md="4">
				<AddDeadlineFormPanel class="mb-5"></AddDeadlineFormPanel>
				<NextDeadlinesPanel></NextDeadlinesPanel>
			</v-col>
		</v-row>
	</v-container>
	<AddDeadlineFormPopup></AddDeadlineFormPopup>
</template>

<script>
import { mapState, mapStores } from 'pinia';

import { useUserInfoStore } from '../stores/user-info';

import CalendarComponent from '../components/CalendarComponent.vue';
import NextDeadlinesPanel from '../components/NextDeadlinesPanel.vue';
import AddDeadlineFormPanel from '../components/AddDeadlineFormPanel.vue';
import AddDeadlineFormPopup from '@/components/AddDeadlineFormPopup.vue';

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
		AddDeadlineFormPopup,
	}
}
</script>