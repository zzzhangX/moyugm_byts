<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li
        class="tags-li"
        v-for="(item,index) in tagsList"
        :class="{'active': isActive(item.path)}"
        :key="index"
      >
        <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
        <span class="tags-li-icon" @click="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </li>
    </ul>
    <div class="tags-close-box">
      <el-dropdown size="mini" @command="handleTags">
        <el-button size="mini" type="primary">
          {{ $t("tags.tagsChoose") }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">{{$t("tags.closeOthers") }}</el-dropdown-item>
          <el-dropdown-item command="all">{{$t("tags.closeAll") }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang='ts'>
import bus from "./bus";
import { mapActions, mapState } from "vuex"; // 注册 action 和 state
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class Tags extends Vue {
  // data
  private tagsList = [
    {
      path: "",
      title: "",
      name: ""
    }
  ];
  @Watch("$route")
  route(to: any, from: any): void {
    this.setTags(to);
  }
  created() {
    this.tagsList = [];
    this.setTags(this.$route);
  }
  // methods
  // 设置标签
  setTags(route: any) {
    const isExist = this.tagsList.some(item => {
      return item.path === route.fullPath;
    });
    if (!isExist) {
      if (this.tagsList.length >= 6) {
        this.tagsList.shift();
      }
      this.tagsList.push({
        title: `${this.$t(route.meta.title)}`,
        path: route.fullPath,
        name: route.matched[1].components.default.name
      });
    }
    bus.$emit("tags", this.tagsList);
  }
  isActive(path: string) {
    return path === this.$route.fullPath;
  }
  // 关闭单个标签
  closeTags(index: number) {
    const delItem = this.tagsList.splice(index, 1)[0];
    const item = this.tagsList[index]
      ? this.tagsList[index]
      : this.tagsList[index - 1];
    if (item) {
      // tslint:disable-next-line:no-unused-expression
      delItem.path === this.$route.fullPath && this.$router.push(item.path);
    } else {
      this.$router.push("/");
    }
  }
  closeAll() {
    this.tagsList = [];
    this.$router.push("/");
  }
  // 关闭其他标签
  closeOther() {
    this.tagsList = this.tagsList.filter(item => {
      return item.path === this.$route.fullPath;
    });
  }
  handleTags(command: string) {
    command === "other" ? this.closeOther() : this.closeAll();
  }
  //   watch() {
  //   $route(to, from) {
  //     this.setTags(to);
  //   }
  // }

  // $route(to: any, from: any) {
  //   this.setTags(to);
  // }
  // computed
  get showTags() {
    return this.tagsList.length > 0;
  }
  // @Watch("sum.acum")
  // $route(to, from) {
  //   this.setTags(to);
  // }
}
</script>


<style scpoed>
.el-dropdown {
  line-height: normal !important;
  display: block;
}
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  margin: 5px 0 20px 0;
  background: white;
  padding-right: 120px;
  box-shadow: 0 5px 10px rgb(190, 182, 182);
}

.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
}
.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: white;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
  background: #409eff;
}

.tags-li.active {
  background-color: #409eff;
  color: rgb(32, 75, 214);
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}

.tags-li.active .tags-li-title {
  color: #fff;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
</style>
