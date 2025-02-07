<template>
	<v-navigation-drawer
			expand-on-hover
			rail
			mobile-breakpoint="md"
			>
		<v-list
				class="my-1"
				>
			<v-list-item
					:prepend-avatar="avatar"
					subtitle="mariorossi@email.com"
					title="Mario Rossi"
					>
				<template v-slot:append>
					<v-icon icon="mdi-theme-light-dark" class="my-2"></v-icon>
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
	</v-navigation-drawer>
</template>

<script>
import hackerImg from '../assets/hacker.png';

export default {
	data() {
		return {
			avatar: hackerImg,
		}
	},
	computed: {
		navigationBarItems() {
			return [{
				icon: 'mdi-monitor-dashboard',
				text: 'Dashboard',
				route: '/',
			},{
				icon: 'mdi-cog-outline',
				text: 'Impostazioni',
				route: '/settings',
			}]
		}
	}
}
</script>