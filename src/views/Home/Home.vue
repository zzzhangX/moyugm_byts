<template>
  <div class="Home">
  <el-container class="my-container">
    <!-- 头部 -->
    <el-header>
      <vHead></vHead>
    </el-header>
    <el-container>
      <!-- 导航 -->
      <el-aside>
        <vSidebar></vSidebar>
      </el-aside>
      <el-container>
        <el-main>
          <vTags></vTags>
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <router-view :publicData="publicData"></router-view>
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
  </div>
</template>

<script lang='ts'>
// import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import vHead from "@/components/Header.vue";
import vSidebar from "@/components/Sidebar.vue";
import vTags from "@/components/Tags.vue";
import bus from "@/components/bus";
@Component({
  components: {
    vHead,
    vSidebar,
    vTags
  }
})
export default class Home extends Vue {
  public publicData = [];
  public tagsList: any[] = [];
  created() {
    // console.log(this)
    // 只有在标签页列表里的页面才使用keep-alive
    bus.$on("tags", (msg: Array<{ name: any; }>) => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        // tslint:disable-next-line:no-unused-expression
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  }
}
</script>
<style scoped>
.Home{
  height: 100%;
  overflow-y: scroll
}
.el-header {
  padding: 0;
  height: 50px !important;
}
.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  line-height: 200px;
  width: 8% !important;
  /* width: auto; */
}
.my-container {
  height: 100%;
  /* overflow-y: scroll; */
}
.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  padding: 0 20px;
  /* line-height: 160px; */
}
.content-box {
  border: 1px solid red;
}
.el-main {
  margin: 1%;
  border-radius: 20px;
  background-color: white;
}
</style>
