<template>
    <v-layout column fill-height class="contentLayout">
        <v-breadcrumbs :items="items">
            <template v-slot:divider>
                <v-icon>chevron_right</v-icon>
            </template>
        </v-breadcrumbs>
        <v-divider></v-divider>
        <v-list>

        </v-list>
    </v-layout>
</template>

<script>

    export default {
        name: 'dash-project-page',
        data() {
            return {
                items: [
                    {
                        text: '我的项目',
                        disabled: false,
                        href: '',
                    }
                ],
                projectList : [

                ]
            }
        },

        methods: {

        }
    }
</script>

<style lang="less" scoped src="./assets/style/index.less">

</style>
