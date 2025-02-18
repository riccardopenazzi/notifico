<template>
    <div class="pa-4 text-center">
        <v-dialog
                v-model="showCreateCategoryDialog"
                max-width="500"
                >
            <v-card
                    title="Nuova categoria"
                    prepend-icon="mdi-shape-plus"
                    >
                <v-card-text>
                    <v-text-field
                            label="Nome categoria"
                            v-model="form.data.name"
                            variant="outlined"
                            clearable
                            >
                    </v-text-field>
                    <v-label class="mb-2">Colore categoria</v-label>
                    <v-color-picker
                            v-model="form.data.color"
                            variant="outlined"
                            hide-inputs
                            elevation="20"
                            >
                    </v-color-picker>
                </v-card-text>
                
                <v-divider></v-divider>

                <v-card-actions>
                    <v-row>
                        <v-col cols="4"></v-col>
                        <v-col cols="4">
                            <v-btn
                                    prepend-icon="mdi-close"
                                    variant="elevated"
                                    color="error"
                                    block
                                    @click="showCreateCategoryDialog = false"
                                    >
                                Annulla
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn
                                    prepend-icon="mdi-check"
                                    variant="elevated"
                                    color="success"
                                    block
                                    @click="createCategory"
                                    >
                                Aggiungi
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapStores, mapWritableState } from 'pinia';

import { useUserCategoryStore } from '../stores/user-category-store';
import { useAlertStore } from '../stores/alert-store';
import { useUserInfoStore } from '@/stores/user-info';

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapStores(
            useUserCategoryStore,
        ),
        ...mapWritableState(useUserCategoryStore,[
            'form',
            'showCreateCategoryDialog',
        ]),
    },
    methods: {
        createCategory() {
            let vars = {};
            vars.userId = useUserInfoStore().userInfo.data.id;
            vars.content = { ...this.form.data };
            this.userCategoryStoreStore.createUserCategory(vars)
                    .then(vars => {
                        let alertStore = useAlertStore();
                        if (vars.success) {
                            alertStore.showAlert({
                                title: 'Categoria creata con successo',
                                message: 'La categoria è stata creata correttamente',
                                color: 'success',
                            });
                            this.showCreateCategoryDialog = false;
                        } else {
                            console.error('Create category error');
                            console.error(vars);
                            alertStore.showAlert({
                                title: 'Errore nella creazione categoria',
                                message: vars.serverMessage,
                                color: 'error',
                            });
                        }
                    })
                    ;
        },
    },
    mounted() {
        this.userCategoryStoreStore.loadUserCategories({ userId: useUserInfoStore().userInfo.data.id });
    },
    components: {
    },
}
</script>

<style lang="scss">

</style>