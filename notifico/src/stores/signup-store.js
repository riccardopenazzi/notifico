import { defineStore } from 'pinia';

import ApiService from '@/utils/apiService';

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
        executeSignup(vars) {
            vars ||= {};
            if (!vars.content) {
                console.error('executeSignup: vars.content is required', vars);
                return Promise.resolve(vars);
            }
            return ApiService.post('/execute-signup', vars.content)
                    .then(vars => {
                        if (vars?.token) {
                            localStorage.setItem('token', vars.token);
                        }
                        return Promise.resolve(vars);
                    })
                    ;
        }
    },
});