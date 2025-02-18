import { defineStore } from 'pinia';

import { useUserInfoStore } from './user-info';

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
                        if (vars?.success) {
                            let userData = {
                                name: this.form.data.name,
                                surname: this.form.data.surname,
                                email: this.form.data.email,
                                avatar: this.form.data.avatar,
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