<template>
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
    <el-form-item label="图片">
      <el-upload
        action="http://localhost:8088/file/upload"
        name="file"
        drag
        :multiple="false"
        :limit="1"
        :on-success="onSuccess"
        :on-change="onChange"
        :on-error="onError"
        style="alignment: center"
      >
        <img
          v-if="imgUrl"
          class="image"
          :src="imgUrl"
          alt="商品图片"
        >
        <i
          v-else
          class="el-icon-plus image-uploader-icon"
        />
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleAddCommodity"
      >
        添加
      </el-button>
      <el-button
        type="warning"
        @click="handleReset"
      >
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { COMMODITY_URL } from '../../api/constant/url'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'AddCommodity',
  components: { },
  data () {
    return {
      commodityForm: {
        name: '',
        price: null,
        inventory: null,
        uuid: '',
        selectedCategories: []
      },
      rules: {
        name: [{ required: true, message: '必填项', trigger: 'blur' }],
        price: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      imgUrl: ''
    }
  },
  computed: {
    ...mapState({
      storeId: state => state.system.currentStore.id
    }),
    ...mapGetters('category', {
      availableCategories: 'allCategories'
    })
  },
  created () {
    if (!this.storeId) {
      this.$router.push('/login')
    }

    this.$store.dispatch({
      type: 'category/getAllCategories'
    })
  },
  methods: {
    handleReset () {
      this.form.name = ''
      this.form.price = null
      this.form.inventory = null
      this.form.categories = []
      this.imgUrl = ''
    },
    handleAddCommodity () {
      this.$refs['commodityForm'].validate(valid => {
        if (valid) {
          const arr = []
          this.commodityForm.selectedCategories.forEach(selectedCategoryName => {
            const result = this.availableCategories.filter(availableCategory => {
              return availableCategory.name === selectedCategoryName
            })
            if (result.length > 0) {
              result.forEach(r => {
                arr.push(r.id)
              })
            }
          })

          this.$axios({
            method: 'post',
            url: COMMODITY_URL,
            data: {
              name: this.commodityForm.name,
              price: this.commodityForm.price,
              inventory: this.commodityForm.inventory,
              storeId: this.storeId,
              imageUUID: this.commodityForm.uuid,
              categories: arr
            }
          }).then(response => {
            switch (response.status) {
              case 201: {
                this.$message.success('商品添加成功')
                this.handleReset()
                break
              }
              default: {
                console.log(response)
                this.$message.warning('商品添加失败')
              }
            }
          }).catch(e => {
            console.log(e)
            this.$message.error('遇到了预期外的错误')
          })
        }
      })
    },
    onSuccess (response, file) {
      this.imgUrl = URL.createObjectURL(file.raw)
      this.commodityForm.uuid = response
      this.$message.success('图片上传成功')
    },
    onChange (file, fileList) {
      if (fileList.length === 0) {
        this.imgUrl = ''
        this.commodityForm.uuid = null
      }
    },
    onError () {
      this.$message.error('文件上传失败')
      this.commodityForm.uuid = null
    }
  }
}
</script>

<style scoped>
  .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .image {
    height: 178px;
  }
</style>
