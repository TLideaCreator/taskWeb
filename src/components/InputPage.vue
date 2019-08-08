<template>
    <v-layout row justify-space-between align-center class="ml-5 mr-5">
        <v-text-field
                :placeholder="placeholder"
                :value="searchKey"
                @input="inputChanged"
                clearable
                append-outer-icon="search"
                @click:append-outer="resetPageSearch"
        ></v-text-field>
        <v-btn color="success" class="ml-4" @click="$emit('createNew')">
            <v-icon>add</v-icon>
            {{createTitle}}
        </v-btn>
        <v-flex md5>
            <v-pagination
                    v-show="pageLength>1"
                    v-model="currentPage"
                    circle
                    :total-visible="4"
                    :length="pageLength"
                    @input="changePage"
                    @next="changePage"
                    @previous="changePage"
            ></v-pagination>
        </v-flex>
    </v-layout>

</template>

<script>
    export default {
        name: "InputPage",
        props: {
            searchKey: {
                type: String,
                default: ''
            },
            createTitle: {
                type: String,
                default: ''
            },
            total: {
                type: Number,
                default: 0
            },
            placeholder: {
                type: String,
                default: ''
            },
            itemHeight:{
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                totalCount: this.total,
                pageCount: this.perPage,
                currentPage: 1
            }
        },
        watch: {
            total(val) {
                this.totalCount = val;
            },
            perPage(val) {
                this.pageCount = val;
            }
        },
        model: {
            prop: 'searchKey',
            event: 'change',
        },
        computed: {
            pageLength() {
                return Math.ceil(this.totalCount / this.pageCount)
            }
        },
        mounted(){
            let height = this.$store.state.contentFullHeight;
            let count = Math.floor((height - 168) / this.itemHeight);
            this.pageCount = count > 8 ? count : 8;
            this.changePage();
        },
        methods: {
            inputChanged(val){
                this.$emit('change',val);
            },
            resetPageSearch() {
                this.currentPage = 1;
                this.$emit('search', {
                    searchKey: this.searchKey,
                    page: this.currentPage,
                    per_page: this.pageCount
                });
            },
            changePage() {
                this.$emit('page-changed', {
                    searchKey: this.searchKey,
                    page: this.currentPage,
                    per_page: this.pageCount
                });
            }
        }
    }
</script>

<style scoped>
    .widgetCss {
        margin: 20px 0
    }
</style>
