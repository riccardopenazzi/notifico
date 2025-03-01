<template>
    <v-expansion-panels
            v-model="expandedPanels"
            >
        <v-expansion-panel
                title="Aggiungi scadenza"
                >
            <v-expansion-panel-text>
                <v-form>
                    <v-text-field
                            label="Nome"
                            placeholder="Scadenza bollo auto"
                            variant="outlined"
                            clearable
                            v-model="form.data.title"
                            :rules="nameRules"
                            >
                    </v-text-field>
                    <v-textarea
                            label="Descrizione"
                            placeholder=""
                            variant="outlined"
                            clearable
                            v-model="form.data.description"
                            >
                    </v-textarea>
                    <v-select
                            label="Categoria"
                            :items="formattedCategoriesList"
                            clearable
                            variant="outlined"
                            item-title="text"
                            item-value="value"
                            v-model="form.data.categoryId"
                            >
                        <template v-slot:append>
                            <v-icon 
                                    icon="mdi-plus-box-multiple-outline"
                                    @click="showCreateCategoryDialog = true"
                                    >
                            </v-icon>
                        </template>
                        <template v-slot:item="{item, props}">
                            <v-list-item v-bind="props">
                                <template v-slot:prepend>
                                    <v-icon :color="item.raw.color"
                                            class="mr-n5"
                                            icon="mdi-rhombus"
                                            >
                                    </v-icon>
                                </template>
                            </v-list-item>
                        </template>
                    </v-select>
                    <v-date-input 
                            label="Data scadenza"
                            v-model="form.data.date"
                            :min="minDate"
                            clearable
                            prepend-icon=""
                            :rules="dateRules"
                            @update:modelValue="onDateUpdateModel"
                            @click:clear="resetDateVModel"
                            ></v-date-input>
                    <v-container v-if="form.data.date">
                        <v-row class="mb-4">
                            <span>Personalizza avvisi</span>
                        </v-row>
                        <v-row class="d-flex align-center">
                            <v-date-input 
                                    label="Data avviso"
                                    v-model="dateEmailToAdd"
                                    :min="minDate"
                                    :max="form.data.date"
                                    ></v-date-input>
                            <v-icon 
                                    icon="mdi-plus-circle" 
                                    class="ml-5" 
                                    color="green" 
                                    size="30px"
                                    @click="addDateToEmailsToSendList"
                                    ></v-icon>
                        </v-row>
                        <v-row>
                            <v-list>
                                <v-list-item-group>
                                    <v-list-item v-for="(elem, index) in ordereddEmailsToSend" :key="index"
                                            class="rounded-lg my-2 bg-surface-variant elevation-5"
                                            >
                                        <v-list-item-title>{{ formattedDate(elem.date) }}</v-list-item-title>
                                        <template v-slot:append v-if="elem.date.getDate() != form.data?.date?.getDate()">
                                            <v-icon
                                                    icon="mdi-delete"
                                                    color="red"
                                                    @click="deleteDateFromEmailsToSendList(elem.date)"
                                                    ></v-icon>
                                        </template>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-row>
                    </v-container>
                    <v-btn
                            prepend-icon="mdi-check"
                            variant="elevated"
                            color="success"
                            block
                            @click="createDeadline"
                            >
                        Aggiungi
                    </v-btn>
                </v-form>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
    <create-category-dialog></create-category-dialog>
</template>

<script>
import { formatDate } from '@/utils/dateUtils';

import { mapStores, mapWritableState } from 'pinia';

import { useUserCategoryStore } from '../stores/user-category-store';
import { useUserDeadlineStore } from '@/stores/user-deadline-store';
import { useAlertStore } from '@/stores/alert-store';
import { useUserInfoStore } from '@/stores/user-info';

import CreateCategoryDialog from './CreateCategoryDialog.vue';

