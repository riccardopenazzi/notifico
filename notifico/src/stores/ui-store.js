import { defineStore } from 'pinia';

export const useUiStore = defineStore('uiStore', {
    state() {
        return {
            showNavigationBar: true,
            showTopBar: true,
        };
    },
    getters: {
        // Getter
    },
    actions: {
        // Action
    },
});