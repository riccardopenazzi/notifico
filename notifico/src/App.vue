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
import { useUserInfoStore } from './stores/user-info';

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
			useUserInfoStore,
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

	mounted() {
		useUserInfoStore().checkUserSession()
				.then(vars => {
					if (vars?.success) {
						this.$router.push({ name: 'Dashboard' });
					} else {
						this.$router.push({ name: 'SignupLogin' });
					}
				})
				;
	},
}
</script>