export default {
    data() {
        return {
            isDatePickerExpanded: false,
            expandedPanels: [],
            dateEmailToAdd: '',
            minDate: new Date().toISOString().split('T')[0],
        }
    },
    computed: {
        ...mapStores(
            useUserCategoryStore,
            useUserDeadlineStore,
            useAlertStore,
            useUserInfoStore,
        ),
        ...mapWritableState(useUserCategoryStore,[
            'showCreateCategoryDialog',
            'userCategoriesList',
        ]),
        ...mapWritableState(useUserDeadlineStore,[
            'form', 
        ]),
        formattedDate() {
            return date => {
                return formatDate(date);
            }
        },
        showedDate() {
            return this.form.data.date != null ? this.formattedDate(this.form.data.date) : this.form.data.date;
        },
        formattedCategoriesList() {
            return this.userCategoriesList.map(x => ({
                text: x.name,
                color: x.color,
                value: x.id,
            }));
        },
        nameRules() {
            return [
                v => !!v || 'Il nome è obbligatorio',
            ];
        },
        dateRules() {
            return [
                v => !!v || 'La data è obbligatoria',
            ];
        },
        isFormValid() {
            return true 
                    && this.form.data.title
                    && this.form.data.date
                    ;
        },
        ordereddEmailsToSend() {
            return [ ...this.form.data.emailsToSend ]
                    .sort((a, b) => a.date > b.date ? 1 : -1)
                    ;
        },
    },
    methods: {
        createDeadline() {
            let alertStore = useAlertStore();
            if (!this.isFormValid) {
                alertStore.showAlert({
                    title: 'Dati mancanti',
                    message: 'Completa tutti i campi per procedere',
                    color: 'error',
                });
                return;
            }
            let vars = {};
            vars.userId = useUserInfoStore().userInfo.data.id;
            vars.content = { 
                title: this.form.data.title,
                description: this.form.data.description || null,
                categoryId: this.form.data.categoryId || null,
                date: this.form.data.date,
                emailsToSend: this.form.data.emailsToSend.map(x => x.date),
            };
            this.userDeadlineStoreStore.createDeadline(vars)
                    .then(vars => {
                        if (vars?.success) {
                            alertStore.showAlert({
                                title: 'Scadenza creata con successo',
                                message: 'La sacdenza è stata creata correttamente',
                                color: 'success',
                            });
                            useUserDeadlineStore().resetForm();
                            this.expandedPanels = [];
                        } else {
                            console.error('Create category error');
                            console.error(vars);
                            alertStore.showAlert({
                                title: 'Errore nella creazione scadenza',
                                message: vars.serverMessage,
                                color: 'error',
                            });
                        }
                    })
                    ;
        },
        //aggiungo una data solo se non è già presente nella lista ed è minore della scadenza
        addDateToEmailsToSendList(userAction=true){
            if (!this.form.data.emailsToSend.some(x => x.date.getDate() === this.dateEmailToAdd.getDate()) && this.dateEmailToAdd.getDate() <= this.form.data.date.getDate()) {
                this.form.data.emailsToSend.push({date: this.dateEmailToAdd, userAction: userAction});
                // this.dateEmailToAdd = this.form.data.date;
                this.dateEmailToAdd = null;
            }
        },
        deleteDateFromEmailsToSendList(dateToRemove){
            this.form.data.emailsToSend = this.form.data.emailsToSend.filter(x => x.date.getDate() != dateToRemove.getDate());
        },
        //quando la scadenza viene aggiornata tengo solo le email programmate con data inferiore o uguale alla scadenza e inserite dall'utente, poi chiamo la addDate cercando di aggiungere
        //la data della scadenza, in questo modo ho già i controlli sui duplicati passando false perchè questa data non è stata aggiunta dall'utente
        onDateUpdateModel() {
            this.isDatePickerExpanded = false;
            this.form.data.emailsToSend = this.form.data.emailsToSend.filter(x => x.date.getDate() <= this.form.data.date.getDate() && x.userAction);
            this.dateEmailToAdd = this.form.data.date;
            this.addDateToEmailsToSendList(false);
        },
        resetDateVModel(){
            this.form.data.date = null;
        },
    },
    mounted() {
        if (!this.userCategoriesList.length) {
            this.userCategoryStoreStore.loadUserCategories({ userId: useUserInfoStore().userInfo.data.id });
        }
    },
    components: {
        CreateCategoryDialog,
    },
}
</script>
