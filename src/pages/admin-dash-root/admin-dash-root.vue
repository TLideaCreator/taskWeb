<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: "admin-dash-root",
        data(){
            return {
                menuItems: [
                    {
                        text: '系统管理',
                        disabled: true,
                        href: '/dash/board',
                    }
                ]
            }
        },
        mounted() {
            this.$store.commit('updatePathItems',this.menuItems);
        }
    }
</script>

<style scoped>

</style>
