<template>
  <el-container>
    <el-table
      :data="commodities"
      style="height: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        width="80"
        prop="id"
        label="ID"
        align="center"
      />
      <el-table-column
        width="120"
        prop="name"
        label="名称"
        align="center"
      />
      <el-table-column
        width="100"
        prop="price"
        label="价格"
        align="center"
      />
      <el-table-column
        width="100"
        prop="inventory"
        label="库存"
        align="center"
      />
      <el-table-column
        width="250"
        label="所属类别"
        prop="categories"
        align="center"
      >
        <template v-slot="{row}">
          <el-tag
            v-for="category in row.categories"
            :key="category.id"
          >
            {{ category.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template v-slot="{row}">
          <el-button
            type="primary"
            @click="handleEditClick(row)"
          >
            编辑
          </el-button>
          <el-button
            type="warning"
            @click="handleMiddleButtonClick(row)"
          >
            {{ row.status === 'NORMAL'? '下架':'上架' }}
          </el-button>
          <el-button
            type="danger"
            @click="handleDeleteClick(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible="editDialogVisible"
      :show-close="false"
      width="30em"
    >
      <el-form
        ref="commodityForm"
        label-width="4em"
        label-position="left"
        :model="commodityForm"
        :rules="rules"
      >
        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input
            v-model="commodityForm.name"
            type="text"
          />
        </el-form-item>
        <el-form-item
          label="价格"
          prop="price"
        >
          <el-input
            v-model="commodityForm.price"
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="库存"
          prop="inventory"
        >
          <el-input
            v-model="commodityForm.inventory"
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="类别"
          prop="categories"
        >
          <el-checkbox-group v-model="commodityForm.selectedCategories">
            <el-checkbox
              v-for="category in availableCategories"
              :key="category.id"
              :label="category.name"
            />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleEditConfirm"
          >
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      width="20em"
      :show-close="false"
      :visible="deleteDialogVisible"
    >
      <span>是否确定删除?</span>
      <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
      <template v-slot:footer>
        <el-button
          type="danger"
          @click="handleDeleteConfirm"
        >
          确定
        </el-button>
        <el-button @click="handleDeleteCancel">
          取消
        </el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'CommodityList',
  data () {
    return {
      editDialogVisible: false,
      deleteDialogVisible: false,
      commodityForm: {
        name: null,
        price: null,
        inventory: null,
        selectedCategories: []
      },
      editingCommodityId: null,
      rules: {
        name: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState({
      storeId: state => state.system.currentStore.id
    }),
    ...mapGetters('category', {
      availableCategories: 'allCategories'
    }),
    ...mapGetters('commodity', {
      commodities: 'allCommodities'
    })
  },
  created () {
    if (!this.storeId) {
      this.$router.push('/login')
    }

    this.$store.dispatch({
      type: 'category/getAllCategories'
    })

    this.$store.dispatch(({
      type: 'commodity/getAllCommodities'
    }))
  },
  methods: {
    handleEditClick (commodity) {
      this.editDialogVisible = true
      Object.assign(this.commodityForm, { ...commodity, selectedCategories: _.map(commodity.categories, it => it.name) })
      this.editingCommodityId = commodity.id
    },
    handleEditConfirm () {
      this.editDialogVisible = false
      this.$refs['commodityForm'].validate(valid => {
        if (valid) {
          const arr = []

          _.forEach(this.availableCategories, category => {
            _.forEach(this.commodityForm.selectedCategories, selected => {
              if (category.name === selected) {
                arr.push(category.id)
              }
            })
          })

          console.log(arr)

          const form = Object.assign({}, { ...this.commodityForm, categories: arr })
          this.$store.dispatch({
            type: 'commodity/updateCommodity',
            commodityId: this.editingCommodityId,
            form
          })
        }
      })
    },
    handleMiddleButtonClick (commodity) {
      if (commodity.status === 'NORMAL') {
        this.handleRemoveCommodity(commodity)
      } else {
        this.handleRestoreCommodity(commodity)
      }
    },
    handleRemoveCommodity (commodity) {
      this.$store.dispatch({
        type: 'commodity/updateCommodity',
        commodityId: commodity.id,
        form: {
          status: 'NOT_SELLING'
        }
      })
    },
    handleRestoreCommodity (commodity) {
      this.$store.dispatch({
        type: 'commodity/updateCommodity',
        commodityId: commodity.id,
        form: {
          status: 'NORMAL'
        }
      })
    },
    handleDeleteClick (commodity) {
      this.deleteDialogVisible = true
      this.editingCommodityId = commodity.id
    },
    handleDeleteConfirm () {
      this.$store.dispatch({
        type: 'commodity/deleteCommodity',
        commodityId: this.editingCommodityId
      })
      this.deleteDialogVisible = false
    },
    handleDeleteCancel () {
      this.deleteDialogVisible = false
    },
    tableRowClassName ({ row }) {
      if (row.status === 'NOT_SELLING') {
        return 'not-selling-row'
      }
      return ''
    }
  }
}
</script>

<style>
.not-selling-row {
  background: #fdf5e6;
  color: crimson;
}
</style>
