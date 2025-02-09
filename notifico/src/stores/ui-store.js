import { defineStore } from 'pinia';

export const useUiStore = defineStore('uiStore', {
    state() {
        return {
            showNavBar: true,
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