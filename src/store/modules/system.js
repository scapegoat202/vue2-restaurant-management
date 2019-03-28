import axios from 'axios'
import { STORE_URL } from '../../api/constant/url'
import {
  SYSTEM_MUTATION_REVERSE_LOGIN_STATUS,
  SYSTEM_MUTATION_UPDATE_CURRENT_STORE, SYSTEM_MUTATION_SET_LOGIN_STATUS
} from '../../api/constant/mutationType'

const state = {
  currentStore: {
    id: null,
    username: null,
    name: null,
    phoneNumber: null,
    announcement: null,
    workingGroup: null,
    address: {
      province: null,
      city: null,
      townshipOrStreet: null,
      details: null
    }
  },
  isLoggedIn: false
}

const mutations = {
  [SYSTEM_MUTATION_UPDATE_CURRENT_STORE]: (state, payload) => {
    Object.assign(state.currentStore, payload.store)
  },
  [SYSTEM_MUTATION_REVERSE_LOGIN_STATUS]: (state) => {
    state.isLoggedIn = !state.isLoggedIn
  },
  [SYSTEM_MUTATION_SET_LOGIN_STATUS]: (state, payload) => {
    state.isLoggedIn = payload.isLoggedIn
  }
}

const actions = {
  getCurrentStore: async ({ commit, state }) => {
    const response = await axios.get(`${STORE_URL}/${state.currentStoreId}`)
    commit({
      type: SYSTEM_MUTATION_UPDATE_CURRENT_STORE,
      store: response.data
    })
  },
  setCurrentStore: ({ commit, state }, payload) => {
    window.localStorage.setItem('currentStore', JSON.stringify(payload.store))
    commit({
      type: SYSTEM_MUTATION_UPDATE_CURRENT_STORE,
      store: payload.store
    })
  },
  setLoginStatus: ({ commit, state }, payload) => {
    window.localStorage.setItem('isLoggedIn', JSON.stringify(payload.isLoggedIn))
    commit({
      type: SYSTEM_MUTATION_SET_LOGIN_STATUS,
      idLoggedIn: payload.isLoggedIn
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
