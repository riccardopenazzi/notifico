import ApiService from '@/utils/apiService';
import { defineStore } from 'pinia';

export const useUserDeadlineStore = defineStore('userDeadlineStore', {
    state() {
        return {
            form: {
                data: {
                    title: '',
                    description: '',
                    categoryId: '',
                    date: null, //necessario che sia null per come è mostrata la data
                    emailsToSend: [],
                },
            },
            userDeadlinesList: [],
        };
    },
    getters: {
        // Getter
    },
    actions: {
        resetForm() {
            Object.keys(this.form.data).forEach(x => {
                this.form.data[x] = '';
            })
            ;
            this.form.data.date = null;
            this.form.data.emailsToSend = [{
                date: new Date(),
            }];
        },
        loadUserDeadlines(vars) {
            vars ||= {};
            if (!vars.userId ) {
                console.error('userId is required', vars);
                return Promise.resolve(vars);
            }
            return ApiService.get('/get-user-deadlines')
                    .then(vars => {
                        this.userDeadlinesList = vars.result?.serverResult || [];
                        vars.userDeadlinesList = this.userDeadlinesList;
                        return Promise.resolve(vars);
                    })
                    ;
        },
        createDeadline(vars) {
            vars ||= {};
            if (!vars.userId || !vars.content) {
                console.error('userId and content are required', vars);
                return Promise.resolve(vars);
            }
            return ApiService.post('/create-user-deadline', vars)
                    .then(vars => {
                        if (vars?.success) {
                            vars.userId = vars.result?.result?.userId;
                            return this.loadUserDeadlines(vars);
                        } 

                        return Promise.resolve(vars);
                    })
                    ;
        }
    },
});