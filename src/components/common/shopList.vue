<template>
  <div class="ship-list-container">
    <ul v-if="shopList.length">
      <router-link to="/home" v-for="item in shopList" tag="li" class="shop-li">
        <!--商铺图像-->
        <section>
          <img :src="imageBaseUrl + item.image_path" alt="" class="shop-img">
        </section>
        <!--商铺信息-->
        <hgroup class="shop-msg">
          <!--商铺基本信息-->
          <header class="shop-detail">
            <h4 :class="item.is_premium? 'premium' : ''" class="shop-title ellipsis">{{item.name}}</h4>
            <ul class="shop-detail-ul">
              <li v-for="item in item.supports" class="supports">{{item.icon_name}}</li>
            </ul>
          </header>
          <!--商铺评分订单信息-->
          <h5 class="rating-order-num">
            <section class="rating-order-left">
              <section class="rating-section">
                <span class="rating-num">评分：{{item.rating}}</span>
              </section>
              <section class="order-section">
                月售{{item.recent_order_num}}单
              </section>
            </section>
            <section class="rating-order-right">
              <span class="delivery-style delivery-left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
              <span class="delivery-style delivery-right" v-if="onTime(item.supports)">准时达</span>
            </section>
          </h5>
          <!--费用、距离-->
          <h5 class="fee-distance">
            <p class="fee">
              ¥{{item.float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </p>
            <p class="distance-time">
							<span v-if="Number(item.distance)">{{item.distance >1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
								<span class="segmentation">/</span>
							</span>
              <span v-else>{{item.distance}}</span>
              <span class="segmentation">/</span>
              <span class="order-time">{{item.order_lead_time}}</span>
            </p>
          </h5>
        </hgroup>
      </router-link>
    </ul>
    <ul v-else class="no-shop-data">
      <li v-for="item in 10" class="no-shop-data-li">
        <img src="../../assets/images/shopback.svg" class="no-shop-data-svg">
      </li>
    </ul>
    <p v-if="touched" class="empty-data">没有更多数据</p>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {shopMsg} from "../../config/api";
  import loading from '../../components/common/loading'

  export default {
    name: "shopList",
    data(){
      return {
        shopList: [],                                       //商铺信息列表
        imageBaseUrl: 'https://elm.cangdu.org/img/',        //图片域名地址
        touched: false,                                     //没有更多数据
        showLoading: true,                                   //显示加载动画
      }
    },
    components: {
      loading
    },
    computed: {
      ...mapState([
        'latitude','longitude'
      ])
    },
    methods: {
      async initData() {
        //发送请求获取商店数据
        let res = await shopMsg(this.latitude, this.longitude, 100, 19);
        this.shopList = [...res];
        // console.log(res);
        if (res.length<20){
          this.touched = true;
        }
        this.showLoading = false;
      },
      onTime(supports){
        let timeStatus;
        if ((supports instanceof Array) && supports.length) {
          supports.forEach(item => {
            if (item.icon_name === '准') {
              timeStatus = true;
            }
          })
        }else{
          timeStatus = false;
        }
        return timeStatus
      }
    },
    mounted() {
      this.initData();
    }
  }
</script>

<style lang="scss" scoped>
@import "../../style/mixin";

  .ship-list-container {
    background-color: #fff;
    margin-bottom: 2rem;
  }

  .shop-li {
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: .7rem .4rem;
  }

  .shop-img {
    @include wh(2.7rem, 2.7rem);
    display: block;
    margin-right: .4rem;
  }

  .shop-msg{
    flex: auto;
    .shop-detail{
      @include fj;
      align-items: center;
      .shop-title{
        width: 8.5rem;
        color: #333;
        padding-top: .01rem;
        @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
        font-weight: 700;
      }
      .premium::before{
        content: '品牌';
        display: inline-block;
        font-size: 0.5rem;
        line-height: .6rem;
        color: #333;
        background-color: #ffd930;
        padding: 0 0.1rem;
        border-radius: 0.1rem;
        margin-right: 0.2rem;
      }
      .shop-detail-ul{
        display: flex;
        transform: scale(.8);
        margin-right: -0.3rem;
        .supports{
          @include sc(0.5rem, #999);
          border: 0.025rem solid #f1f1f1;
          padding: 0 0.04rem;
          border-radius: 0.08rem;
          margin-left: 0.05rem;
        }
      }
    }
    .rating-order-num {
      @include fj(space-between);
      height: 0.6rem;
      margin-top: 0.52rem;
      .rating-order-left{
        @include fj(flex-start);
        .rating-section{
          display: flex;
          .rating-num{
            @include sc(0.4rem, #ff6000);
            margin: 0 0.2rem;
          }
        }
        .order-section{
          transform: scale(.8);
          margin-left: -0.2rem;
          @include sc(0.4rem, #666);
        }
      }
      .rating-order-right{
        display: flex;
        align-items: center;
        transform: scale(.7);
        min-width: 5rem;
        justify-content: flex-end;
        margin-right: -0.8rem;
        .delivery-style{
          font-size: 0.4rem;
          padding: 0.04rem 0.08rem 0;
          border-radius: 0.08rem;
          margin-left: 0.08rem;
          border: 1px;
        }
        .delivery-left{
          color: #fff;
          background-color: $blue;
          border: 0.025rem solid $blue;
        }
        .delivery-right{
          color: $blue;
          border: 0.025rem solid $blue;
        }
      }
    }
    .fee-distance {
      margin-top: 0.52rem;
      @include fj;
      @include sc(0.5rem, #333);
      .fee {
        transform: scale(.9);
        @include sc(0.5rem, #666);
      }
      .distance-time{
        transform: scale(.9);
        span{
          color: #999;
        }
        .order-time{
          color: $blue;
        }
        .segmentation{
          color: #ccc;
        }
      }
    }
  }

  .no-shop-data-li{
    height: 4.85rem;
    .no-shop-data-svg{
      @include wh(100%, 100%)
    }
  }

  .empty-data{
    @include sc(0.5rem, #666);
    text-align: center;
    line-height: 2rem;
  }
</style>
