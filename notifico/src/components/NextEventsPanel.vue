<template>
    <v-sheet class="mt-5">
        <v-list>
            <v-list-item
                    v-for="(event, index) in nextEvenetsList"
                    :key="index"
                    :title="event.title"
                    >
                <template v-slot:prepend>
                    <v-icon icon="mdi-calendar" color="yellow"></v-icon>
                </template>
                <template v-slot:append>
                    <v-icon icon="mdi-close" color="red" class="mr-2"></v-icon>
                    <v-icon icon="mdi-pencil-outline" color="primary"></v-icon>
                </template>
            </v-list-item>
        </v-list>
    </v-sheet>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        nextEvenetsList() {
            return [{
                title: 'Bollo auto Opel',
            },{
                title: 'Tasse università',
            },{
                title: 'Assicurazione moto',
            }]
        }
    }
}
</script>