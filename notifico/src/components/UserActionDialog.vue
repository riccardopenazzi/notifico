<template>
    <v-dialog 
            v-model="dialogVisible" 
            max-width="400"
            >
        <v-card>
            <v-card-title class="text-h6">{{ dialogOptions.title }}</v-card-title>
            <v-card-text>{{ dialogOptions.message }}</v-card-text>
            <v-card-actions>
                <v-btn color="error" @click="$emit('cancelClick')">{{ dialogOptions.cancelText }}</v-btn>
                <v-btn color="success" @click="$emit('confirmClick')">{{ dialogOptions.confirmText }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapStores, mapWritableState } from 'pinia';

import { useUserActionDialogStore } from '@/stores/user-action-dialog-store';

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapStores(useUserActionDialogStore),
        ...mapWritableState(useUserActionDialogStore, [
            'dialogVisible',
            'dialogOptions',
        ]),
    },
    methods: {
        handleConfirm() {
            this.dialogOptions.onConfirm();
            useUserActionDialogStore().closeDialog();
        },
        handleCancel() {
            this.dialogOptions.onCancel();
            useUserActionDialogStore().closeDialog();
        },
    },
    mounted() {
    },
    components: {
    },
    emits: ['cancelClick', 'confirmClick'],
}
</script>

<style lang="scss">

</style>