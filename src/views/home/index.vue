<template>
  <el-container class="home-container">
    <el-aside class="my-aside" :width="collapse?'64px':'200px'">
        <div class="logo" :class="{colse:collapse}"></div>
        <el-menu
        router
        style="border-right: none;"
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        :collapse-transition="false">
         <!-- el-submenu 有下一级菜单的容器 -->
        <!-- el-menu-item 没有有下一级菜单的容器 -->
        <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
        </el-menu-item>
    </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="toggleMenu"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown style="float:right" @command="handleCommand">
          <span class="el-dropdown-link">
            <img style="vertical-align:middle" width="30" height="30" :src="avatar" alt="">
            <b style="vertical-align:middle;padding-left:5px">{{name}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">推出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由显示的位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      collapse: false,
      avatar: '',
      name: ''
    }
  },
  created () {
    // 拿去用户数据并渲染到页面
    const user = JSON.parse(window.sessionStorage.getItem('hm74-toutiao'))
    this.avatar = user.photo
    this.name = user.name
    // 绑定提交用户名称的事件
    eventBus.$on('updateHeaderName', (name) => {
      this.name = name
    })
    eventBus.$on('updateHeaderPhoto', (url) => {
      this.avatar = url
    })
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    // 1.使用的是click事件，DOM的原生事件。
    // 2.此时给自定义组件el-dropdown-item绑定了一个原生事件
    // 3.组件解析过后 这个标签是不存在 事件绑定无效
    // 4.事件修饰符：@click.prevent 阻止浏览器默认行为 @click.native 绑定原生事件
    // 产生的问题：给组件自定义标签绑定DOM原生事件，该事件绑定无效
    // 解决：1.利用事件修饰符 @click.native绑定原生事件
    //      2.element-ul文档中提供的方法
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      // 清除sessionStorage中的hm74-toutiao
      window.sessionStorage.removeItem('hm74-toutiao')
      this.$router.push('/login')
    },
    handleCommand (command) {
      // command就是点击的选项中的command的值 setting/login
      this[command]()
      // command === setting ===> this.setting
      // command === logout ===> this.logout
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-aside {
    background: #002033;
    .logo {
        width: 100%;
        height: 60px;
        background:#024 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto
    }
    .colse {
      background: #024 url(../../assets/images/logo_admin_01.png) no-repeat center;
      background-size: 36px auto;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
  }
}
</style>
