<template>
  <el-container style="align-items: center">
    <el-header>
      <h3>扫码点单管理系统登录</h3>
    </el-header>
    <el-main class="login-form-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        label-width="5em"
      >
        <el-form-item
          prop="username"
          label="用户名"
        >
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
          >
            用户名：
          </el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
        >
          <el-input
            v-model="loginForm.password"
            show-password
            type="password  "
            placeholder="密码"
          >
            密码：
          </el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button
            type="primary"
            @click="handleLoginClick"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import hash from 'js-sha256'
import { AUTH_LOGIN_URL, STORE_URL } from '../api/constant/url'
import { SYSTEM_ACTION_SET_CURRENT_STORE } from '../api/constant/actionType'

export default {
  components: { },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '必填项', trigger: 'blur' }],
        password: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLoginClick () {
      this.$refs['loginForm'].validate(async valid => {
        if (valid) {
          try {
            const validationResponse = await this.$axios({
              method: 'post',
              url: AUTH_LOGIN_URL,
              data: {
                username: this.loginForm.username,
                password: hash.sha256(this.loginForm.password)
              }
            })
            if (validationResponse.data === true) {
              try {
                /* Get store data */
                const storeResponse = await this.$axios({
                  method: 'get',
                  url: `${STORE_URL}?username=${this.loginForm.username}`
                })
                if (storeResponse.status === 200) {
                  /* dispatch setCurrentStore action */
                  this.$store.dispatch({
                    type: SYSTEM_ACTION_SET_CURRENT_STORE,
                    store: storeResponse.data
                  })

                  /* notify user */
                  this.$notify({
                    title: '登录成功',
                    message: '跳转至管理界面',
                    type: 'success'
                  })
                  this.$router.push('/home')
                } else {
                  console.log(storeResponse)
                  this.$message.error('获取响应失败')
                }
              } catch (e) {
                console.log(e)
                this.$notify({
                  title: '登录失败',
                  message: '系统遭到了来自异次元的入侵',
                  type: 'error'
                })
              }
            } else {
              console.log(validationResponse)
              this.$notify({
                title: '登录失败',
                message: '系统遭到了来自异次元的入侵',
                type: 'error'
              })
            }
          } catch (e) {
            this.$notify({
              title: '登录失败',
              message: '系统遭到了来自异次元的入侵',
              type: 'error'
            })
            console.log(e)
          }
        }
      })
    }
  }
}
</script>

<style>
.login-form-container {
  margin: 40px;
  padding: 40px;
  justify-content: center;
  align-items: center;
}
</style>
