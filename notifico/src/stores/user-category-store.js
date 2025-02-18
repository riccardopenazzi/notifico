import { defineStore } from 'pinia';

import ApiService from '@/utils/apiService';

export const useUserCategoryStore = defineStore('userCategoryStore', {
    state() {
        return {
            form: {
                data: {
                    name: '',
                    color: '',
                }
            },
            showCreateCategoryDialog: false,
            userCategoriesList: [],
        };
    },
    getters: {
        // Getter
    },
    actions: {
        loadUserCategories(vars) {
            vars ||= {};
            if (!vars.userId) {
                console.error('UserId required', vars);
                return;
            }
            return ApiService.get('/get-user-categories', { userId:  vars.userId })
                    .then(vars => {
                        this.userCategoriesList = vars.result.serverResult || [];
                        vars.categoriesList = this.userCategoriesList;
                        return Promise.resolve(vars);
                    })
                    ;
        },
        createUserCategory(vars) {
            vars ||= {};
            const userId = vars.userId;
            if (!userId || !vars.content) {
                console.error('UserId and content are required', vars);
                return;
            }
            return ApiService.post('/create-user-categories', {userId: userId, color: vars.content.color, name: vars.content.name })
                    .then(vars => {
                        if (vars.success) {
                            vars.userId = userId;
                            return this.loadUserCategories(vars);
                        }

                        return Promise.resolve(vars);
                    })
                    ;
        }
    },
});