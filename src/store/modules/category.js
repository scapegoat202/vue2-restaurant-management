import axios from 'axios'
import { CATEGORY_URL } from '../../api/constant/url'

const state = {
  allCategories: []
}

const getters = {
  allCategories: (state) => state.allCategories,
  storeId: (state, getters, rootState) => {
    return rootState.system.currentStore.id
  }

}

const mutations = {
  setAllCategories: (state, { categories }) => {
    state.allCategories = categories
  }
}

const actions = {
  getAllCategories: ({ commit, getters }) => {
    axios({
      method: 'get',
      url: `${CATEGORY_URL}?storeId=${getters.storeId}`
    }).then(response => {
      if (response.status === 200) {
        commit('setAllCategories', { categories: response.data })
      } else {
        console.log('something went wrong while make GET request to /categories')
        console.log(response)
      }
    }).catch(e => {
      console.log('something went wrong while make GET request to /categories')
      console.log(e)
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
