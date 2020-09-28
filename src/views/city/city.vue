<template>
  <div class="city-container">
    <head-top :head-title="headTitle" go-back="true">
      <router-link slot="changeCity" to="/home" class="change-city">切换城市</router-link>
    </head-top>
    <form v-on:submit.prevent class="city-form">
      <div>
        <label>
          <input type='search' name='city' placeholder='输入学校、商务楼、地址' class='city-input input-style' required v-model='inputValue'>
        </label>
        <input type='submit' name='submit' value='提交' class='city-submit input-style' @click='postAdd'>
      </div>
    </form>
    <header v-if="historyTitle" class="search-history">搜索历史</header>
    <ul class="getAdd-ul">
      <li v-for="(item, index) in placeList" @click="setPageStore(index, item.geohash)">
        <h4 class="postAdd-name ellipsis">{{item.name}}</h4>
        <p class="postAdd-add ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <footer v-if="historyTitle&&placeList.length" class="clear-all-history" @click="clearAll">清空所有</footer>
    <div v-if="placeNone" class="search-none-place">很抱歉，没有搜索结果</div>
  </div>
</template>

<script>
  import {currentCity} from '../../config/api';
  import headTop from '../../components/header/toolBar';
  import {searchPlace} from "../../config/api";
  import {setStore, getStore, removeStore} from "../../config/util";

  export default {
    name: 'city',
    data(){
      return {
        cityId : '',  //当前城市id
        headTitle: '', //当前城市的名字
        inputValue: '',  //搜索地址
        placeList: [],  //搜索的城市列表
        historyTitle: true,  //搜索历史头部
        placeNone: false,   //搜索无结果时显示提示信息
        placeHistory: []    //历史搜索记录
      }
    },
    components: {
      headTop
    },
    methods: {
      initData(){
        if (getStore('placeHistory')){
          this.placeList = JSON.parse(getStore('placeHistory'))
        }else{
          this.placeList = []
        }
      },
      postAdd(){
        if (this.inputValue){
          searchPlace(this.cityId, this.inputValue).then(res => {
            this.historyTitle = false
            this.placeList = res;
            console.log(this.placeList);
            this.placeNone = !res.length;
          })
        }
      },
      setPageStore(index, geohash){
        let history = getStore('placeHistory');
        let choosePlace = this.placeList[index];
        if (history){
          let check = false;
          this.placeHistory = JSON.parse(history);
          this.placeHistory.forEach(item => {
            if (item.geohash === geohash){
              check = true
            }
          })
          if (!check){
            this.placeHistory.push(choosePlace)
          }
        }else {
          this.placeHistory.push = choosePlace
        }
        setStore('placeHistory', this.placeHistory);
        this.$router.push({path:'/msite', query:{geohash}})
      },
      clearAll() {
        removeStore('placeHistory');
        this.initData()
      }
    },
    mounted() {
      this.cityId = this.$route.params.cityId;
      currentCity(this.cityId).then(res => {
        this.headTitle = res.name
      });
      this.initData()
    }
  }
</script>

<style lang='scss' scoped>
  @import '../../style/mixin';

  .city-container {
    padding-top: 2.4rem;
  }

  .change-city {
    right: 0.4rem;
    @include sc(0.6rem, #fff);
    @include ct;
  }

  .city-form {
    background-color: #fff;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-top: 0.4rem;
    div{
      width: 90%;
      margin: 0 auto;
      text-align: center;
      .input-style{
        border-radius: 0.1rem;
        margin-bottom: 0.4rem;
        @include wh(100%, 1.4rem);
      }
      .city-input{
        padding: 0 0.3rem;
        border: 1px solid $bc;
        @include sc(0.65rem, #333);
      }
      .city-submit{
        background-color: $blue;
        @include sc(0.65rem, #fff);
      }
    }
  }
  .search-history{
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-left: 0.5rem;
    @include font(0.475rem, 0.8rem);
  }
  .search-none-place{
    margin: 0 auto;
    @include font(0.65rem, 1.75rem);
    color: #333;
    background-color: #fff;
    text-indent: 0.5rem;
  }
  .getAdd-ul{
    background-color: #fff;
    border-top: 1px solid $bc;
    li{
      margin: 0 auto;
      padding-top: 0.65rem;
      border-bottom: 1px solid $bc;
      .postAdd-name{
        margin: 0 auto 0.35rem;
        width: 90%;
        @include sc(0.65rem, #333);
      }
      .postAdd-add{
        width: 90%;
        margin: 0 auto 0.55rem;
        @include sc(0.45rem, #999);
      }
    }
  }
  .clear-all-history{
    @include sc(0.7rem, #666);
    text-align: center;
    line-height: 2rem;
    background-color: #fff;
  }
</style>
