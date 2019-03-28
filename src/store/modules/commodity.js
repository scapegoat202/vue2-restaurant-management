import axios from 'axios'
import _ from 'lodash'
import { COMMODITY_URL } from '../../api/constant/url'

const state = {
  allCommodities: []
}

const getters = {
  allCommodities: (state) => state.allCommodities,
  storeId: (state, getters, rootState) => {
    return rootState.system.currentStore.id
  }
}

const mutations = {
  setAllCommodities: (state, { commodities }) => {
    state.allCommodities = commodities
  },
  updateCommodity: (state, { modifiedCommodity }) => {
    _.filter(state.allCommodities, commodity => {
      return commodity.id === modifiedCommodity.id
    }).forEach(commodity => {
      Object.assign(commodity, modifiedCommodity)
    })
  },
  deleteCommodity: (state, { commodityId }) => {
    state.allCommodities = _.filter(state.allCommodities, it => it.id !== commodityId)
  }
}

const actions = {
  getAllCommodities: ({ commit, getters }) => {
    axios({
      method: 'get',
      url: `${COMMODITY_URL}?storeId=${getters.storeId}`
    }).then(response => {
      if (response.status === 200) {
        commit({
          type: 'setAllCommodities',
          commodities: response.data
        })
      } else {
        console.log('something went wrong while make GET request to /commodities')
        console.log(response)
      }
    }).catch(e => {
      console.log('something went wrong while make GET request to /commodities')
      console.log(e)
    })
  },
  updateCommodity: ({ commit, getters }, { commodityId, form }) => {
    axios({
      method: 'patch',
      url: `${COMMODITY_URL}/${commodityId}`,
      data: form
    }).then(response => {
      if (response.status === 201) {
        commit({
          type: 'updateCommodity',
          modifiedCommodity: response.data
        })
      } else {
        console.log('something went wrong while make PATCH request to /commodities')
        console.log(response)
      }
    }).catch(e => {
      console.log('something went wrong while make GET PATCH to /commodities')
      console.log(e)
    })
  },
  deleteCommodity: ({ commit }, { commodityId }) => {
    axios({
      method: 'patch',
      url: `${COMMODITY_URL}/${commodityId}`,
      data: {
        status: 'DELETED'
      }
    }).then(response => {
      if (response.status === 201) {
        commit({
          type: 'deleteCommodity',
          commodityId: commodityId
        })
      } else {
        console.log('something went wrong while make PATCH request to /commodities')
        console.log(response)
      }
    }).catch(e => {
      console.log('something went wrong while make PATCH request to /commodities')
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
