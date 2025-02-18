<template>
	<v-app>
		<CustomAlert></CustomAlert>
		<AppBar v-show="!isLoading && isTopBarVisible"></AppBar>
		<NavigationBar v-show="!isLoading && isNavigationBarVisible"></NavigationBar>
		<v-main>
			<v-container v-if="isLoading" class="d-flex justify-center align-center" style="height: 100vh;">
				<v-progress-circular indeterminate color="primary"></v-progress-circular>
			</v-container>
			<router-view v-if="!isLoading"></router-view>
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
		isLoading: true,
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
				.finally(() => {
					this.isLoading = false;
				})
				;
	},
}
</script>
