import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alertStore', {
    state() {
        return {
            isAlertVisible: false,
            alert: {
                title: '',
                message: '',
                color: '',
                timeout: '',
                location: '',
                icon: '',
            }
        };
    },
    getters: {
        // Getter
    },
    actions: {
        showAlert(vars) {
            vars ||= {};
            this.alert.title = vars?.title || '';
            this.alert.message = vars?.message || '';
            this.alert.color = vars?.color || 'info';
            this.alert.timeout = vars?.timeout || 4000;
            this.isAlertVisible = true;
            this.alert.location = vars?.location || 'top';
            this.alert.icon = vars?.icon || this.getAlertIcon(vars.color);
        },
        hideAlert() {
            this.alert.title = '';
            this.alert.message = '';
            this.alert.color = '';
            this.isAlertVisible = false;
        },
        getAlertIcon(color) {
            switch (color) {
                case 'success':
                    return 'mdi-check-circle-outline';
                case 'error':
                    return 'mdi-alert-circle-outline';
                case 'warning':
                    return 'mdi-alert-outline';
                case 'info':
                    return 'mdi-information-slab-circle-outline';
                default:
                    return 'mdi-information';
            }
        }
    },
});