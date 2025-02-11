import { defineStore } from 'pinia';

export const useLoginStore = defineStore('loginStore', {
    state() {
        return {
            form: {
                data: {
                    email: '',
                    password: '',
                }
            }
        };
    },
    getters: {
        // Getter
    },
    actions: {
        // Action
    },
});