<template>
  <div id="head-top">
    <!--主界面顶部插槽-->
    <slot name="logo"></slot>

    <!--商铺列表页搜索-->
    <slot name="search"></slot>
    <!--商铺列表页城市-->
    <slot name="msite-title"></slot>
    <!--登录|注册-->
    <router-link to="/login" v-if="sign" class="head-login">
      <svg class="user-avatar" v-if="userInfo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
      </svg>
      <span class="login-span" v-else>登录|注册</span>
    </router-link>

    <!--顶部返回-->
    <section class="head-goBack" v-if="goBack" @click="$router.go(-1)">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </section>
    <!--当前城市-->
    <section class="city-title ellipsis" v-if="headTitle">
      <span class="city-text ellipsis">{{headTitle}}</span>
    </section>
    <!--城市界面顶部插槽-->
    <slot name="changeCity"></slot>

  </div>
</template>

<script>
  export default {
    name: "toolbar",
    data(){
      return {
        userInfo: false,
      }
    },
    props: {
      headTitle: {
        type: String,
        default: ''
      },
      goBack: {
        default: false
      },
      sign: {
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  #head-top {
    background-color: $blue;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    @include wh(100%, 1.95rem)
  }
  .head-goBack{
    left: 0.4rem;
    @include wh(0.6rem, 1rem);
    line-height: 2.2rem;
    margin-left: .4rem;
  }

  .city-title {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .city-text {
      @include sc(0.8rem, #fff);
      font-weight: bold;
    }
  }

  .head-login{
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login-span{
      color: #fff;
    }
    .user-avatar{
      fill: #fff;
      @include wh(.8rem, .8rem);
    }
  }
</style>
