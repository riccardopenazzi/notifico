import ApiService from '@/utils/apiService';
import { defineStore } from 'pinia';

export const useUserDeadlineStore = defineStore('userDeadlineStore', {
    state() {
        return {
            form: {
                data: {
                    id: '',
                    title: '',
                    description: '',
                    categoryId: '',
                    date: null, //necessario che sia null per come è mostrata la data
                    emailsToSend: [],
                },
            },
            userDeadlinesList: [],
            addDeadlinePopupVisible: false,
        };
    },
    getters: {
        getUserDeadlinesMap() {
            return this.userDeadlinesList.toMap(x => x.id);
        },
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
        createUpdateDeadline(vars) {
            vars ||= {};
            if (!vars.userId || !vars.content) {
                console.error('userId and content are required', vars);
                return Promise.resolve(vars);
            }
            const currentAction = !vars.content?.id ? ApiService.post('/create-user-deadline', vars) : ApiService.put('/update-user-deadline', vars);
            return currentAction
                    .then(vars => {
                        if (vars?.success) {
                            vars.userId = vars.result?.result?.userId;
                            return this.loadUserDeadlines(vars);
                        }

                        return Promise.resolve(vars);
                    })
                    ;
        },
        populateForm(vars){
            vars ||= {};
            vars.deadlineId ||= vars.content.deadlineId || '';
            let deadlineId = vars.deadlineId;
            return ApiService.get('/get-deadline-scheduled-emails', vars)
                    .then(vars => {
                        if (vars?.success) {
                            Object.keys(this.form.data).forEach(x => {
                                this.form.data[x] = this.getUserDeadlinesMap[deadlineId][x] || '';
                            })
                            ;
                            this.form.data.date = new Date(this.form.data.date);
                            this.form.data.emailsToSend = vars.result?.serverResult.map(x => ({
                                date: new Date(x.date),
                                userAction: new Date(x.date).setTime(0, 0, 0, 0) != new Date(this.form.data.date).setTime(0, 0, 0, 0),
                            }));
                        }
                        return Promise.resolve(vars);
                    })
                    ;
        },
        deleteDeadline(vars) {
            vars ||= {};
            if (!vars.deadlineId) {
                console.error('deadlineId is required', vars);
                return Promise.resolve(vars);
            }
            return ApiService.delete(`/delete-user-deadline/${vars.deadlineId}`)
                    .then(vars => {
                        if (vars?.success) {
                            vars.userId = vars.result?.userId;
                            return this.loadUserDeadlines(vars);
                        }

                        return Promise.resolve(vars);
                    })
                    ;
        }
    },
});