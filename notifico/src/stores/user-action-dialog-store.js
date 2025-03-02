import { defineStore } from 'pinia';

export const useUserActionDialogStore = defineStore('userActionDialog', {
    state() {
        return {
            dialogVisible: false,
            dialogOptions: {
                title: '',
                message: '',
                confirmText: 'Conferma',
                cancelText: 'Annulla',
            },
        };
    },
    getters: {
        // Getter
    },
    actions: {
        openDialog(vars) {
            Object.keys(this.dialogOptions).forEach(x => {
                this.dialogOptions[x] = vars[x];
            })
            ;
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        },
    },
});