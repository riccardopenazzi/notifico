<template>
    <v-card>
        <v-row align="center" class="ma-2">
            <v-text-field
                    v-model="searchKey"
                    label="Cerca"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                    clearable=""
                    max-width="500px"></v-text-field>
            <v-checkbox
                    v-model="showExpiredDeadlines"
                    label="Mostra scadenze passate"
                    ></v-checkbox>
            <v-checkbox
                    v-model="showDisabledDeadlines"
                    label="Mostra scadenze disattivate"
                    ></v-checkbox>
            <v-icon 
                    color="green" 
                    icon="mdi-plus-circle"
                    class="ml-auto mr-5"
                    size="35"
                    @click="addDeadlinePopupVisible = true"
                    ></v-icon>
        </v-row>
        <v-row class="ma-2">
            <v-data-table-virtual
                    :items="formattedUserDeadlinesList"
                    :headers="gridCols"
                    :search="searchKey"
                    hide-default-footer
                    >
                <template v-slot:[`item.activeIcon`]="{ item }">
                    <v-icon :color="item.activeIcon.color" :icon="item.activeIcon.icon"></v-icon>
                </template>
                <template v-slot:[`item.pencilIcon`]="{ item }">
                    <v-icon 
                            color="yellow" 
                            icon="mdi-pencil"
                            @click="onPencilClick(item)"
                            ></v-icon>
                </template>
                <template v-slot:[`item.trashIcon`]="{ item }">
                    <v-icon 
                            color="red" 
                            icon="mdi-delete"
                            @click="onTrashClick(item)"
                            ></v-icon>
                </template>
            </v-data-table-virtual>
        </v-row>
    </v-card>
</template>

<script>
import { formatDate } from '@/utils/dateUtils';

import { mapState, mapStores, mapWritableState } from 'pinia';

import { useUserDeadlineStore } from '@/stores/user-deadline-store';
import { useUserInfoStore } from '@/stores/user-info';
import { useUserCategoryStore } from '@/stores/user-category-store';
import { useAlertStore } from '@/stores/alert-store';

export default {
    data() {
        return {
            searchKey: '',
            showExpiredDeadlines: false,
            showDisabledDeadlines: false,
        }
    },
    computed: {
        ...mapStores(useUserDeadlineStore, useUserInfoStore, useUserCategoryStore, useAlertStore),
        ...mapState(useUserDeadlineStore, [
            'userDeadlinesList',
        ]),
        ...mapState(useUserCategoryStore, [
            'userCategoriesList',
            'categoriesMap',
        ]),
        ...mapWritableState(useUserDeadlineStore, [
            'addDeadlinePopupVisible',
        ]),
        gridCols(){
            return [{
                title: 'Nome',
                value: 'title',
                sortable: true,
                width: '250px',
            },{
                title: 'Descrizione',
                value: 'description',
                width: '*',
            },{
                title: 'Categoria',
                value: 'categoryName',
                sortable: true,
                width: '200px',
            },{
                title: 'Data scadenza',
                value: 'date',
                sortable: true,
                width: '75px',
            },{
                title: 'Stato',
                value: 'activeIcon',
                width: '50px',
            },{
                value: 'pencilIcon',
                width: '50px',
            },{
                value: 'trashIcon',
                width: '50px',
            }];
        },
        deadlineDateFilter(){
            return this.showExpiredDeadlines ? x => x : x => new Date(x.date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
        },
        formattedUserDeadlinesList(){
            return [ ...this.userDeadlinesList ]
                    .filter(this.deadlineDateFilter)
                    .map(x => ({
                        ...x,
                        date: formatDate(x.date),
                        categoryName: this.categoriesMap[x.categoryId]?.name || '',
                        activeIcon: {
                            icon: x.active ? 'mdi-check' : 'mdi-close',
                            color: x.active? 'green' : 'red',
                        }
                    }))
                    ;
        },
       
    },
    methods: {
        onPencilClick(item){
            this.userDeadlineStoreStore.populateForm({deadlineId: item.id})
                    .then(() => {
                        this.addDeadlinePopupVisible = true;
                    })
                    ;
        },
        onTrashClick(item){
            this.userDeadlineStoreStore.deleteDeadline({deadlineId: item.id})
                    .then(vars => {
                        const alertStore = useAlertStore();
                        if (vars?.success) {
                            alertStore.showAlert({
                                title: `Scadenza eliminata con successo`,
                                message: `La scadenza è stata eliminata correttamente`,
                                color: 'success',
                            });
                        } else {
                            console.error('Delete category error');
                            console.error(vars);
                            alertStore.showAlert({
                                title: 'Errore nell\'eliminazione scadenza',
                                message: vars.serverMessage,
                                color: 'error',
                            });
                        }
                    })
                    ;
        },
    },
    mounted() {
        if (!this.userDeadlinesList.length) {
            this.userDeadlineStoreStore.loadUserDeadlines({ userId: this.userInfoStoreStore.userInfo.data.id })
        }
        if (!this.userCategoriesList.length) {
            this.userCategoryStoreStore.loadUserCategories({ userId: useUserInfoStore().userInfo.data.id });
        }
        this.userDeadlinesList.forEach(x => {console.log(new Date(x.date).toLocaleDateString())})
    },
    components: {
    },
}
</script>

<style lang="scss">

</style>