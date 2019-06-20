<template>
    <Header ref='headDiv'>
        <Row type="flex" justify="space-between" align="middle">
            <h1 :span="4">{{titleText}}</h1>
            <Col :span="18"></Col>
            <slot :span="2" name="btn">
                <Button type="primary"
                        @click="$emit('headerBtnClick')"
                        v-show="btnTxt!==''">{{btnTxt}}</Button>
            </slot>
        </Row>
    </Header>
</template>

<script>
    export default {
        name: "HeaderLine",
        props: {
            title: {
                type: String,
                default: ''
            },
            btnTitle: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                titleText: this.title,
                btnTxt: this.btnTitle
            };
        },
        watch: {
            title(val) {
                this.titleText = val;
            },
            btnTitle(val) {
                this.btnTxt = val;
            }
        },
    }
</script>

<style scoped>

</style>
