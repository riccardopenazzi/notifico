import { defineStore } from 'pinia';

export const useSignupStore = defineStore('signupStore', {
    state() {
        return {
            form: {
                data: {
                    email: '',
                    password: '',
                    name: '',
                    surname: '',
                    avatar: '',
                    confirmPassword: '',
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