<template>
  <div class="sidebar">
    <!-- <el-button @click="toggle"><i class="el-icon-share"></i></el-button> -->
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#071018"
      text-color="#ffffff"
      active-text-color="#20a0ff"
      unique-opened
      router
      :collapse="isCollapse"
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <!-- <i :class="item.icon"></i> -->
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-menu-item
                :index="subItem.index"
                :key="subItem.index"
                class="subTitle"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <!-- <i :class="item.icon"></i> -->
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang='ts'>
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Sidebar extends Vue {
  isCollapse = false;
  // methods
  // toggle() {
  //   console.log(this);
  //   this.isCollapse ? (this.isCollapse = false) : (this.isCollapse = true);
  // }
  get onRoutes() {
    return this.$route.path.replace("/", "");
  }
  get items() {
    return [
      {
        index: "home",
        title: this.$t("sidebar.home")
      },
      {
        index: "roleInfo",
        title: this.$t("sidebar.roleInfo"),
        subs: [
          { index: "playerRoleInfo", title: this.$t("sidebar.playerRoleInfo") },
          {
            index: "currencySetting",
            title: this.$t("sidebar.currencySetting")
          },
          { index: "rankingList", title: this.$t("sidebar.rankingList") },
          { index: "recharge", title: this.$t("sidebar.recharge") }
        ]
      },
      {
        index: "backpackInfo",
        title: this.$t("sidebar.backpackInfo")
      },
      {
        index: "changeExp",
        title: this.$t("sidebar.changeExp")
      },
      {
        index: "phantomInfo",
        title: this.$t("sidebar.phantomInfo")
      },
      {
        index: "trusteeship",
        title: this.$t("sidebar.trusteeship")
      },
      {
        index: "horseRaceLamp",
        title: this.$t("sidebar.horseRaceLamp")
      },
      {
        index: "serverOperation",
        title: this.$t("sidebar.serverOperation"),
        subs: [
          {
            index: "whiteList",
            title: this.$t("sidebar.whiteList")
          }
        ]
      },
      {
        index: "ordinarymail",
        title: this.$t("sidebar.ordinarymail")
      },
      {
        index: "funclist",
        title: this.$t("sidebar.funclist")
      }
    ];
  }
}
</script>

<style scoped>
.el-submenu__title > span,
.el-menu-item {
  font-size: 15px !important;
  color: white;
  /* text-align: left */
}
.sidebar {
  display: block;
  overflow: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  border-radius: 0 0 10px 0;
  user-select: none;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
}
/* .sidebar > button {
  float: right;
} */
.sidebar > ul > li {
  text-align: left;
}
.el-submenu .el-menu-item {
  min-width: auto;
  padding: auto;
}
.subTitle {
  font-size: 13px !important;
  /* padding-left: 55px !important; */
  color: white;
}
</style>
