<template>
  <div id="app">
    <el-row>
      <el-col>
        <span class="header-title">Joldnine's Blog</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span class="header-quote">If I wasn't moving forward, I felt like I was going to explode.</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="1" :sm="3" :md="4" :lg="5" :xl="6">
        <span>&nbsp;</span>
      </el-col>
      <el-col :xs="22" :sm="18" :md="16" :lg="14" :xl="12">
        <router-view/>
      </el-col>
    </el-row>
    <back-to-top />
  </div>
</template>

<script>
import BackToTop from './components/BackToTop'
export default {
  name: 'app',
  components: { BackToTop }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #606266;
}
.header-title {
  font-size: 2em;
  color: #303133;
}
.header-quote {
  font-size: 1em;
  color: #909399;
}
code {
  color: #F56C6C;
}
</style>
