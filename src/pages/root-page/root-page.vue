<template>
    <Layout :style="fullHeight" style="display: flex">
        <Sider class="sider-div" :width="64">
            <img :src="require('./assets/images/logo.png')"/>
            <Layout class="bottomDiv">
                <Button @click='showSideMenu = !showSideMenu'>
                    <Icon type="ios-apps" color="white" :size="30"></Icon>
                </Button>

                <Icon type="md-contact" v-if="!userInfo"  :size="40" style="background: white;color: #134da0;border-radius: 50%"/>
                <Poptip
                        v-else
                        placement="right-end" :width="180" confirm
                        ok-text="退出"
                        title="是否退出登录？"
                        @on-ok="logoutTaskBoard"
                >
                    <Avatar class="avatarStyle" style="background-color: #ffffff;color: #098aff;" :src="activePath">
                        {{userInfo?userInfo.name.substr(0,1):''}}
                    </Avatar>
                </Poptip>
            </Layout>
        </Sider>
        <Content>
            <router-view></router-view>
        </Content>
    </Layout>
</template>

<script lang="js" src="./root-page.js">
</script>

<style lang="less" scoped src="./assets/style/index.less">

</style>
