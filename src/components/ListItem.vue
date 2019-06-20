<template>
    <v-list-tile avatar >
        <v-list-tile-avatar class="lighten-1">
            <v-icon>{{icon}}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>{{title}}</v-list-tile-content>
    </v-list-tile>
</template>

<script>
    export default {
        name: "MenuItem",
        props: {
            icon: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped lang="less">
    .menuItem {

    }
</style>