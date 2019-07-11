<template>
    <div class="login-container">
        <el-card class="login-box">
            <img src="../../assets/images/logo_index.png" alt="">
        </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.login-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    //couver 铺面容器 多余的裁剪 contain 在容器内容完全显示图片
    //背景定位 / 背景尺寸
    background:url(../../assets/images/login_bg.jpg) no-repeat center / cover;
    .login-box {
    width: 400px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);
    img {
        display:block;
        width: 200px;
        margin: 10px auto;
     }
    }
  }
</style>
