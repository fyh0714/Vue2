// 封装一个Vue插件 完成当前文件夹在所有大的组件全局注册
// 当导入这个模块 使用Vue.use(使用这个模块) Vue会调用install函数
import MyBread from '@/components/my-bread.vue'
export default {
  install (Vue) {
    // 使用Vue对象做业务即可
    // 进行组件注册
    Vue.component(MyBread.name, MyBread)
    // 有多个自定义组件，继续注册即可
  }
}
