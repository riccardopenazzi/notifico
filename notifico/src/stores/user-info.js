import { defineStore } from 'pinia';

import ApiService from '../utils/apiService';

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
            //si potrebbe rimpiazzare con this.$reset() ma se poi aggiungo altro allo state potrebbe essere un problema, per il momento ok così
            return ApiService.post('/execute-logout')
                    .then(vars => {
                        console.log('executeUserLogout', vars);
                        if (vars?.success) {
                            this.resetUserInfo();
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
            Object.keys(this.userInfo.data).forEach(x => {
                this.userInfo.data[x] = '';
            });
        },
    },
});