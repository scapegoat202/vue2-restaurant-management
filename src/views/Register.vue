<template>
  <el-container style="align-items: center">
    <el-header><h3>扫码点单管理系统注册</h3></el-header>
    <el-main class="register-form-container">
      <el-form
        ref="registerForm"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="6em"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="form.username"
            placeholder="该用户名用于管理端登录"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="form.password"
            show-password
            placeholder="管理端密码"
          />
        </el-form-item>
        <el-form-item
          label="店铺名称"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="这里的名字将在客户端展现给顾客"
          />
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="phoneNumber"
        >
          <el-input v-model="form.phoneNumber" />
        </el-form-item>
        <el-form-item
          label="公告"
          prop="announcement"
        >
          <el-input v-model="form.announcement" />
        </el-form-item>
        <el-form-item
          label="经营类型"
          prop="workingGroup"
        >
          <el-input v-model="form.workingGroup" />
        </el-form-item>
        <el-form-item label="区域">
          <el-form
            :model="form.address"
            :inline="true"
            class="locale-align"
            :rules="addressRules"
          >
            <el-form-item
              class="form-item-width"
              style="margin-right: 0"
              prop="province"
            >
              <el-select
                v-model="form.address.province"
                placeholder="省"
              >
                <el-option
                  v-for="op in provinceOptions"
                  :key="op[0]"
                  :value="op[0]"
                  :label="op[1]"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              class="form-item-width"
              style="margin-right: 0"
              prop="city"
            >
              <el-select
                v-model="form.address.city"
                placeholder="市"
              >
                <el-option
                  v-for="op in cityOptions"
                  :key="op[0]"
                  :value="op[0]"
                  :label="op[1]"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              class="form-item-width"
              style="margin-right: 0"
              prop="county"
            >
              <el-select
                v-model="form.address.county"
                placeholder="县/区"
              >
                <el-option
                  v-for="op in countyOptions"
                  :key="op[0]"
                  :value="op[0]"
                  :label="op[1]"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item
          label="详细地址"
          prop="addressDetails"
        >
          <el-input v-model="form.address.details" />
        </el-form-item>
        <el-form-item align="center">
          <el-button
            type="primary"
            @click="validateForm('registerForm')"
          >
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import _ from 'lodash'
import hash from 'js-sha256'
import locationData from '../data/locationData.json'
import { STORE_URL } from '../api/constant/url'

export default {
  name: 'Register',
  data () {
    return {
      locationData,
      form: {
        username: '',
        password: '',
        name: '',
        phoneNumber: '',
        announcement: '',
        workingGroup: '',
        address: {
          province: '',
          city: '',
          county: '',
          details: ''
        }
      },
      rules: {
        username: [{ required: true, message: '必填项', trigger: 'blur' }],
        password: [{ required: true, message: '必填项', trigger: 'blur' }],
        name: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      addressRules: {
        province: [{ required: true, message: '必选项', trigger: 'blur' }],
        city: [{ required: true, message: '必选项', trigger: 'blur' }]
      }
    }
  },
  computed: {
    provinceOptions: function () {
      return _.filter(this.locationData, it => {
        return it[2] === '0'
      })
    },
    cityOptions: function () {
      return _.filter(this.locationData, it => {
        return it[2] === this.form.address.province
      })
    },
    countyOptions: function () {
      return _.filter(this.locationData, it => {
        return it[2] === this.form.address.city
      })
    }
  },
  watch: {
    'form.address.province': function (n, o) {
      this.form.address.city = null
      this.form.address.county = null
    },
    'form.address.city': function (n, o) {
      this.form.address.county = null
    }
  },
  methods: {
    async submitForm () {
      try {
        const response = await this.$axios({
          method: 'post',
          url: STORE_URL,
          data: {
            username: this.form.username,
            password: hash.sha256(this.form.password),
            name: this.form.name,
            phoneNumber: this.form.phoneNumber,
            announcement: this.form.announcement,
            workingGroup: this.form.workingGroup,
            address: {
              province: this.form.address.province,
              city: this.form.address.city,
              county: this.form.address.county,
              details: this.form.address.details
            }
          }
        })
        if (response.status === 201) {
          this.$notify({
            title: '注册成功',
            message: '注册成功，跳转至登录界面',
            type: 'success'
          })
          this.$router.push('/login')
        } else {
          this.$notify({
            title: '注册失败',
            message: '系统遭到了来自异次元的入侵',
            type: 'error'
          })
        }
      } catch (e) {
        this.$notify({
          title: '注册失败',
          message: '系统遇到了来自预期之外的错误',
          type: 'error'
        })
      }
    },
    validateForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitForm()
        }
      })
    }
  }
}
</script>

<style scoped>
.register-form-container {
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 40%;
}
.form-item-width {
  width: 30%;
}
.locale-align {
  display: flex;
  justify-content: space-between;
}
</style>
