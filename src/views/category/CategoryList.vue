<template>
  <section style="height: 100%;">
    <el-table
      :data="categoryList"
      :row-key="rowKey"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="80"
        align="center"
      />
      <el-table-column
        prop="name"
        label="名称"
        width="100"
        align="center"
      />
      <el-table-column
        label="操作"
        width="300"
        align="center"
      >
        <!--suppress JSUnresolvedVariable -->
        <template v-slot="slotProp">
          <!--suppress JSUnresolvedVariable -->
          <el-button
            type="primary"
            size="mini"
            @click="handleEditClick(slotProp.row)"
          >
            <span style="font-max-size: xx-small">编辑</span>
          </el-button>

          <!--suppress JSUnresolvedVariable -->
          <el-button
            type="danger"
            size="mini"
            @click="handleDeleteClick(slotProp.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <section
      style="margin-top: 20px"
      @click="addDialogVisible = true"
    >
      <el-button
        size="mini"
        type="primary"
      >
        添加
      </el-button>
    </section>
    <el-dialog
      :show-close="false"
      :visible="editDialogVisible"
      title="编辑名称"
      width="30em"
    >
      <el-form
        label-width="3em"
        label-position="left"
      >
        <el-form-item label="名称">
          <el-input v-model="selectedCategory.name" />
        </el-form-item>
      </el-form>
      <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
      <template v-slot:footer>
        <el-button @click="editDialogVisible = false">
          确定
        </el-button>
      </template>
    </el-dialog>
    <el-dialog
      :show-close="false"
      :visible="deleteDialogVisible"
      title="删除类目"
      width="30em"
    >
      <span>是否确定删除该类目？</span>
      <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
      <template v-slot:footer>
        <el-button
          type="danger"
          @click="handleDeleteCategory"
        >
          删除
        </el-button>
        <el-button @click="deleteDialogVisible = false">
          取消
        </el-button>
      </template>
    </el-dialog>
    <el-dialog
      id="addDialog"
      :show-close="false"
      :visible="addDialogVisible"
      title="添加类目"
      width="30%"
    >
      <el-form
        ref="addDialogForm"
        :model="addCategoryForm"
        label-width="6em"
        label-position="left"
      >
        <el-form-item label="类目名称">
          <el-input v-model="addCategoryForm.name" />
        </el-form-item>
      </el-form>
      <!--suppress XmlUnboundNsPrefix, HtmlUnknownBooleanAttribute -->
      <template v-slot:footer>
        <el-button
          type="primary"
          size="mini"
          @click="handleAddCategory"
        >
          添加
        </el-button>
        <el-button
          size="mini"
          @click="addDialogVisible = false"
        >
          取消
        </el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import { CATEGORY_URL } from '../../api/constant/url'

export default {
  name: 'CategoryTable',
  data () {
    return {
      categoryList: [],
      editDialogVisible: false,
      deleteDialogVisible: false,
      addDialogVisible: false,
      selectedCategory: [],
      deleteId: 0,
      addCategoryForm: {
        name: null,
        storeId: null
      }
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
    this.$axios({
      method: 'get',
      url: `${CATEGORY_URL}?storeId=${this.storeId}`
    }).then(response => {
      switch (response.status) {
        case 200: {
          this.categoryList = response.data
          break
        }
        case 400: {
          this.$message.warning('暂无数据')
          break
        }
        default: {
          console.log(response)
          this.$message.error('预期外的错误')
        }
      }
    }).catch(e => {
      console.log(e)
      this.$notify({
        title: '未知错误',
        message: '遇到了预期之外的错误'
      })
    })
  },
  methods: {
    handleEditClick (row) {
      this.editDialogVisible = true
      this.selectedCategory = row
    },
    handleDeleteClick (row) {
      this.deleteDialogVisible = true
      this.deleteId = row.id
    },
    handleDeleteCategory () {
      this.$axios.delete(`${CATEGORY_URL}/${this.deleteId}`)
        .then(response => {
          switch (response.status) {
            case 204: {
              this.categoryList = _.filter(this.categoryList, it => it.id !== this.deleteId)
              break
            }
            default: {
              console.log(response)
              this.$message.warning('删除未成功')
            }
          }
        }).catch(e => {
          console.log(e)
          this.$message.error('删除失败，遇到了预期外的错误')
        })
      this.deleteDialogVisible = false
    },
    handleAddCategory () {
      this.$axios({
        method: 'post',
        url: `${CATEGORY_URL}?storeId=${this.storeId}`,
        data: {
          name: this.addCategoryForm.name,
          storeId: this.storeId
        }
      }).then(response => {
        if (response.status === 201) {
          this.categoryList.push(response.data)
        } else {
          console.log(response)
          this.$message.error('获取响应失败')
        }
      }).catch(e => {
        console.log(e)
        this.$message.error('遇到了预期外的错误')
      })
      this.addDialogVisible = false
    },
    rowKey (row) {
      return row.id
    }
  }
}
</script>

<style scoped>

</style>
