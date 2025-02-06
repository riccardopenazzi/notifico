<template>
	<v-app>
		<v-main>
			<NavigationBar></NavigationBar>
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
	name: 'App',
	
	components: {
		NavigationBar,
	},
	
	data: () => ({
		//
	}),
}
</script>
