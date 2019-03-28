<template>
  <el-menu
    class="menu-container"
    background-color="#303030"
    text-color="#ffffff"
    active-text-color="#2196f3"
  >
    <el-menu-item
      index="home"
      class="menu-item-width"
      @click="goto('/home')"
    >
      <i class="el-icon-menu" />首页
    </el-menu-item>
    <el-submenu index="store">
      <template slot="title">
        <i class="el-icon-document" />店铺管理
      </template>
      <el-menu-item
        class="menu-item-width"
        index="storeInformation"
        @click="goto('/stores/info')"
      >
        店铺信息
      </el-menu-item>
    </el-submenu>
    <el-submenu index="category">
      <template slot="title">
        <i class="el-icon-document" />类目管理
      </template>
      <el-menu-item
        class="menu-item-width"
        index="categoryList"
        @click="goto('/categories/all')"
      >
        类目列表
      </el-menu-item>
    </el-submenu>
    <el-submenu index="commodity">
      <template slot="title">
        <i class="el-icon-document" />商品管理
      </template>
      <el-menu-item
        class="menu-item-width"
        index="commodityList"
        @click="goto('/commodities/all')"
      >
        商品列表
      </el-menu-item>
      <el-menu-item
        class="menu-item-width"
        index="addCommodity"
        @click="goto('/commodities/add')"
      >
        添加商品
      </el-menu-item>
    </el-submenu>
    <el-submenu index="order">
      <template slot="title">
        <i class="el-icon-document" />订单管理
      </template>
      <el-menu-item
        class="menu-item-width"
        index="pendingOrders"
        @click="goto('/orders/pending')"
      >
        待处理
      </el-menu-item>
      <el-menu-item
        class="menu-item-width"
        index="allOrders"
        @click="goto('/orders/all')"
      >
        订单列表
      </el-menu-item>
    </el-submenu>
    <el-submenu index="user">
      <template slot="title">
        <i class="el-icon-document" />用户管理
      </template>
      <el-menu-item
        class="menu-item-width"
        index="userList"
        @click="goto('/customers/all')"
      >
        用户列表
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'NavigationMenu',
  methods: {
    goto (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.menu-container {
  height: 100%;text-align: center
}
.menu-item-width {
  min-width: 0;
}
</style>
