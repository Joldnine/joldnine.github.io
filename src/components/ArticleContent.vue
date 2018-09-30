<template>
  <div>
    <div class="content-header">
      <span @click="goToList()" class="content-header-back">
        Back to list
      </span>
    </div>
    <el-button v-if="loading" :loading="loading"></el-button>
    <div class="content-title">
      <span>{{ article.title }}</span>
    </div>
    <hr>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="content-date">
          {{ article.created_at.split('T')[0] }}
        </div>
      </el-col>
      <el-col :span="12">
        <div v-html="getLabelsStr" class="content-label" />
      </el-col>
    </el-row>
    <div v-html="compiledMarkdown" class="content" />
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'ArticleContent',
  data () {
    return {
      article: {
        body: '',
        created_at: '',
        labels: []
      },
      number: this.$route.params.number,
      loading: true
    }
  },
  created () {
    this.getArticleById()
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.article.body, { sanitize: true, breaks: true })
    },
    getLabelsStr () {
      var labels = this.article.labels
      var labelsStr = ''
      labels.forEach(label => {
        labelsStr += label.name
      })
      if (labels.length > 0) {
        labelsStr = '<i class="el-icon-info" /> ' + labelsStr
      }
      return labelsStr
    }
  },
  methods: {
    getArticleById () {
      if (!this.$store.getters.isArticleExisted(this.number)) {
        this.$store.dispatch('requestArticle', this.number).then(() => {
          this.article = this.$store.getters.getArticleById(this.number)
        })
      } else {
        this.article = this.$store.getters.getArticleById(this.number)
      }
      this.loading = false
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
.content {
  text-align: left;
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 10px;
}
.content-date {
  text-align: left;
  font-size: 0.8em;
  padding: 0 10px;
}
.content-label {
  text-align: right;
  font-size: 0.8em;
  padding: 0 10px;
}
</style>
