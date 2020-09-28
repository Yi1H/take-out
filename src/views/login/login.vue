<template>
  <div class="login-container">
    <head-top :go-back="true" :head-title="loginWay? '短信登录' : '密码登录'">
    </head-top>
    <!--登录表单-->
    <form class="login-form">
      <section class="input-style">
        <input type="text" placeholder="账号" v-model.lazy="userCount">
      </section>
      <section class="input-style">
        <input v-if="!showPwd" type="password" placeholder="密码" v-model="password">
        <input v-else type="text" placeholder="密码" v-model="password">
        <div class="button-switch" @click="changePwdType" :class="{'change-to-text': showPwd}">
          <div class="circle-button" :class="{'trans-to-right': showPwd}"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input-style code-container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNum">
        <div class="img-change-img">
          <img v-show="captchasImg" :src="captchasImg" alt="">
          <div class="change-img">
            <p @click="getCaptchaCode">看不清换一张</p>
          </div>
        </div>
      </section>
    </form>
    <p class="login-tips">温馨提示：未注册过的账号，登录时将自动注册</p>
    <p class="login-tips">注册过的用户可凭账号密码登录</p>
    <div class="login-button" @click="login">
      登录
    </div>
    <alert-tip v-show="showAlert" @closeTip="closeTip" :alert-text="alertText"></alert-tip>
  </div>

</template>

<script>
  import headTop from '../../components/header/toolBar';
  import alertTip from "../../components/common/alertTip";
  import {getCaptchas, accountLogin} from "../../config/api";
  import {mapMutations} from 'vuex';

  export default {
    name: "login",
    data(){
      return {
        loginWay: false,         //默认为密码登录
        userCount: '',            //用户名
        password: '',             //账户密码
        showPwd: false,          //显示密码
        codeNum: '',             //获取输入验证码
        captchasImg: null,            //验证码地址
        alertText: '',              //警示框内容
        showAlert: false,            //警示框
        userInfo: null,           //获取到的用户信息
      }
    },
    components: {
      headTop,
      alertTip
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO'
      ]),
      changePwdType(){
        this.showPwd = !this.showPwd;
      },
      async getCaptchaCode(){
        let res = await getCaptchas();
        console.log(res);
        this.captchasImg = res.code
      },
      async login() {
        if (!this.userCount){
          this.showAlert = true;
          this.alertText = '请输入手机号/邮箱/用户名';
          return
        }else if (!this.password){
          this.showAlert = true;
          this.alertText = '请输入密码';
          return
        }else if (!this.codeNum){
          this.showAlert = true;
          this.alertText = '请输入验证码';
          return
        }
        this.userInfo = await accountLogin(this.userCount, this.password, this.codeNum);
        console.log(this.codeNum);
        if (this.userInfo.status === 0) {
          this.userInfo.username = this.userCount;
          this.userInfo.user_id = 1;
          this.userInfo.avatar = 'default.jpg'
          this.userInfo.message = '成功';
          this.userInfo.balance = 0;
          this.userInfo.gift_amount = '3';
          this.userInfo.point = 0
          this.RECORD_USERINFO(this.userInfo);
          console.log(this.$store.state);
          this.$router.go(-1);
        }
        // if (!this.userInfo.user_id) {
        //   this.showAlert = true;
        //   this.alertText = this.userInfo.message;
        //   if (!this.loginWay) this.getCaptchaCode();
        // }else{
        //   this.RECORD_USERINFO(this.userInfo);
        //   console.log(this.userInfo);
        //   this.$router.go(-1);
        // }
      },
      closeTip(){
        this.showAlert = false
      },
    },
    created() {
      this.getCaptchaCode()
    }
  }
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
  .login-container{
    padding-top: 1.95rem;
    p, span, input{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .login-form{
    background-color: #fff;
    margin-top: .6rem;
    .input-style{
      display: flex;
      justify-content: space-between;
      padding: .6rem .8rem;
      border-bottom: 1px solid #f1f1f1;
      input{
        @include sc(.7rem, #666);
      }
    }
  }
  .button-switch {
    background-color: #ccc;
    display: flex;
    justify-content: center;
    @include wh(2rem, .7rem);
    padding: 0 .2rem;
    border: 1px;
    border-radius: 0.5rem;
    position: relative;
    .circle-button{
      transition: all .3s;
      position: absolute;
      top: -0.2rem;
      z-index: 1;
      left: -0.3rem;
      @include wh(1.2rem, 1.2rem);
      box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0,0,0,.1);
      background-color: #f1f1f1;
      border-radius: 50%;
    }
    .trans-to-right{
      transform: translateX(1.3rem);
    }
    span{
      @include sc(.45rem, #fff);
      transform: translateY(.05rem);
      line-height: .6rem;
    }
    span:nth-of-type(2){
      transform: translateY(-.08rem);
    }
  }
  .change-to-text {
    background-color: $blue;
  }
  .code-container{
    height: 2.5rem;
    .img-change-img{
      display: flex;
      align-items: center;
      img{
        @include wh(3.5rem, 1.5rem);
        margin-right: .2rem;
      }
      .change-img{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        width: 2rem;
        justify-content: center;
        p{
          @include sc(.55rem, #666);
          color: #3b95e9;
          margin-top: .2rem;
        }

      }
    }
  }
  .login-tips{
    @include sc(.5rem, red);
    padding: .4rem .6rem;
    line-height: .5rem;
  }
  .login-button{
    text-align: center;
    line-height: 1.8rem;
    background-color: $blue;
    margin: 0 auto;
    border-radius: .1rem;
    @include sc(.7rem, #fff);
    @include wh(95%, 1.8rem);
  }
</style>
