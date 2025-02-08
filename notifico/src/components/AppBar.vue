<template>
    <v-app-bar
            color="primary"
            density="compact"
            >
        <v-app-bar-title
                class="ml-16"
                >
            Notifico
        </v-app-bar-title>

        <template v-slot:append>
            <v-btn 
                    icon="mdi-bell-ring-outline"
                    class="mr-4"
                    ></v-btn>
        </template>
      </v-app-bar>
</template>