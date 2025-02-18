<template>
    <v-expansion-panels>
        <v-expansion-panel
                title="Aggiungi scadenza"
                >
            <v-expansion-panel-text>
                <v-form>
                    <v-text-field
                            label="Descrizione"
                            placeholder="Scadenza bollo auto"
                            variant="outlined"
                            clearable
                            >
                    </v-text-field>
                    <v-select
                            label="Categoria"
                            :items="formattedCategoriesList"
                            clearable
                            variant="outlined"
                            item-title="text"
                            item-value="value"
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
                            @focus="isDatePickerExpanded = true"
                            >
                    </v-text-field>
                    <v-date-picker
                            v-show="isDatePickerExpanded"
                            elevation="20"
                            v-model="dateModel"
                            @update:modelValue="isDatePickerExpanded = false; console.log(dateModel)"
                            >
                    </v-date-picker>
                    <v-btn
                            prepend-icon="mdi-check"
                            variant="elevated"
                            color="success"
                            block
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

import CreateCategoryDialog from './CreateCategoryDialog.vue';

export default {
    data() {
        return {
            dateModel: null,
            isDatePickerExpanded: false,
        }
    },
    computed: {
        ...mapStores(
            useUserCategoryStore,
        ),
        ...mapWritableState(useUserCategoryStore,[
            'showCreateCategoryDialog',
            'userCategoriesList',
        ]),
        formattedDate() {
            return date => {
                return formatDate(date);
            }
        },
        showedDate() {
            return this.dateModel != null ? this.formattedDate(this.dateModel) : this.dateModel;
        },
        formattedCategoriesList() {
            return this.userCategoriesList.map(x => ({
                text: x.name,
                color: x.color,
                value: x.value,
            }));
        }
    },
    methods: {
    },
    components: {
        CreateCategoryDialog,
    },
}
</script>
