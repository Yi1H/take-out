<template>
  <div class="profile-container">
    <tool-bar go-back="true" head-title="我的"></tool-bar>
    <section class="profile-num">
      <div class="profile-link">
        <img :src="imageBaseUrl + avatar" alt="" class="private-Img" v-if="userInfo&&userInfo.user_id">
        <span class="private-Img" v-else>
        <svg class="private-Img-svg">
          <<svg viewBox="0 0 122 122" id="avatar-default"><path fill="#DCDCDC" fill-rule="evenodd" d="M61 121.5c33.413 0 60.5-27.087 60.5-60.5S94.413.5 61 .5.5 27.587.5 61s27.087 60.5 60.5 60.5zm12.526-45.806c-.019 3.316-.108 6.052.237 9.825 3.286 8.749 18.816 9.407 28.468 17.891-1.833 1.998-6.768 6.788-15 10.848-7.02 3.463-16.838 6.416-24.831 6.416-17.366 0-32.764-7.149-42.919-17.264 9.713-8.407 25.49-9.173 28.769-17.891.345-3.773.258-6.509.24-9.825l-.004-.002c-1.903-.985-5.438-7.268-6.01-12.571-1.492-.12-3.843-1.561-4.534-7.247-.37-3.053 1.107-4.77 2.004-5.31-5.046-19.212 1.507-33.16 20.749-34.406 5.753 0 10.18 1.52 11.909 4.523 15.35 2.702 11.756 22.658 9.328 29.882.899.54 2.376 2.258 2.004 5.31-.689 5.687-3.042 7.127-4.534 7.248-.575 5.305-3.25 10.82-5.873 12.57l-.003.003zM61 120.5C28.14 120.5 1.5 93.86 1.5 61S28.14 1.5 61 1.5s59.5 26.64 59.5 59.5-26.64 59.5-59.5 59.5z"></path></svg>
        </svg>
         </span>
        <div class="user-info">
          <p>{{username}}</p>
          <p>
            <span class="user-icon">
              <svg class="icon-mobile" viewBox="0 0 655 1024" id="mobile"><path d="M0 122.501v778.998C0 968.946 55.189 1024 123.268 1024h408.824c68.52 0 123.268-54.846 123.268-122.501V122.501C655.36 55.054 600.171 0 532.092 0H123.268C54.748 0 0 54.846 0 122.501zM327.68 942.08c-22.622 0-40.96-18.338-40.96-40.96s18.338-40.96 40.96-40.96 40.96 18.338 40.96 40.96-18.338 40.96-40.96 40.96zM81.92 163.84h491.52V819.2H81.92V163.84z"></path></svg>
            </span>
            <span class="mobile-phone">{{mobile}}</span>
          </p>
        </div>
        <span class="arrow">
          <svg viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
        </span>
      </div>
    </section>
    <section class="info-data">
      <ul class="clear">
        <router-link to="/home" class="info-data-link">
          <span class="info-data-top"><b>{{parseInt(balance).toFixed(2)}}</b>元</span>
          <span class="info-data-bottom">我的余额</span>
        </router-link>
        <router-link to="/home" class="info-data-link">
          <span class="info-data-top"><b>{{count}}</b>个</span>
          <span class="info-data-bottom">我的优惠</span>
        </router-link>
        <router-link to="/home" class="info-data-link">
          <span class="info-data-top"><b>{{pointNumber}}</b>分</span>
          <span class="info-data-bottom">我的积分</span>
        </router-link>
      </ul>
    </section>
    <section class="profile-fun">
      <!--我的订单-->
      <div class="my-fun">
        <aside>
          <svg fill="#4aa5f0">
            <svg data-v-617269a8="" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 38 38" id="order"><g data-v-617269a8="" fill="none" fill-rule="evenodd"><use data-v-617269a8="" stroke="#666" stroke-width="4" mask="url(#order-regular.41c17f8_b)" xlink:href="#order-regular.41c17f8_a"></use><rect data-v-617269a8="" width="24" height="2" x="7" y="8" fill="#666" rx="1"></rect><rect data-v-617269a8="" width="20" height="2" x="7" y="17" fill="#666" rx="1"></rect><rect data-v-617269a8="" width="8" height="2" x="7" y="26" fill="#666" rx="1"></rect></g></svg>
          </svg>
        </aside>
        <div class="my-fun-con">
          <span>我的订单</span>
          <span class="my-fun-con-svg">
            <svg fill="#bbb">
              <svg viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
            </svg>
          </span>
        </div>
      </div>
      <!--积分商城-->
      <div class="my-fun">
        <aside>
          <svg fill="#fc7b53">
            <svg viewBox="0 0 40 40" id="point"><path d="M34.6 7.1c0-1.1-1-2.1-2.1-2.1h-24c-1.1 0-2 1-2.1 2.1l-1.6 25C4.6 34.3 6.3 36 8.5 36h24c2.2 0 3.9-1.7 3.7-3.9l-1.6-25zm-5.9 6.1c-.2 4.6-3.7 8.2-8.3 8.2-4.6 0-8.2-3.7-8.4-8.3-.3-.2-.5-.6-.5-1 0-.7.6-1.2 1.3-1.2s1.3.6 1.3 1.2c0 .5-.3.9-.7 1.1.2 3.8 3.2 6.8 7.1 6.8 3.9 0 6.8-3.1 7-6.9-.4-.2-.6-.6-.6-1.1 0-.7.6-1.2 1.3-1.2s1.3.6 1.3 1.2c-.2.6-.4 1-.8 1.2z"></path></svg>
          </svg>
        </aside>
        <div class="my-fun-con">
          <span>积分商城</span>
          <span class="my-fun-con-svg">
            <svg fill="#bbb">
             <svg viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
            </svg>
          </span>
        </div>
      </div>
      <!--会员卡-->
      <div class="my-fun">
        <aside>
          <svg fill="#fc7b53">
            <svg viewBox="0 0 40 40" id="vip"><path d="M7 33.4c0 1.1.9 1.6 2 1.6h22c1.1 0 2-.5 2-1.6V31H7v2.4z"></path><path d="M32.1 14.3c-.6 2.3-2.6 4-5.1 4-2.9 0-5.3-2.3-5.3-5.2v-.2c-.5.2-1 .3-1.6.3-.6 0-1.1-.1-1.7-.3v.2c0 2.9-2.4 5.2-5.3 5.2-2.5 0-4.6-1.7-5.1-4.1-.5.4-1.2.6-1.8.6-.3 0-.5.1-.8 0L7.2 29h26l1.7-14.2c-.3.1-.5.1-.8.1-.8 0-1.5-.2-2-.6z" class="st0"></path><ellipse cx="20.1" cy="8.2" rx="3.2" ry="3.2"></ellipse><ellipse cx="6.4" cy="10.5" rx="2.4" ry="2.4"></ellipse><ellipse cx="33.8" cy="10.5" rx="2.4" ry="2.4"></ellipse></svg>
          </svg>
        </aside>
        <div class="my-fun-con">
          <span>会员卡</span>
          <span class="my-fun-con-svg">
            <svg fill="#bbb">
             <svg viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
            </svg>
          </span>
        </div>
      </div>
    </section>
    <section class="profile-fun">
      <!--服务中心-->
      <div class="my-fun">
        <aside>
          <svg fill="#4aa5f0">
            <svg data-v-617269a8="" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 38 38" id="order"><g data-v-617269a8="" fill="none" fill-rule="evenodd"><use data-v-617269a8="" stroke="#666" stroke-width="4" mask="url(#order-regular.41c17f8_b)" xlink:href="#order-regular.41c17f8_a"></use><rect data-v-617269a8="" width="24" height="2" x="7" y="8" fill="#666" rx="1"></rect><rect data-v-617269a8="" width="20" height="2" x="7" y="17" fill="#666" rx="1"></rect><rect data-v-617269a8="" width="8" height="2" x="7" y="26" fill="#666" rx="1"></rect></g></svg>
          </svg>
        </aside>
        <div class="my-fun-con">
          <span>服务中心</span>
          <span class="my-fun-con-svg">
            <svg fill="#bbb">
              <svg viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
            </svg>
          </span>
        </div>
      </div>
      <!--下载APP-->
      <div class="my-fun">
        <aside>
          <svg fill="#4aa5f0">
            <svg viewBox="0 0 40 40" id="service"><g id="service_XMLID_1_"><path id="service_XMLID_6_" d="M32.2 9.5c-.2-.7-.1-.7-.4-.9-1.7-1.2-5.3.2-6.7 1.9-.8-3.8-3.8-6.1-4.7-5.9-.9-.2-4 2.1-4.8 5.9-1.3-1.7-5-3.1-6.7-1.9-.1.1-.5.6-.5.7C5.4 20.7 15 24.6 19 25.7v8.7c0 .7.3 1.2 1 1.2s1-.5 1-1.2v-8.6c4-1 14.2-4.8 11.2-16.3z"></path><path id="service_XMLID_7_" d="M6 25c-.9 0-1.6.7-1.6 1.5.1.8.7 1.5 1.6 1.5 3.1 0 6.5 1.5 8.5 3.7.3.3.7.6 1.1.6.4 0 .7-.1 1-.4.6-.6.6-1.6.1-2.3C14.1 26.8 10 25 6 25z"></path><path id="service_XMLID_8_" d="M34.6 25c-4 0-8.1 1.9-10.7 4.6-.6.6-.5 1.6.1 2.2.3.3.7.4 1 .4.4 0 .8-.3 1.1-.6 2-2.1 5.3-3.7 8.4-3.7h.1c.8 0 1.5-.7 1.5-1.5 0-.7-.7-1.4-1.5-1.4z"></path></g><path d="M0 0h40v40H0z" class="st1"></path></svg>
          </svg>
        </aside>
        <div class="my-fun-con">
          <span>下载APP</span>
          <span class="my-fun-con-svg">
            <svg fill="#bbb">
              <svg viewBox="0 0 1024 1024" id="arrow-right" class="icon"><path d="M716.298 417.341l-.01.01L307.702 7.23l-94.295 94.649 408.591 410.117-408.591 410.137 94.295 94.639 502.891-504.76z" class="selected"></path></svg>
            </svg>
          </span>
        </div>
      </div>
    </section>
    <footer-guide></footer-guide>
  </div>
