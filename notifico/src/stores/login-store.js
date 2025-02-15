import { defineStore } from 'pinia';

import ApiService from '@/utils/apiService';

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
        executeLogin(vars) {
            vars ||= {};
            if (!vars.content) {
                console.error('executeLogin: vars.content is required', vars);
                return Promise.resolve(vars);
            }
            return ApiService.post('/execute-login', vars.content)
                    .then(vars => {
                        if (vars?.token) {
                            localStorage.setItem('token', vars.token);
                        }
                        return Promise.resolve(vars);
                    })
                    ;
        },
    },
});