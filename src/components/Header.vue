<template>
  <div class="header">
    <div class="logo">
      <span>{{ $t("home.headerTitile") }}</span>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 选择服务器 -->
        <div class="userInfo">
          <el-dropdown size="mini" class="server-id" @command="changeServer">
            <span class="el-dropdown-link">
              <i class="fa fa-user"></i>
              {{value}}
              <i class="el-icon-arrow-down el-icon--rights"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in serverlist"
                :key="index"
                :command="item.id"
              >{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 语言栏 -->
        <ChooseLang/>
        <!-- 用户名下拉菜单 -->
        <div class="userInfo">
          <el-dropdown size="mini" class="user-name" @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="fa fa-user"></i>
              {{username}}
              <i class="el-icon-arrow-down el-icon--rights"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided command="logout">{{ $t("home.logout") }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 修改密码弹框 -->
    <!-- <el-dialog :title="$t('home.changePwd')" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" status-icon ref="form">
        <el-form-item :label="$t('home.oldPwd')" :label-width="formLabelWidth" prop="oldPwd">
          <el-input v-model="form.oldPwd" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('home.newPwd')" :label-width="formLabelWidth" prop="newPwd">
          <el-input v-model="form.newPwd" auto-complete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelChange('form')">{{ $t("home.cancel") }}</el-button>
        <el-button type="primary" @click="submitForm">{{ $t("home.sure") }}</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script lang='ts'>
import axios from "axios";
import { mapActions, mapState } from "vuex"; // 注册 action 和 state
import { Component, Vue } from "vue-property-decorator";
import ChooseLang from "@/components/ChooseLang.vue";

@Component({
  components: {
    ChooseLang
  }
})
export default class Header extends Vue {
  // computed
  get username() {
    const username = localStorage.getItem("username");
    return username ? username : this.name;
  }
  public serverlist = [{ id: 25001, name: "雷鸣大陆" }];
  public value: string = "请选服务器";
  public name: string = "unsigned";
  // tslint:disable-next-line:ban-types
  public dialogFormVisible: Boolean = false;
  public formLabelWidth: string = "120px";
  private myThis: any = this;
  // 钩子
  created() {
    this.serverList();
  }
  // methods
  // 用户名下拉
  // tslint:disable-next-line:member-ordering
  handleCommand(command: string) {
    if (command === "logout") {
      this.myThis
        .$confirm(
          `${this.$t("home.comfirm.title")}`,
          `${this.$t("home.comfirm.msg")}`,
          {
            confirmButtonText: `${this.$t("home.sure")}`,
            cancelButtonText: `${this.$t("home.cancel")}`,
            type: "warning"
          }
        )
        .then(() => {
          localStorage.removeItem("username");
          localStorage.removeItem("token");
          this.$router.push("/");
        })
        // tslint:disable-next-line:no-empty
        .catch(() => {});
    } else {
      this.dialogFormVisible = true;
    }
  }
  // tslint:disable-next-line:member-ordering
  chooseServer() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.serverlist.length; i++) {
      if (this.$store.state.serverId === this.serverlist[i].id) {
        this.value = this.serverlist[i].name;
      }
    }
  }
  // 选择服务器事件
  // tslint:disable-next-line:ban-types
  // tslint:disable-next-line:member-ordering
  changeServer(command: number) {
    this.$store.commit("changeServe", command);
    this.chooseServer();
  }
  // 加载服务器列表
  serverList() {
    const url = "api/config/serverlist";
    const params = {};
    const getPromise = axios.get(url);
    getPromise.then(resp => {
      // console.log(resp);
      if (resp.data.code === 200) {
        this.serverlist = resp.data.msg;
      } else {
        this.$message({
          showClose: true,
          message: `服务器加载失败`,
          type: "error"
        });
      }
    });
    getPromise.catch(err => {
      this.$message({
        showClose: true,
        message: `服务器加载失败`,
        type: "error"
      });
      // tslint:disable-next-line:no-console
      console.log(err);
    });
    return getPromise;
  }
}
</script>
<style scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  background-color: rgb(5, 18, 31);
  color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 1px;
  user-select: none;
}
.header .logo {
  /* text-align: left; */
  line-height: 50px;
}
.header-user-con {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.userInfo {
  margin: 0 15px;
}
.el-dropdown-link {
  font-weight: bold;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 15px;
}
.server-id {
  margin-right: 15px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
