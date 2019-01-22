<template>
    <div class="layout">
      <header class="layout-header">
        <a href="" class="logo1">
          <div class="logo1-img">
            <svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
              <!-- Generator: Sketch 3.8.3 (29802) - http://www.bohemiancoding.com/sketch -->
              <title>logo-mini</title>
              <desc>Created with Sketch.</desc>
              <defs/>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="logo-mini" fill="#fff">
                  <path d="M7.960199,12.3 L7.960199,10.3 L5.97014925,10.3 L5.97014925,1.9 C5.97014925,1.9 7.79854752,1.89999985 10.0497512,1.9 C12.8358209,1.90000019 18.0099502,4.3 18.0099502,10 C18.0099502,15.7 12.8358209,18 10.0497512,18 L3.9800995,18 L3.9800995,20 L10.0497512,20 C15.5451219,20 20,15.8 20,10 C20,4.2 15.5451219,0 10.0497512,0 L3.9800995,0 L3.9800995,12.3 L7.960199,12.3 L7.960199,12.3 Z" id="data"/>
                  <path d="M0,16.2 L0,3.8 L1.99004975,3.8 L1.99004975,14.1837398 L8.15920398,14.1837398 L10.0497512,14.1837398 C12.3337089,14.1281679 14.1771811,12.2573576 14.2288557,9.9495935 C14.1771811,7.6418347 12.3337089,5.87183211 10.0497512,5.81626016 L7.960199,5.81626016 L7.960199,3.8 L10.0497512,3.8 C13.4063684,3.8 16.119403,6.55326798 16.119403,9.9495935 C16.119403,13.3459243 13.4063684,16.0991923 10.0497512,16.2 L8.15920398,16.2 L0,16.2 L0,16.2 Z" id="you"/>
                </g>
              </g>
            </svg>
          </div>
          <div class="logo1-title"> XX有数</div>
        </a>
        <ul class="frame-nav">

          <!--<li class="frame-nav-left" @click="goPage('图表列表')">图表</li>-->

          <li class="frame-nav-left" @click="goPage('大屏幕列表')">大屏幕</li>
          <li class="frame-nav-left" @click="goPage('数据表')">数据表</li>
        </ul>
        <ul class="frame-nav">

          <li class="frame-dropdown">

              <div @click="logout" class="frame-dropdown-rel" >
                {{user.email}}
                <M_Icon style="position: relative;top: 5px;"  type="#icon_exit"  :size="18" :color="'#fff'"  ></M_Icon>
              </div>



          </li>
          <li class="frame-dropdown">
            <div @click="logout" class="frame-dropdown-rel" >

            </div>
          </li>
        </ul>
      </header>

      <section class="layout-section">
        <router-view></router-view>
      </section>
    </div>
</template>

<script>
  import {LOGIN_API} from '../server/api'

    export default {
      name: "layout",
      components:{

      },
      data(){
        return {
        }
      },
      mounted(){

      },
      methods:{
        logout(){
          LOGIN_API.logout();
        },
        goPage(name){
          this.$router.push({ name, params: {  }})
        }
      },
      computed:{
        user(){
          let user = this.$store.getters[this.$store_type.USER] || {}
          return user
        }
      }
    }
</script>


<style lang="scss"  >
  @import '../../src/style/mixin';
  //
  .logo1{
    @include size(224px,auto);

    padding: 20px 0 20px 20px;
    float: left;

    display: inline-flex;

    text-decoration:none;
    color:#fff;

    &-img{
      @include size(32px,100%);
    }
    &-title{
      line-height: 1;
      font-size: 20px;
    }
  }

  //导航
  .frame-nav{
    display: block;

    &-left{
      padding:23px 16px ;
      float: left;
      cursor:pointer;

      &:hover{
        border-bottom: 3px solid $color_blue0;
        background-color: black;
        padding-bottom: 20px;
      }
    }

  }

 //导航下拉菜单
  .frame-dropdown {
    position: relative;
    float:right;
    display: inline-block;
    cursor: pointer;
  }
  .frame-dropdown:hover {

    .frame-dropdown-rel {
      background-color: black;
    }
    .frame-dropdown-menu {
      display: block;
    }
  }

  .frame-dropdown-rel {
    padding:20px 16px ;
    text-align: center;
    color: #fff;

  }

  .frame-dropdown-menu {
    display: none;
    position: absolute;
    top: 64px;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ccc;
    color: black;
    @include border-radius(3px);
    @include shadow(1px, 1px, 5px, #ccc);
  }

  .frame-dropdown-item {
    padding: 8px 25px;

  }

  .frame-dropdown-item:hover {
    background-color: #aaa;
    @include opacity(0.2);
  }

</style>
