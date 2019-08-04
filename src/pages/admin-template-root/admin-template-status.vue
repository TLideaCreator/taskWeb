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
            <v-icon>add</v-icon>新状态
        </v-btn>
    </v-container>
</template>

<script>
    export default {
        name: "admin-template-status",
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
