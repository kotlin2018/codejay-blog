import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token:'',
    username:'',
    labelId:'',
    categoryId:'',
    detailId:'',
    keyWord:'',
    currentMessageCount:0,
    tabcontroleIsShow:false
    },
  mutations: {
    SET_TOKEN(state,value) {
      state.token = value
    },
    SET_USERNAME(state,value) {
      state.username = value
    }
  }
})
// 挂载到Vue实例上
export default store;