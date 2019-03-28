<template>
  <el-table :data="customerList">
    <el-table-column
      prop="id"
      label="ID"
      width="100"
    />
    <el-table-column
      prop="name"
      label="姓名"
      width="100"
    />
    <el-table-column
      prop="gender"
      label="性别"
      width="100"
    />
    <el-table-column
      prop="email"
      label="邮件"
    />
  </el-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CustomerList',
  data () {
    return {
      customerList: [
        {
          id: 7,
          name: '吴斌',
          gender: 'MALE',
          email: 'zfz2020@foxmail.com'
        },
        {
          id: 9,
          name: '但丁',
          gender: 'MALE',
          email: 'slique@gmail.com'
        },
        {
          id: 7,
          name: '陈茹',
          gender: 'FEMALE',
          email: 'chenru@qq.com'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      storeId: state => state.system.currentStore.id
    })
  },
  created () {
    if (!this.storeId) {
      this.$router.push('/login')
    }

    const convertGender = (str) => {
      switch (str) {
        case 'MALE': return '男'
        case 'FEMALE': return '女'
        default: return '未知'
      }
    }

    this.customerList.forEach(it => {
      it.gender = convertGender(it.gender)
    })
  }
}
</script>

<style scoped>

</style>
