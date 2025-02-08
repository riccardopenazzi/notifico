<template>
	<v-app>
		<AppBar></AppBar>
		<NavigationBar></NavigationBar>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';
import AppBar from './components/AppBar.vue';

export default {
	name: 'App',
	
	components: {
		NavigationBar,
		AppBar,
	},
	
	data: () => ({
		//
	}),
}
</script>
