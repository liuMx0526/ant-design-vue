<template>
  <a-layout id="basic-layout" :class="['nav-theme-' + navTheme]">
    <a-layout-sider
      v-if="navLayout === 'left'"
      :theme="navTheme"
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <div class="logo">Ant Design Vue</div>
      <SilderMenu :collapsed="collapsed" :theme="navTheme" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          v-if="navLayout === 'left'"
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapsed = !collapsed"
        />
        <Header />
      </a-layout-header>
      <a-layout-content class="contentMain">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </a-layout>
</template>

<script>
import Header from "./Header";
import SilderMenu from "./SilderMenu";
import SettingDrawer from "@/components/SettingDrawer";
export default {
  components: {
    Header,
    SilderMenu,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  methods: {
    colChange() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style lang="less">
#basic-layout {
  height: 100vh;
}

#basic-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#basic-layout .trigger:hover {
  color: #1890ff;
}

#basic-layout .logo {
  font-size: 24px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  overflow: hidden;
}

.nav-theme-dark .logo {
  color: #ffffff;
}

.nav-theme-light .logo {
  color: #666666;
}

.contentMain {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
</style>
