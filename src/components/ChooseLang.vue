<template>
  <div class="language">
    <!-- <el-select v-model="value" @change="changeLanguage()">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>-->
    <el-dropdown size="mini" @command="changeLanguage">
      <span class="el-dropdown-link">
        {{value}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in options"
          :key="item.value"
          :command="item.value"
        >{{item.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ChooseLang extends Vue {
  options = [
    {
      value: 'en-US',
      label: 'English',
    },
    {
      value: 'zh-CN',
      label: '简体中文',
    },
  ];
  value: string = '';
  created() {
    this.chooseLang();
  }
  changeLanguage(command: string) {
    this.$i18n.locale = command;
    this.chooseLang();
  }
  chooseLang() {
    if (this.$i18n.locale === 'en-US') {
      this.value = 'English';
    } else if (this.$i18n.locale === 'zh-CN') {
      this.value = '简体中文';
    }
  }
}
</script>

<style scoped>
/* .language {
  padding: 5px 20px;
  width: auto;
} */
.el-dropdown-link {
  cursor: pointer;
  font-weight: bold;
  color: white;
}
/* .el-icon-arrow-down {
  font-size: 12px;
} */
/* .demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
} */
</style>
