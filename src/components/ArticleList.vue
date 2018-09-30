<template>
  <div>
    <div class="article-list-search">
      <!-- TODO -->
    </div>
    <el-button v-if="loading" :loading="loading"></el-button>
    <div v-for="article in articleList" :key="article.number" class="article-list-item">
      <div @click="goToContent(article.number)" class="article-list-item-title">
        <span>{{ article.title }}</span>
      </div>
      <div class="article-list-item-content">
        <div v-html="compiledMarkdown(article.body)"></div>
      </div>
      <div class="article-list-item-date">
        <div>{{ article.created_at.split('T')[0] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'ArticleList',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    articleList: {
      get () {
        return this.$store.getters.getArticles
      }
    }
  },
  created () {
    this.initArticleList()
  },
  methods: {
    initArticleList () {
      this.loading = true
      this.$store.commit('CLEAR_ARTICLE')
      this.$store.dispatch('requestArticleList', 1).then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    goToContent (number) {
      this.$router.push('/article/' + number)
    },
    compiledMarkdown (body) {
      return marked(body.substring(0, body.indexOf('\n')))
    }
  }
}
</script>

<style scoped>
  .article-list-item {
    padding: .5em;
    margin: 1em 0;
    text-align: left;
  }
  .article-list-item:hover {
    background-color: rgba(0, 0, 0, .05);
  }
  .article-list-item-title {
    font-size: 1.3em;
    cursor: pointer;
    transition: transform .2s;
    color: #303133;
  }
  .article-list-item-title:hover {
    color: #409EFF;
    transform: translateX(.3em);
  }
  .article-list-item-content {
    font-size: 0.9em;
  }
  .article-list-item-date {
    font-size: 0.6em;
  }
</style>
