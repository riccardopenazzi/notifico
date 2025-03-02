<template>
    <v-container fluid>
        <DeadlinesList></DeadlinesList>
    </v-container>
    <AddDeadlineFormPopup></AddDeadlineFormPopup>
</template>

<script>
// import { mapState, mapStores, mapWritableState } from 'pinia';

import DeadlinesList from '@/components/DeadlinesList.vue';

import AddDeadlineFormPopup from '../components/AddDeadlineFormPopup.vue';

export default {
    data() {
        return {
            
        }
    },
    computed: {
    },
    methods: {
    },
    mounted() {
    },
    components: {
        DeadlinesList,
        AddDeadlineFormPopup,
    },
}
</script>

<style lang="scss">

</style>