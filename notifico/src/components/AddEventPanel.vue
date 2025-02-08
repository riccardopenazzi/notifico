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
                            :items="items"
                            clearable
                            variant="outlined"
                            item-title="text"
                            >
                        <template v-slot:item="{item, props}">
                            <v-list-item v-bind="props">
                                <template v-slot:prepend>
                                    <v-icon :color="item.raw.color"
                                            class="mr-n5"
                                            icon="mdi-rhombus"
                                            >
                                    </v-icon>
                                </template>
                                <v-list-item-title>{{ item.text }}</v-list-item-title>
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
</template>

<script>
import { formatDate } from '@/utils/dateUtils';

export default {
    data() {
        return {
            dateModel: null,
            isDatePickerExpanded: false,
            items: [
                {text: 'Bolli', color: 'red'},
                {text: 'Assicurazioni', color: 'green'},
                {text: 'Università', color: 'purple'}
            ]
        //    items: ['Bolli', 'Università']
        }
    },
    computed: {
        formattedDate() {
            return date => {
                return formatDate(date);
            }
        },
        showedDate() {
            return this.dateModel != null ? this.formattedDate(this.dateModel) : this.dateModel;
        },
    },
}
</script>
