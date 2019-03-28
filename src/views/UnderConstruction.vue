<template>
  <el-container align="center">
    <div>
      page under construction......
    </div>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UnderConstruction',
  computed: {
    ...mapState({
      storeId: state => state.system.currentStore.id
    })
  },
  created () {
    if (!this.storeId) {
      this.$router.push('/login')
    }
  }
}
</script>

<!--suppress CssUnknownTarget -->
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
div {
  font-family: 'Roboto Mono', monospace;
  font-size: xx-large;
}
</style>
