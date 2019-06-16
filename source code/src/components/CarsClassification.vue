<template>
  <div>
    <div class="content-header">
      <span @click="goToList()" class="content-header-back">
        Back to list
      </span>
    </div>
    <div class="content-title">
      <span>Stanford Cars Classification</span>
    </div>
    <hr>
    <el-form label-width="72px">
      <el-form-item label="JPG URL">
        <el-input v-model="url"></el-input>
      </el-form-item>
      <el-form-item v-if="!loading">
        <el-button @click="onSubmit">Analyze</el-button>
      </el-form-item>
    </el-form>
    <el-button v-if="loading" :loading="loading"></el-button>
    <el-card v-if="model !== ''">
      <div slot="header" class="clearfix">
        <span>
          Predicted Model: 
          <span style="color: #1989fa">{{ model }}</span>
        </span>
        <span style="float: right; padding: 3px 0" type="text">
          Confidence: 
          <span style="color: #1989fa">{{ confidence }}</span>
          </span>
      </div>
       <img :src="display_url" class="image">
    </el-card>
  </div>
</template>

<script>
import { getCarsClassification } from '@/api'

export default {
  name: 'CarsClassification',
  data () {
    return {
      url: '',
      loading: false,
      model: '',
      confidence: 0,
      display_url: '',
      search_url: ''
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.model = ''
      this.confidence = 0
      this.display_url = ''
      getCarsClassification(this.url).then((response) => {
        let arr = response.split(', ')
        if (arr.length != 3) {
          this.loading = false
          this.$notify.error({
            title: 'Error',
            message: 'Not a valid jpg image url',
            duration: 2500
          })
          return
        }
        this.model = arr[1].split(': ')[1]
        this.confidence = arr[2].split(': ')[1]
        this.display_url = arr[0].split(': ')[1]
        this.loading = false
      })
    },
    goToList () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.content-header {
  text-align: left;
}
.content-header-back {
  font-size: 0.9em;
  cursor: pointer;
}
.content-header-back:hover {
  color: #409EFF;
}
.content-title {
  font-size: 1.3em;
}
.el-form-item__content {
  margin-left: 0px;
}
.el-card {
  text-align: left;
}

</style>
