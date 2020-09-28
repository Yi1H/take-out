<template>
  <div>
    <head-top>
      <span slot="logo" class="head-top" @click="reload">ele.me</span>
    </head-top>
    <nav class="city-nav">
      <div class="city-tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + cityGuessId" class="guess-city">
        <span>{{cityGuess}}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          <svg viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
        </svg>
      </router-link>
    </nav>
    <section class="hot-city-container">
      <h4 class="city-title">热门城市</h4>
      <ul class="city-list clear">
        <router-link v-for="item in cityHot" :to="'/city/'  + item.id" tag="li">{{item.name}}</router-link>
      </ul>
    </section>
    <section class="group-city-container">
      <ul class="letter-classify">
        <li v-for="(value, key, index) in sortGroupCity" class="letter-classify-li">
          <h4 class="city-title">
            {{key}}
            <span v-if="index === 0">(按字母顺序排列)</span>
          </h4>
          <ul class="city-list clear">
            <router-link tag="li"  v-for="item in value" :to="'/city/' + item.id" class="ellipsis">
              {{item.name}}
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import headTop from '../../components/header/toolBar'
  import {guessCity, hotCity, groupCity} from '../../config/api'

  export default {
    name: "home",
    data() {
      return {
        cityGuess: '',  //当前城市
        cityGuessId: '', //当前城市id
        cityHot: [],  //热门城市
        cityGroup: {}, //所有城市
      }
    },
    mounted() {
      //获取当前城市
      guessCity().then(res => {
        this.cityGuess = res.name;
        this.cityGuessId = res.id;
      })
      //获取热门城市
      hotCity().then(res => {
        this.cityHot = res
      })
      //获取所有城市
      groupCity().then(res => {
        this.cityGroup = res;
        // console.log(String.fromCharCode(65));
      })
    },
    components: {
      headTop
    },
    computed:{
      //将获取到的数据从A-Z字母开头顺序排列
      sortGroupCity() {
        let sortObj = {};
        for (let i = 65; i<=90; i++){
          if (this.cityGroup[String.fromCharCode(i)]){
            sortObj[String.fromCharCode(i)] = this.cityGroup[String.fromCharCode(i)];
          }
        }
        // console.log(sortObj);
        return sortObj
      }
    },
    methods: {
      //点击刷新页面
      reload() {
        window.location.reload();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .head-top{
    left: 0.4rem;
    font-weight: 400;
    @include sc(0.7rem, #fff);
    @include wh(2.3rem, 0.7rem);
    @include ct;
    font-size: 0.7rem;
  }
  .city-nav{
    padding-top: 2.45rem;
    border-top: 1px solid $bc;
    background-color: #fff;
    margin-bottom: 0.4rem;

    .city-tip {
      @include fj;
      line-height: 1.45rem;
      padding: 0 0.45rem;

      span:nth-of-type(1) {
        @include sc(0.55rem, #666)
      }

      span:nth-of-type(2) {
        font-weight: 900;
        @include sc(0.47rem, #9f9f9f)
      }
    }

    .guess-city {
      @include fj;
      align-items: center;
      height: 1.8rem;
      padding: 0 0.45rem;
      border-top: 1px solid $bc;
      border-bottom: 2px solid $bc;
      @include font(0.75rem, 1.8rem);

      span:nth-of-type(1) {
        color: $blue;
      }

      .arrow_right {
        @include wh(.6rem, .6rem);
        fill: #999;
      }
    }
  }
  .hot-city-container{
    background-color: #fff;
    margin-bottom: 0.45rem;
  }
  .city-title{
    color: #666;
    font-weight: 400;
    text-indent: 0.45rem;
    border-top: 2px solid $bc;
    border-bottom: 1px solid $bc;
    @include font(0.55rem, 1.45rem, 'Helvetica Neue')
  }
  .city-list{
    li{
      float: left;
      text-align: center;
      color: $blue;
      border-bottom: 0.03rem solid $bc;
      border-right: 0.03rem solid $bc;
      @include wh(25%, 1.75rem);
      @include font(0.6rem, 1.75rem);
    }
  }
  .letter-classify-li{
    margin-bottom: 0.4rem;
    background: #fff;
    border-bottom: 1px solid $bc;
    ul{
      li{
        color: #666;
      }
    }
  }
</style>
