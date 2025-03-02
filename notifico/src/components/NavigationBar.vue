<template>
	<div>
		<v-navigation-drawer
				expand-on-hover
				rail
				mobile-breakpoint="md"
				class="navigation-drawer"
				>
			<v-list
					class="my-1"
					>
				<v-list-item
						:prepend-avatar="avatarsList.find(x => x.value == userInfo.data.avatar)?.src"
						:subtitle="userInfo.data.email"
						:title="`${userInfo.data.name} ${userInfo.data.surname}`"
						>
					<template v-slot:append>
						<v-icon 
								icon="mdi-theme-light-dark" 
								class="my-2"
								@click="toggleTheme"
								>
						</v-icon>
					</template>
				</v-list-item>
			</v-list>

			<v-divider></v-divider>

			<v-list
					:lines="false"
					density="comfortable"
					nav
					>
				<v-list-item
						v-for="(item, index) in navigationBarItems"
						:key="index"
						:value="item"
						:to="item.route"
						class="my-1"
						>
					<template v-slot:prepend>
						<v-icon :icon="item.icon"></v-icon>
					</template>

					<v-list-item-title v-text="item.text"></v-list-item-title>
				</v-list-item>
			</v-list>

			<template v-slot:append>
				<v-list-item
						class="mb-3"
						@click="executeLogout"
						>
					<template v-slot:prepend>
						<v-icon icon="mdi-logout"></v-icon>
					</template>
					<v-list-item-title>Logout</v-list-item-title>
				</v-list-item>
			</template>

		</v-navigation-drawer>
	</div>
</template>

<script>
import { mapState, mapStores } from 'pinia';

import { useTheme } from 'vuetify/lib/framework.mjs';

import { useUserInfoStore } from '../stores/user-info';
import { useAssetsStore } from '../stores/assets-store';

export default {
	setup() {
		const theme = useTheme();
		const toggleTheme = () => {
			theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
		}
		return { toggleTheme };
	},
	data() {
		return {
		}
	},
	computed: {
		...mapStores(
			useUserInfoStore,
			useAssetsStore,
		),
		...mapState(useUserInfoStore, [
				'userInfo',
			],
		),
		...mapState(useAssetsStore, [
				'avatarsList',
			],
		),
		navigationBarItems() {
			return [{
				icon: 'mdi-monitor-dashboard',
				text: 'Dashboard',
				route: '/dashboard',
			},{
				icon: 'mdi-table',
				text: 'Gestione scadenze',
				route: '/deadlines-management',
			}/* ,{
				icon: 'mdi-cog-outline',
				text: 'Impostazioni',
				route: '/settings',
			} */]
		},
	},
	methods: {
		executeLogout() {
			useUserInfoStore().executeUserLogout()
					.then(vars => {
						console.log('Logout eseguito', vars);
						this.$router.push({ name: 'SignupLogin' });
					})
					;
		}
	}
}
</script>

<style lang="css">
.navigation-drawer {
	display: flex;
	flex-direction: column;
	height: 100%;
}
</style>