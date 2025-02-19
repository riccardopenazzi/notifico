import { defineStore } from 'pinia';

import ApiService from '../utils/apiService';

import { useLoginStore } from './login-store';
import { useSignupStore } from './signup-store';
import { useUiStore } from './ui-store';
import { useUserCategoryStore } from './user-category-store';
import { useUserDeadlineStore } from './user-deadline-store';

export const useUserInfoStore = defineStore('userInfoStore', {
    state() {
        return {
            userInfo: {
                data: {
                    name: '',
                    surname: '',
                    email: '',
                    avatar: '',
                    id: '',
                },
            }
        };
    },
    getters: {
        isUserLogged() {
            return this.userInfo.data.id !== '';
        }
    },
    actions: {
        initUserInfo(vars) {
            vars ||= {};
            if (!vars.content) {
                console.error('Userinfo, vars.content is required', vars);
                return Promise.resolve(vars);
            }
            Object.keys(vars.content).forEach(x => {
                this.userInfo.data[x] = vars.content[x];
            })
            ;
        },
        executeUserLogout() {
            return ApiService.post('/execute-logout')
                    .then(vars => {
                        console.log('executeUserLogout', vars);
                        if (vars?.success) {

                            useLoginStore().$reset();
                            useSignupStore().$reset();
                            useUiStore().$reset();
                            useUserCategoryStore().$reset();
                            useUserDeadlineStore().$reset();
                            this.$reset();
                        }
                        return Promise.resolve(vars);
                    })
                    ;
        },
        checkUserSession() {
            return ApiService.get('/get-user-info')
                    .then(vars => {
                        if (vars?.success) {
                            this.initUserInfo({ content: vars.result.serverResult });
                        }
                        return Promise.resolve(vars);
                    })
                    ;
        },
        resetUserInfo() {
            //si potrebbe rimpiazzare con this.$reset() ma se poi aggiungo altro allo state potrebbe essere un problema, per il momento ok così
            Object.keys(this.userInfo.data).forEach(x => {
                this.userInfo.data[x] = '';
            });
        },
    },
});