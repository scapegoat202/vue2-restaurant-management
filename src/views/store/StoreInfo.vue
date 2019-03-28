<template>
  <el-container style="justify-content: center">
    <el-form
      ref="storeForm"
      :rules="rules"
      class="form-container"
      label-position="left"
      :model="storeForm"
      label-width="6em"
    >
      <el-form-item
        prop="name"
        label="店铺名称"
      >
        <el-input
          v-model="storeForm.name"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item
        prop="phoneNumber"
        label="手机号码"
      >
        <el-input
          v-model="storeForm.phoneNumber"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item
        prop="announcement"
        label="店铺公告"
      >
        <el-input
          v-model="storeForm.announcement"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item
        prop="workingGroup"
        label="店铺类型"
      >
        <el-input
          v-model="storeForm.workingGroup"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item label="区域">
        <el-form
          :inline="true"
          class="locale-align"
        >
          <el-form-item
            class="form-item-width"
            style="margin-right: 0"
          >
            <el-select
              v-model="storeForm.address.province"
              placeholder="省"
              :disabled="disabled"
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
          >
            <el-select
              v-model="storeForm.address.city"
              placeholder="市"
              :disabled="disabled"
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
          >
            <el-select
              v-model="storeForm.address.county"
              placeholder="县/区"
              :disabled="disabled"
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
      <el-form-item label="详细地址">
        <el-input
          v-model="storeForm.address.details"
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item class="button-align">
        <el-button
          ref="mainButton"
          type="primary"
          @click="handleClick "
        >
          {{ button.text }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import locationData from '../../data/locationData.json'
import { STORE_URL } from '../../api/constant/url'

export default {
  name: 'StoreInfo',
  components: { },
  data () {
    return {
      locationData,
      storeForm: {
        name: null,
        phoneNumber: null,
        announcement: null,
        workingGroup: null,
        address: {
          province: null,
          city: null,
          county: null,
          details: null
        }
      },
      rules: {
        name: [{ required: true, message: '必填项', trigger: 'blur' }]
      },
      disabled: true,
      button: {
        text: '编辑'
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
        return it[2] === this.storeForm.address.province
      })
    },
    countyOptions: function () {
      return _.filter(this.locationData, it => {
        return it[2] === this.storeForm.address.city
      })
    },
    provinceName: function () {
      return _.find(this.locationData, location => location[0] === this.store.address.province)[1]
    },
    cityName: function () {
      return _.find(this.locationData, location => location[0] === this.store.address.city)[1]
    },
    countyName: function () {
      return _.find(this.locationData, location => location[0] === this.store.address.county)[1]
    },
    ...mapState({
      store: state => {
        return state.system.currentStore
      },
      storeId: state => {
        return state.system.currentStore.id
      }
    })
  },
  watch: {
    'address.province': function (n, o) {
      this.address.city = null
      this.address.county = null
    },
    'address.city': function (n, o) {
      this.address.county = null
    }
  },
  created () {
    if (!this.storeId) {
      this.$router.push('/login')
    }
    Object.assign(this.storeForm, this.store)
  },
  methods: {
    handleClick () {
      this.disabled = !this.disabled
      switch (this.button.text) {
        case '编辑': {
          this.button.text = '确定'
          break
        }
        case '确定': {
          this.button.text = '编辑'
          this.$axios({
            method: 'patch',
            url: `${STORE_URL}/${this.storeId}`,
            data: this.storeForm
          })
          break
        }
      }
    }
  }
}
</script>

<style scoped>
  .form-container {
    margin: 6px;
    width: 50%;
  }
  .form-item-width {
    width: 29%;
  }
  .button-align {
    text-align: center;
  }
  .locale-align {
    display: flex;
    justify-content: space-between;
  }
</style>
