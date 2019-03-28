<template>
  <el-table :data="orderList">
    <el-table-column
      prop="id"
      label="ID"
      align="center"
      width="70"
    />
    <el-table-column
      label="顾客"
      align="center"
    >
      <el-table-column
        prop="customer.name"
        align="center"
        label="姓名"
        :width="70"
      />
      <el-table-column
        prop="customer.gender"
        align="center"
        label="性别"
        :width="70"
      />
    </el-table-column>
    <el-table-column
      prop="amount"
      label="金额"
      align="center"
      :width="70"
    />
    <el-table-column
      prop="tableNumber"
      label="桌号"
      align="center"
      :width="70"
    />
    <el-table-column
      prop="timeCreated"
      label="时间"
      align="center"
      :width="170"
    />
    <el-table-column
      prop="orderStatus"
      label="状态"
      width="70"
    />
    <el-table-column
      prop="orderItems"
      label="商品"
    >
      <!--suppress JSUnresolvedVariable -->
      <template v-slot="slotProp">
        <!--suppress JSUnresolvedVariable -->
        <el-tag
          v-for="item in slotProp.row.orderItems"
          :key="item.id"
        >
          {{ `${item.commodity.name} * ${item.amount}` }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from 'vuex'
import { ORDER_URL } from '../../api/constant/url'

export default {
  name: 'OrderList',
  components: { },
  data () {
    return {
      orderList: []
    }
  },
  computed: {
    ...mapState({
      storeId: state => state.system.currentStore.id
    })
  },
  watch: {
    orderList: function () {
      const convertGender = (str) => {
        switch (str) {
          case 'MALE': return '男'
          case 'FEMALE': return '女'
          default: return '未知'
        }
      }

      const convertOrderStatus = (str) => {
        switch (str) {
          case 'FINISHED': return '已完成'
          case 'SUBMITTED': return '待处理'
          case 'CANCELED': return '已取消'
          default: return '未知状态'
        }
      }

      this.orderList.forEach(order => {
        Object.assign(order.customer, { ...order.customer, gender: convertGender(order.customer.gender) })
        Object.assign(order, { ...order, orderStatus: convertOrderStatus(order.orderStatus) })
      })
    }
  },
  created () {
    if (!this.storeId) {
      this.$router.push('/login')
    }

    this.$axios({
      method: 'get',
      url: `${ORDER_URL}?storeId=${this.storeId}`
    }).then(response => {
      switch (response.status) {
        case 200: {
          this.orderList = response.data
          break
        }
        default: {
          console.log(response)
          this.$message.warning('获取数据失败')
        }
      }
    }).catch(e => {
      console.log(e)
      this.$message.error('遇到了预期外的错误')
    })
  }
}
</script>

<style scoped>

</style>
