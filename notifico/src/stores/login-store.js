import { defineStore } from 'pinia';

import { useUserInfoStore } from './user-info';

import ApiService from '../utils/apiService';

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
            return ApiService.post('/execute-login', vars.content, false)
                    .then(vars => {
                        console.log(vars.cookies);
                        if (vars?.success) {
                            let userData = {
                                name: vars.result.serverResult.name,
                                surname: vars.result.serverResult.surname,
                                email: vars.result.serverResult.email,
                                avatar: vars.result.serverResult.avatar,
                                id: vars.result.serverResult.id,
                            };
                            useUserInfoStore().initUserInfo({ content: userData });
                            this.resetForm();
                            localStorage.setItem('token', vars.token);
                        }
                        return Promise.resolve(vars);
                    })
                    ;
        },
        resetForm() {
            Object.keys(this.form.data).forEach(x => {
                this.form.data[x] = '';
            });
        },
    },
});