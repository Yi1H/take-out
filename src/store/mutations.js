import {
  SAVE_GEOHASH,
  RECORD_ADDRESS,
  RECORD_USERINFO
} from "./mutation-types";
import {setStore, getStore} from "../config/util";

export default {
  //保存gehash
  [SAVE_GEOHASH](state, geohash){
    state.geohash = geohash;
  },
  //保存当前地址信息
  [RECORD_ADDRESS](state, {latitude, longitude}){
    state.latitude = latitude;
    state.longitude = longitude
  },
  //保存用户信息
  [RECORD_USERINFO] (state, info){
    state.userInfo = info;
    state.login = true;
    setStore('user-id', info.userId);
  }
}
