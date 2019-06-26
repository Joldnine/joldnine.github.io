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
        <el-input v-model="url" @keyup.enter.native="onSubmit"></el-input>
      </el-form-item>
      <el-form-item v-if="!loading">
        <el-button @click="onSubmit">Analyze</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="loading" :loading="loading"></el-button>
      </el-form-item>
    </el-form>
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
      url: 'https://i.ytimg.com/vi/mxxUZl9_sLw/maxresdefault.jpg',
      loading: false,
      model: '',
      confidence: 0,
      display_url: ''
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.model = ''
      this.confidence = 0
      this.display_url = ''
      getCarsClassification(this.url).then((response) => {
        if ('error' in response) {
          this.loading = false
          this.$notify.error({
            title: 'error',
            message: response.error,
            duration: 2500
          })
          return
        }
        this.$notify.success({
          title: 'Success',
          message: "Inference time: " + response.time,
          duration: 2500
        })
        this.model = response.class
        this.confidence = response.confidence
        this.display_url = this.url
        this.loading = false
      })
      setTimeout(() => { 
          if (this.loading == true) {
            this.$notify.info({
              title: 'Info',
              message: "Please expect a longer response time (~6s) for the first prediction,\
               because AWS Lambda needs some time do the 'cold start'.",
              duration: 4000
            })
          }
        }, 
        2000
      );
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
