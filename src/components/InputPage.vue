<template>
    <Row class="widgetCss" type="flex" justify="space-between" align="middle">
        <Input :value="searchKey" style="width: 200px" :placeholder="placeholder"
               @on-enter="resetPageSearch" @on-change="$emit('change',$event.target.value)">
            <Icon type="ios-search" slot="suffix" @click.native="resetPageSearch"></Icon>
        </Input>
        <Page v-show="totalCount>pageCount"
              :total="totalCount"
              :page-size="pageCount"
              @on-change="changePage"
              size="small"></Page>
    </Row>
</template>

<script>
    export default {
        name: "InputPage",
        props:{
            searchKey: {
                type: String,
                default: ''
            },
            total: {
                type: Number,
                default: 0
            },
            perPage: {
                type: Number,
                default: 0
            },
            placeholder:{
                type:String,
                default: ''
            }
        },
        data(){
          return {
              totalCount: this.total,
              pageCount: this.perPage,
          }
        },
        watch:{
            total(val){
                this.totalCount = val;
            },
            perPage(val){
                this.pageCount = val;
            }
        },
        model:{
            prop:'searchKey',
            event:'change',
        },
        methods:{
            resetPageSearch(){
                this.$emit('search');
            },
            changePage(page){
                this.$emit('page-changed',page);
            }
        }
    }
</script>

<style scoped>
    .widgetCss{
        margin: 20px 0
    }
</style>
