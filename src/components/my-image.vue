<template>
  <div class="image-container">
    <div class="img-btn" @click="openDialog">
      <!-- 图片按钮 -->
      <img :src="value||dafaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px">
      <!-- v-model="activeName" activeName是选项卡标签的name属性的值 -->
      <!-- label="" 选项卡标签的文字 -->
      <!-- el-tab-pane 标签的内容 就是选项卡对应的内容 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框 -->
          <div style="margin-bottom:10px">
            <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="img-item" :class="{selected:selectedImageUrl===item.url}" @click="selectedImage(item.url)" v-for="item in images " :key="item.id">
            <img :src="item.url" alt />
          </div>
          <!-- 分页 -->
          <el-pagination v-if="total>reqParams.per_page" background layout="prev, pager, next" :total="total" :page-size="reqParams.per_page" :current-page="reqParams.page" @current-change="pager"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="handleSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dafaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      // 头部数据
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('hm74-toutiao')).token
      },
      // 控制对话框显示和隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 获取素材列表时传参
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 上传图片后的预览地址
      uploadImageUrl: null,
      // 素材列表数据
      images: [],
      // 总数量
      total: 0,
      // 你选中素材的地址
      selectedImageUrl: null,
      // 你选中的图片
      // 注意：webpack不会去打包在数据中定义的地址对应的资源,打包标签上的src或url的资源
      // 注意：本地的资源不会打包 网络资源会打包
      // 自己主动导入 你需要的图片
      // value: dafaultImage
      dafaultImage
    }
  },
  props: ['value'], // 只读
  methods: {
    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
      // 如果是素材 使用selectedImageUrl作为封面图
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // 不能修改props中的value值
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
      } else {
      // 如果是上传图片 使用uploadImageUrl 作为封面图
        if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false
    },
    // 上传成功
    handleSuccess (res) {
      // 预览
      this.uploadImageUrl = res.data.url
    },
    // 选中图片
    selectedImage (url) {
      // 思路：class={selected:条件}
      // 条件 记录上一次点击图片的唯一标识 然后 去比对每一次遍历的图片唯一标识
      // 如果一致 选中  不一致 不选中
      // 此时图片地址做唯一标识
      this.selectedImageUrl = url
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    openDialog () {
      // 清除上一次数据
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      this.reqParams.page = 1
      this.dialogVisible = true
      // 渲染素材列表
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.image-container {
  display: inline-block;
  margin-right: 20px;
}
.img-item {
  height: 120px;
  width: 150px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  &.selected{
    &::before {
      //.img-item.selected::before{} 加上selelctedclass加遮罩层
      content:"";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0,0.2) url(../assets/images/selected.png) no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    //属性作用：图片填充的规则，等比例缩放 完整显示在容器内
    object-fit: contain;
  }
}
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
