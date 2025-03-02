<template>
    <v-expansion-panels
            v-model="expandedPanels"
            >
        <v-expansion-panel
                title="Aggiungi scadenza"
                >
            <v-expansion-panel-text>
                <AddDeadlineForm @deadline-correct-registration="onDeadlineCorrectRegistration"></AddDeadlineForm>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import AddDeadlineForm from './AddDeadlineForm.vue';

export default {
    data() {
        return {
            expandedPanels: [],
        }
    },
    computed: {
    },
    methods: {
        onDeadlineCorrectRegistration(){
            this.expandedPanels = [];
        },
    },
    mounted() {
    },
    components: {
        AddDeadlineForm,
    },
}
</script>

<style lang="scss">

</style>