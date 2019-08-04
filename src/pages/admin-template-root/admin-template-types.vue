<template>
    <v-container fluid>
        <v-layout wrap></v-layout>
        <v-btn
                absolute
                dark
                color="success"
                right
                top
        >
            <v-icon>add</v-icon>新类型
        </v-btn>
    </v-container>
</template>

<script>
    export default {
        name: "admin-template-types",
        props: {
            templateId: {
                type: String,
                default: ''
            },
        },
    }
</script>

<style scoped>

</style>
