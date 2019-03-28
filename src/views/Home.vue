<template>
  <el-row
    id="app"
    style="height: 100%;"
  >
    <el-col
      :span="4"
      style="height: 100%;position: fixed;top: 0;left: 0;"
    >
      <NavigationMenu />
    </el-col>
    <el-col
      :span="20"
      :style="{marginLeft: 100/6 + '%'}"
    >
      <el-container>
        <el-header
          class="head-top-bottom"
        >
          <HeadTop />
        </el-header>
        <el-main
          class="main-app"
        >
          <router-view />
        </el-main>
      </el-container>
    </el-col>
  </el-row>
</template>

<script>
import NavigationMenu from '../components/NavigationMenu'
import HeadTop from '../components/HeadTop'

export default {
  name: 'Home',
  components: {
    NavigationMenu, HeadTop
  }
}
</script>

<style scoped>
.head-top-bottom {
  border-bottom-style: ridge;
  border-bottom-color: #303030;
  border-bottom-width: 1px
}
.main-app {
  display: flex;
  justify-content: center
}
</style>