</template>

<script>
  import toolBar from "../../components/header/toolBar";
  import footerGuide from "../../components/footer/footerGuide";
  import {mapState} from 'vuex';

  export default {
    name: "profile",
    data() {
      return {
        imageBaseUrl: 'https://elm.cangdu.org/img/',       //默认地址
        avatar: '',                                       //头像地址
        username: '',                                      //用户名
        mobile: '',                                          //手机号码
        balance: 0,                                        //用户余额
        count: 0,                                        //优惠券数量
        pointNumber: 0,                                  //积分
      }
    },
    computed: {
      ...mapState([
          'userInfo'
      ])
    },
    components: {
      toolBar,
      footerGuide
    },
    methods: {
      initData() {
        if (this.userInfo && this.userInfo.user_id) {
          this.avatar = this.userInfo.avatar;
          this.username = this.userInfo.username;
          this.mobile = this.userInfo.mobile || '暂无绑定手机号';
          this.balance = this.userInfo.balance;
          this.count = this.userInfo.gift_amount;
          this.pointNumber = this.userInfo.point;
        }else{
          this.username = '登录/注册';
          this.mobile = '暂无绑定手机号';
        }
      }
    },
    created() {
      console.log(this.userInfo);
      this.initData()
    }
  }
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
  .profile-container{
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .profile-num{
    padding-top: 1.95rem;
    .profile-link{
      display: flex;
      align-items: center;
      background-color: $blue;
      padding: 0.65rem 0.6rem;
      .private-Img{
        display: inline-block;
        @include wh(2.5rem, 2.5rem);
        border-radius: 50%;
        vertical-align:middle;
        .private-Img-svg{
          background:$fc;
          border-radius:50%;
          @include wh(2.5rem,2.5rem);
        }
      }
      .user-info{
        flex-grow: 1;
        margin-left: .48rem;
        p{
          font-weight:700;
          @include sc(.8rem,$fc);
          .user-icon{
            @include wh(.5rem, .5rem);
            display: inline-block;
            vertical-align: center;
            line-height: 0.75rem;
            .icon-mobile{
              @include wh(100%,100%);
            }
          }
          .mobile-phone{
            display:inline-block;
            @include sc(.57rem,$fc);
          }
        }
      }
      .arrow{
        @include wh(.46667rem,.98rem);
        display:inline-block;
        svg{
          fill: rgb(255,255,255);
          @include wh(100%,100%);
        }
      }
    }
  }
  .info-data{
    width: 100%;
    background: $fc;
    box-sizing: border-box;
    .info-data-link {
      float: left;
      width: 33.33%;
      display: inline-block;
      border-right: 1px solid #f1f1f1;
      span{
        display:block;
        width:100%;
        text-align:center;
      }
      .info-data-top{
        @include sc(.55rem,#333);
        padding: .853333rem 0 .453333rem;
        b{
          display:inline-block;
          @include sc(1.2rem,#f90);
          font-weight:700;
          line-height:1rem;
          font-family: Helvetica Neue,Tahoma;
        }
      }
      .info-data-bottom{
        @include sc(.57333rem,#666);
        font-weight:400;
        padding-bottom:.453333rem;
      }
    }
    .info-data-link:nth-of-type(2){
      .info-data-top{
        b{
          color:#ff5f3e;
        }
      }
    }
    .info-data-link:nth-of-type(3){
      border:0;
      .info-data-top{
        b{
          color:#6ac20b;
        }
      }
    }
  }
  .profile-fun{
    margin-top: .4rem;
    background-color: $fc;
    .my-fun{
      padding-left: 1.6rem;
      display: flex;
      align-items: center;
      aside{
        @include wh(.7rem, .7rem);
        margin-left: -.8rem;
        margin-right:.28rem;
        display:flex;
        align-items: center;
        svg{
          @include wh(100%, 100%);
        }
      }
      .my-fun-con{
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: .43rem .26rem .43rem 0;
        @include sc(.7rem, #333);
        display: flex;
        justify-content: space-between;
        span{
          display: block;
        }
        .my-fun-con-svg{
          @include wh(.46667rem,.466667rem);
          svg{
            @include wh(100%,100%);
          }
        }
      }

    }
  }

</style>
