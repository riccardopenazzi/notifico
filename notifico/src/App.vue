<template>
	<v-app>
		<CustomAlert></CustomAlert>
		<AppBar v-show="isTopBarVisible"></AppBar>
		<NavigationBar v-show="isNavigationBarVisible"></NavigationBar>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import { mapStores, mapWritableState } from 'pinia';

import { useUiStore } from './stores/ui-store';

import NavigationBar from './components/NavigationBar.vue';
import AppBar from './components/AppBar.vue';
import CustomAlert from './components/CustomAlert.vue';

export default {
	name: 'App',
	
	components: {
		NavigationBar,
		AppBar,
		CustomAlert,
	},
	
	data: () => ({
		//
	}),

	computed: {
		...mapStores(
			useUiStore,
		),
		...mapWritableState(useUiStore, [
			'showNavigationBar',
			'showTopBar',
		]),
		isTopBarVisible() {
			return this.showTopBar;
		},
		isNavigationBarVisible() {
			return this.showNavigationBar;
		},
	},
}
</script>
