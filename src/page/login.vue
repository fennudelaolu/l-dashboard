<template>
    <div class="login-view">

    <!--<svg id="testsvg" width="200" height="200"></svg>-->
    <div class="top">
      <div class="left">
        <div class="back">

          <div class="title">
            <img class="img-gear" src="/static/img/login/gear.png" height="133" width="133"/>
            <img  :src="0" height="170" width="545"/>
            <div style="display:inline-block;height:170px;font-size:30px;color:#fff;line-height: 300px;position: relative;top:-42px;">
              {{}}
            </div>
            <!--<div class="subhead">-->
            <!--一台专门为您定制的计算机-->
            <!--</div>-->

          </div>

          <img class="backimg" src="/static/img/login/backimg.png" height="130" width="1428"/></div>
      </div>
      <div class="right">

        <div class="box">
          <svg xmlns="http://www.w3.org/2000/svg" class="backsvg" width="460" height="700"  viewBox="0 0 460 700"

          >
            <g stroke="#3FA9F5" stroke-miterlimit="10">
              <path fill="none" d="M384.9 2.5h-48.4M457.5 75c0-1-.4-1.9-1.1-2.6L387.6 3.6c-.7-.7-1.7-1.1-2.7-1.1"/>
              <path fill="#FFF" d="M457.5 123.4V75"/>
              <circle cx="338" cy="2.5" r="2.2" fill="#FFF" stroke-width=".5"/>
              <circle cx="457.5" cy="121.5" r="2.2" fill="#FFF" stroke-width=".5"/>
              <path fill="#3FA9F5" d="M435.7 79.2l-55-55m51.9 52c-.8.9-.7 2.3.2 3.1.8.7 2 .7 2.9 0 .9-.9.9-2.2 0-3.1-.8-.9-2.2-1-3.1-.1v.1zm-48.8-49c.8-.9.7-2.3-.2-3.1-.8-.7-2-.7-2.9 0-.9.9-.9 2.2 0 3.1.8.9 2.2 1 3.1.1v-.1z"/>
              <g>
                <path fill="none" d="M123.6 2.5H75.1M75.1 2.5c-1 0-2 .4-2.7 1.1L3.6 72.3C2.9 73 2.5 74 2.5 75"/>
                <path fill="#FFF" d="M2.5 75v48.4"/>
                <circle cx="122.1" cy="2.4" r="2.2" fill="#FFF" stroke-width=".5"/>
                <circle cx="2.5" cy="121.5" r="2.2" fill="#FFF" stroke-width=".5"/>
                <path fill="#3FA9F5" d="M79.4 24.1l-55 55m3-3s0-.1 0 0c-1-.9-2.4-.8-3.2.1-.9.9-.9 2.2 0 3.1.8.7 2 .7 2.9 0 1-.8 1.1-2.2.3-3.2zm48.8-48.8c1 .9 2.4.8 3.2-.1.9-.9.9-2.2 0-3.1-.8-.7-2-.7-2.9 0-.9.8-1.1 2.1-.3 3.2z"/>
              </g>
            </g>
            <g stroke="#3FA9F5" stroke-miterlimit="10">
              <path fill="none" d="M336.4 697.8h48.4M384.9 697.8c1 0 2-.4 2.7-1.1l68.9-68.8c.7-.7 1.1-1.6 1.1-2.6"/>
              <path fill="#FFF" d="M457.5 625.3v-48.4"/>
              <circle cx="338" cy="697.8" r="2.2" fill="#FFF" stroke-width=".5"/>
              <circle cx="457.5" cy="578.7" r="2.2" fill="#FFF" stroke-width=".5"/>
              <path fill="#3FA9F5" d="M380.6 676.1l55-55m-3 3.1c1 .9 2.4.8 3.2-.1.9-.9.9-2.2 0-3.1-.8-.7-2-.7-2.9 0-.9.8-1 2.2-.3 3.2zM383.8 673c-1-.9-2.4-.8-3.2.1-.9.9-.9 2.2 0 3.1.8.7 2 .7 2.9 0 1-.8 1.1-2.2.3-3.2z"/>
              <g>
                <path fill="none" d="M75.1 697.8h48.4M2.5 625.3c0 1 .4 1.9 1.1 2.6l68.9 68.8c.7.7 1.7 1.1 2.7 1.1"/>
                <path fill="#FFF" d="M2.5 576.8v48.4"/>
                <circle cx="122.1" cy="697.8" r="2.2" fill="#FFF" stroke-width=".5"/>
                <circle cx="2.5" cy="578.7" r="2.2" fill="#FFF" stroke-width=".5"/>
                <path fill="#3FA9F5" d="M24.3 621.1l55 55m-51.9-52c.8-.9.7-2.3-.2-3.1-.8-.7-2-.7-2.9 0-.9.9-.9 2.2 0 3.1.8.9 2.2 1 3.1.1v-.1zm48.8 49c-.8.9-.7 2.3.2 3.1.8.7 2 .7 2.9 0 .9-.9.9-2.2 0-3.1-.8-.9-2.2-1-3.1-.1v.1z"/>
              </g>
            </g>

          </svg>
          <div class="form">
            <p class="title ">登 录</p>
            <div class="input_row input1">
              <span class="input-left"></span>
              <input  type="text"
                      @keyup="key_login"
                      :style="username===''||username==='账号'?'color:#99CCFF':'color:black'"
                      @blur="username===''||username==='账号'?username='账号':''"
                      @focus="username===''||username==='账号'?username='':''"
                      v-model="username" >
              <span class="input-right"></span>

            </div>
            <div class="input_row input2">
              <span class="input-left"></span>
              <input  type="password" @keyup="key_login"
                      :style="password===''||password==='密码'?'color:#99CCFF':'color:black'"
                      @blur="password===''||password==='密码'?password='密码':''"
                      @focus="password===''||password==='密码'?password='':''"
                      v-model="password">
              <span class="input-right"></span>

            </div>

            <div class="input_row">
              <div  @click="login" class="login-button">
                <span v-if="login_loading" class="spin"></span>
                登录
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    <div class="bottom">

      ©2015-2018 SinoCBD
    </div>

      <Modal
                title="登陆失败"
                v-model="notfounduser"
                :mask-closable="false"
                :closable="false">
            <p v-text="erro_msg"></p>

        </Modal>
  </div>
