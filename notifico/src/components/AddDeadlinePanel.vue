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
                    <v-text-field
                            label="Data scadenza"
                            v-model="showedDate"
                            variant="outlined"
                            readonly
                            @click="isDatePickerExpanded = !isDatePickerExpanded"
                            :rules="dateRules"
                            >
                    </v-text-field>
                    <v-date-picker
                            v-show="isDatePickerExpanded"
                            elevation="20"
                            v-model="form.data.date"
                            ref="datePicker"
                            @update:modelValue="isDatePickerExpanded = false"
                            @blur="isDatePickerExpanded = false"
                            >
                    </v-date-picker>
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
        }
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
