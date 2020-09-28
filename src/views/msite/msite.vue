<template>
  <div>
    <!--顶部导航-->
    <head-top sign="msite">
      <router-link to="/home" class="link-search" slot="search" >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite-title">
        <span class="title-text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <!--食品分类-->
    <nav class="msite-nav" >
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide food-container" v-for="(item, index) in foodTypes">
            <router-link to="/home" class="link-food" v-for="foodItems in item">
              <figure>
                <img :src="imageBaseUrl + foodItems.image_url" alt="">
                <figcaption>{{foodItems.title}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <img src="../../assets/images/fl.svg" class="loading-failure animation_opactiy" alt="" v-else>
    </nav>
    <!--商家列表-->
    <div class="shop-list-container">
      <header class="shop-head">
        <svg class="shop-icon">
          <svg viewBox="0 0 32 31" id="shop"><g fill-rule="evenodd"><path d="M28.232 1.822C27.905.728 26.97.152 25.759.152H5.588c-1.252 0-1.867.411-2.397 1.415l-.101.243-.443 1.434-.975 3.154-.002.007C.837 9.101.294 10.854.26 10.956l-.059.259c-.231 1.787.337 3.349 1.59 4.448 1.159 1.017 2.545 1.384 3.865 1.384.07 0 .07 0 .132-.002-.01.001-.01.001.061.002 1.32 0 2.706-.367 3.865-1.384a4.96 4.96 0 0 0 .413-.407l-1.043-.946-1.056.931c1.033 1.171 2.51 1.792 4.21 1.801.04.002.088.004.173.004 1.32 0 2.706-.367 3.865-1.384.148-.13.287-.267.418-.411l-1.044-.944-1.057.93c1.033 1.174 2.511 1.796 4.213 1.806.04.002.088.004.173.004 1.32 0 2.706-.367 3.865-1.384.15-.131.29-.27.422-.416l-1.046-.943-1.058.929c1.033 1.177 2.513 1.801 4.218 1.811.04.002.088.004.173.004 1.32 0 2.706-.367 3.865-1.384 1.206-1.058 1.858-2.812 1.676-4.426-.069-.61-.535-2.207-1.354-4.785l-.109-.342a327.554 327.554 0 0 0-1.295-3.966l-.122-.366.014.043h.004zm-2.684.85l.12.361.318.962c.329.999.658 2.011.965 2.973l.108.338c.719 2.262 1.203 3.92 1.24 4.249.08.711-.233 1.553-.735 1.993-.553.485-1.308.685-2.008.685l-.098-.002c-.987-.007-1.695-.306-2.177-.854l-1.044-1.189-1.06 1.175a2.192 2.192 0 0 1-.188.185c-.553.485-1.308.685-2.008.685l-.098-.002c-.985-.007-1.693-.305-2.174-.852l-1.043-1.185-1.059 1.171c-.058.064-.12.125-.186.183-.553.485-1.308.685-2.008.685l-.098-.002c-.984-.007-1.692-.304-2.173-.85L9.101 12.2l-1.058 1.166a2.248 2.248 0 0 1-.184.181c-.553.485-1.307.685-2.008.685l-.061-.001-.131.001c-.701 0-1.455-.2-2.008-.685-.538-.472-.767-1.102-.654-1.971l-1.396-.18 1.338.44c.043-.13.552-1.775 1.425-4.599l.002-.007.975-3.155.443-1.434-1.345-.415 1.245.658c.054-.102.042-.085-.083-.001-.122.082-.143.086-.009.086H25.763c.053 0-.164-.133-.225-.339l.014.043-.004-.001zM5.528 19.48c.778 0 1.408.63 1.408 1.408v7.424a1.408 1.408 0 1 1-2.816 0v-7.424c0-.778.63-1.408 1.408-1.408z"></path> <path d="M.28 29.72c0-.707.58-1.28 1.277-1.28h28.155a1.28 1.28 0 0 1 .007 2.56H1.561A1.278 1.278 0 0 1 .28 29.72z"></path> <path d="M26.008 19.48c.778 0 1.408.63 1.408 1.408v7.424a1.408 1.408 0 1 1-2.816 0v-7.424c0-.778.63-1.408 1.408-1.408z"></path></g></svg>
        </svg>
        <span class="shop-title">附近商家</span>
      </header>
      <shop-list></shop-list>
    </div>
    <!--底部导航-->
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import headTop from "../../components/header/toolBar";
  import shopList from "../../components/common/shopList";
  import {msiteAddress, guessCity, msiteFood, shopMsg} from "../../config/api";
  import footGuide from "../../components/footer/footerGuide"
  import '../../style/swiper.min.css';
  import '../../assets/plugins/swiper.min'

  export default {
    name: "msite",
    data(){
      return {
        geohash: '',                                   //city界面传递过来的geohash（经纬度）
        msiteTitle: 'address',                         //当前经纬度地址
        foodTypes: [],                                 //食品分类列表
        imageBaseUrl: 'https://fuss10.elemecdn.com',   //图片域名地址
      }
    },
    components: {
      headTop,
      footGuide,
      shopList
    },
    methods: {
      ...mapMutations([
          'SAVE_GEOHASH', 'RECORD_ADDRESS'
      ])
    },
    async beforeMount() {
      //当没有获取到geohash时从默认位置获取
      if (!this.$route.query.geohash){
        const add = await guessCity();
        this.geohash = add.latitude + add.longitude;
      }else {
        this.geohash = this.$route.query.geohash
      }
      //保存当前geohash
      this.SAVE_GEOHASH(this.geohash);
      //获取位置信息
      let res = await msiteAddress(this.geohash);
      this.msiteTitle = res.name;
      //记录当前经纬度
      this.RECORD_ADDRESS({latitude:res.latitude, longitude:res.longitude});
    },
    mounted() {
      //获取msite页面食品分类列表
      msiteFood(this.geohash).then(res => {
        let resLength = res.length;
        let foodArr = [];
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = res.splice(0, 8);
        }
        this.foodTypes = foodArr;
        console.log(foodArr);
      }).then(() => {
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: true
        });
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/mixin.scss";
  @import "../../style/swiper.min.css";
  .link-search{
    left: .8rem;
    @include wh(.9rem, .9rem);
    @include ct
  }
  .msite-title{
    @include center;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title-text{
      @include sc(.8rem, #fff);
      text-align: center;
      display: block;
    }
  }
  .msite-nav{
    padding-top: 2.1rem;
    height: 10.6rem;
    background-color: #fff;
    margin-bottom:  0.025rem solid $bc;
    .swiper-container{
      @include wh(100%, auto);
      padding-bottom: 0.6rem;
      .swiper-pagination{
        bottom: 0.3rem;
      }
    }
  }
  .food-container{
    display: flex;
    flex-wrap: wrap;
    .link-food{
      width: 25%;
      padding: 0.3rem 0;
      @include fj(center);
      figure{
        img{
          margin-bottom: 0.3rem;
          @include wh(1.8rem, 1.8rem);
        }
        figcaption{
          text-align: center;
          @include sc(0.55rem, #666);
        }
      }
    }
    .loading-failure{
      @include wh(100%, 100%)
    }
  }
  .shop-list-container{
    margin-top: .4rem;
    border-top: 0.03rem solid #e4e4e4;
    background: #fff;
    .shop-head{
      .shop-icon{
        fill: #999;
        margin: 0 .6rem;
        vertical-align: middle;
        @include wh(.6rem, .6rem);
      }
      .shop-title{
        color: #999;
        @include font(.55rem, 1.6rem)
      }
    }
  }
</style>
