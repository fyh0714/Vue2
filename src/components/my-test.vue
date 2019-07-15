<template>
    <div class="container">
        <p>头部</p>
        <p><slot name="content" :test="innerData">内容</slot></p>
        <p><slot name="footer">底部</slot></p>
    </div>
</template>

<script>
export default {
  data () {
    return {
      innerData: '组件的内部数据'
    }
  }
}
</script>

<style lang="less">

</style>
