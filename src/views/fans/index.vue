<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans-item" v-for="item in fans" :key="item.id.toString()">
            <el-avatar :size="80" :src="item.photo"></el-avatar>
            <p style="font-size:12px">{{item.name}}</p>
            <el-button plain type="primary" size="mini">+关注</el-button>
          </div>
          <div>
            <el-pagination
              v-if="total>reqParams.per_page"
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="reqParams.per_page"
              :current-page="reqParams.page"
              @current-change="pager"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">粉丝画像</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'list',
      fans: [],
      reqParams: {
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  created () {
    this.getFans()
  },
  methods: {
    // 粉丝列表数据
    async getFans () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.reqParams })
      this.fans = data.results
      this.total = data.total_count
    },
    // 分页数据
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFans()
    }
  }
}
</script>

<style scoped lang="less">
.fans-item {
  text-align: center;
  width: 120px;
  height: 160px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
