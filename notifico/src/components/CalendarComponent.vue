<template>
    <v-card class="calendar-container">
        <v-calendar
                :weekdays="[0, 1, 2, 3, 4, 5, 6]"
                view-mode="month"
                class="calendar-component"
                >
        </v-calendar>
    </v-card>
</template>

<script>

export default {
    data() {
        return {
        }
    }
}
</script>

<style>

</style>