</template>

<script>

    import Input from 'iview/src/components/input/input'
    import {getUSER_TOKEN, setUSER_TOKEN} from '../config/mUtils'
    import {LOGIN_API, RESULT_CODE} from '../server/api'

    export default {
        components: {Input},

        data() {
            return {
                username: '账号',
                password: '密码',
                login_loading: false,

                notfounduser: false,
                erro_msg: '',
            }
        },
        methods: {
            key_login($event){
                if ($event.keyCode == 13) {
                    this.login();
                }
            },
            async login() {
                if(this.login_loading){return }

                let data = {
                    login_name: this.username,
                    password: this.password,
                };

                this.login_loading = true;
                let r = await LOGIN_API.login(data);
                this.login_loading = false;

                if(r.data.code == 200){
                  this.$store.commit('user', r.data.data);
                  this.$router.push({name: '首页'})
                }else{
                  this.erro_msg = '用户名或密码错误';
                  this.notfounduser = true;
                }

            },

        },
        mounted() {
        },
        computed:{
          info(){
            return this.$store.getters.user || {}
          }
        }
    }
</script>

<style scoped lang="scss">



  $left_width: calc(100% - 600px);
  $right_width: 595px;
  $top_height:925px;
  $bottom_height:120px;

  html,body,#app {
    font-family: "微软雅黑";
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }

  .login-view{
      width: 100%;
      height:100%;
      min-width:1440px;
      min-height:768px;
      .top{
          width: 100%;
          height:$top_height;

          .left{
            display: inline-block;
            width: $left_width;
            height:$top_height;
            overflow: hidden;
            padding: 40px;


            border-right: 1px solid #C2E0FF ;

            .back{
              width: 100%;
              height:100%;
              border: 1px solid #2369A6;
              overflow: hidden;
              background:rgba(10,88,156, .9);
              border-radius: 5px;

              .title{
                margin: 200px auto;
                width:750px;
                height:314px;

                .img-gear{
                  margin-bottom: 15px;
                  -webkit-animation: rotate_z 3000s -1s infinite ;
                }

                .subhead{
                  width: 678px;
                  height:40px;
                  text-align: right;
                  line-height: 40px;
                  color:#fff;
                  font-size: 25px;
                }
              }

              .backimg{
                position: relative;
                bottom: 0px;
              }
            }
          }
          .right{
            display: inline-block;
            width: $right_width;
            height:100%;

            .box{
              position: relative;
              top:95px;
              left:95px;
              width: 460px;
              height:700px;

              div,span,svg{position:absolute;}

              .backsvg{
                top:0;
                left:0;

                -moz-animation:animation_backsvg 1s ;
                -webkit-animation:animation_backsvg 6s infinite ease ;
              }

              .form{
                $text_color: #1976D2;
                $input_border: 2px solid #3FA9F5;
                $input_border_radius:3px;

                width: 360px;
                height:440px;
                position:absolute;
                top:0;
                left:50px;
                padding-top:120px;

                .title{
                  font-weight: bold ;
                  font-size:36px;
                  color:$text_color;
                  text-align:center;
                }

                .input1{
                  margin-top: 120px;
                }
                .input2{
                  margin-top: 184px;
                }
                .input_row{
                  $input_row_height:32px;
                  width:100%;;
                  height:$input_row_height;


                  input { text-align: center;
                    height:$input_row_height;
                    width: 96%;
                    border: 0px;
                    outline:none;
                    font-size: 14px;
                  }
                  .input-left,.input-right{

                    width: 15px;
                    height:$input_row_height;
                    border:$input_border;

                    transition: 1s;
                  }
                  .input-left {
                    border-right: 0px;
                    border-bottom-left-radius: $input_border_radius;
                    border-top-left-radius: $input_border_radius;
                  }
                  .input-right {
                    border-left: 0px;
                    border-bottom-right-radius: $input_border_radius;
                    border-top-right-radius: $input_border_radius;
                  }

                  .login-button{
                    top: 296px;

                    width:100%;
                    height:50px;
                    line-height: 50px;
                    text-align: center;
                    color:$text_color;
                    font-size: 16px;

                    cursor: pointer;

                    border: $input_border ;
                    border-radius: $input_border_radius;

                    .spin{
                      left:135px;
                      top:15px;

                      width: 20px;
                      height:20px;

                      border-radius: 100%;
                      border:3px solid rgba(255,255,255,.2);
                      border-right:3px solid #5ea2e4;

                      -webkit-animation: fadeOut 1s infinite ease-in-out;
                    }
                    @-webkit-keyframes fadeOut {
                      from {transform: rotate(0deg);}
                      to {transform: rotate(350deg);}
                    }


                  }
                  .login-button:hover{
                    border-color: #1976D2;
                  }
                  .login-button:active{
                    border-width: 3px;
                    line-height: 48px;
                    font-weight: bold ;
                  }

                }
                .input_row:hover {
                  .input-left{
                    transform: translateX(-10px);
                  }

                }
                .input_row:hover {
                  .input-right{
                    transform: translateX(10px);
                  }
                }


              }
            }

          }
          @-webkit-keyframes  animation_backsvg{
            0%{
              -moz-transform: scale(1) ;
              -webkit-transform: scale(1) ;
            }
            25%{

              -moz-transform: scale(0.9) ;
              -webkit-transform: scale(0.9) ;
            }
            75%{
              -moz-transform: scale(1) ;
              -webkit-transform: scale(1) ;
            }
            100%{
              -moz-transform: scale(0.9) ;
              -webkit-transform: scale(0.9) ;
            }
          }
          @-webkit-keyframes  rotate_z{
          from{
            -webkit-transform:rotateZ(0deg);

          }

          to{
            -webkit-transform:rotateZ(113600deg);
          }
        }

      }

      .bottom{
        width: 100%;
        height:$bottom_height ;
        background:#F2F2F2 ;

        font-size: 15px;
        line-height:$bottom_height ;
        text-align: center;
        color: black;

      }

  }


/*  @media screen and (min-width:$fs-breakpoint) {
    font-size:$fs-font-size;
  }*/

</style>


