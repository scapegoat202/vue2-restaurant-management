<template>
  <div class="header-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path: '/home'}">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(name, index) in this.$route.meta"
        :key="index"
      >
        {{ name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown
      menu-align="end"
      @command="handleCommand"
    >
      <el-button
        type="primary"
        class="el-icon-setting"
        align="right"
      />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">
          首页
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          退出
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'HeadTop',
  methods: {
    async handleCommand (command) {
      switch (command) {
        case 'home': {
          this.$router.push('/home')
          break
        }
        case 'logout': {
          this.$router.push('/login')
        }
      }
    }
  }
}
</script>

<style scoped>
  .header-container {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
  }
</style>
