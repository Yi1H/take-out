import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geohash: '11',      //地址geohash值
    latitude: '0',     // 当前位置纬度
    longitude: '1',    // 当前位置经度
    userInfo: '',      //用户信息
    login: '',         //是否登录
  },
  mutations,
  actions: {
  },
  modules: {
  }
})
