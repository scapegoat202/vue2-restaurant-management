<template>
  <el-table
    :data="orderList"
  >
    <el-table-column
      prop="tableNumber"
      label="桌号"
      width="100"
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
          {{ `${item.commodity.name} * ${item.commodityAmount}` }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="timeCreated"
      label="时间"
      :width="100"
    />
    <el-table-column
      prop="moneyAmount"
      label="金额"
      :width="100"
    />
    <el-table-column
      label="操作"
      :width="150"
    >
      <template>
        <el-button
          size="mini"
          type="primary"
        >
          处理
        </el-button>
        <el-button
          size="mini"
          type="danger"
        >
          取消
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PendingOrders',
  components: { },
  data () {
    return {
      orderList: [
        {
          id: 5,
          orderItems: [
            {
              id: 4,
              commodity: {
                id: 3,
                name: '果粒奶优',
                price: 4.00,
                categories: [
                  {
                    id: 2,
                    name: '饮料'
                  }
                ]
              },
              commodityAmount: 2
            },
            {
              commodity: {
                name: '卡布奇诺'
              },
              commodityAmount: 3
            }
          ],
          timeCreated: '15:26',
          moneyAmount: 8.00,
          tableNumber: 4,
          customer: {
            id: 0,
            name: '吴斌',
            gender: 'MALE'
          },
          orderStatus: 'COMPLETED'
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
  }
}
</script>

<style scoped>

</style>
