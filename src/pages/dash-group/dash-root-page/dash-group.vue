<template>
    <Layout>
        <Sider
                :style="fullHeight"
                hide-trigger
                :collapsed-width="0"
                collapsible>
            <Menu width="64"  :active-name="activeName">
                <MenuItem v-for="(menu, index) in menuList"
                          :key="index"
                          :to="{name: menu.path}"
                          :name="menu.path">
                    <Icon :type="menu.icon"></Icon>
                    {{menu.name}}
                </MenuItem>
            </Menu>
        </Sider>
        <Content :style="contentStyle" class="mainLayout">
            <router-view></router-view>
        </Content>
    </Layout>
</template>

<script>
    import {mapGetters} from 'vuex';
    import store from "./store/store";
    export default {
        store,
        name: "dash-group",
        mounted() {
            store.dispatch('initEvents');
        },
        computed:{
            activeName(){
                return this.$router.currentRoute.name;
            },
            ...mapGetters({
                fullHeight:'getFullHeight',
                menuList:'getMenuList',
                contentStyle: 'getContentStyle'
            })
        }
    }
</script>

<style scoped lang="less" src="./assets/style/index.less">

</style>
