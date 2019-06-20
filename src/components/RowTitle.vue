<template>
    <Row class-name="projectRow" type="flex" justify="start" align="middle">
        <Col v-for="(item,index) in itemList" :key="index" :order="index" :span="item.span"><h5>{{item.name}}</h5></Col>
    </Row>
</template>

<script>
    export default {
        name: "RowTitle",
        props: {
            rowList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
                itemList: this.rowList
            };
        },
        watch: {
            rowList(val) {
                this.itemList = val;
            }
        }
    }
</script>

<style scoped>
    .projectRow {
        margin-top: 5px;
        h5 {
            font-weight: 900;
            margin: 0;
        }
    }
</style>
