<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Blog" name="1">
        <el-button v-if="loading" :loading="loading"></el-button>
        <div v-for="article in articleList" :key="article.number" class="list-item">
          <div @click="goToArticle(article.number)" class="list-item-title">
            <span>{{ article.title }}</span>
          </div>
          <div class="list-item-content">
            <div v-html="compiledMarkdown(article.body)"></div>
          </div>
          <div class="list-item-date">
            <div>{{ article.created_at.split('T')[0] }}</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Playground" name="2">
        <div v-for="item in demoList" :key="item.name" class="list-item">
          <div @click="goToPage(item.router)" class="list-item-title">
            <span>{{ item.name }}</span>
          </div>
          <div class="list-item-content">
            <div v-html="compiledMarkdown(item.desc)"></div>
          </div>
          <div class="list-item-date">
            <div>{{ item.addDate }}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'ArticleList',
  data () {
    return {
      loading: false,
      activeTab: "1",
      demoList: [
        {
          name: "Stanford Cars Classification",
          router: "cars-classification",
          desc: "A serverless deployment of a trained cars classification model.\n",
          addDate: "2019-06-01"
        }
      ]
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
    goToArticle (number) {
      this.$router.push('/article/' + number)
    },
    goToPage(name) {
      this.$router.push('/' + name)
    },
    compiledMarkdown (body) {
      return marked(body.substring(0, body.indexOf('\n')))
    }
  }
}
</script>

<style scoped>
  .list-item {
    padding: .5em;
    margin: 1em 0;
    text-align: left;
  }
  .list-item:hover {
    background-color: rgba(0, 0, 0, .05);
  }
  .list-item-title {
    font-size: 1.3em;
    cursor: pointer;
    transition: transform .2s;
    color: #303133;
  }
  .list-item-title:hover {
    color: #409EFF;
    transform: translateX(.3em);
  }
  .list-item-content {
    font-size: 0.9em;
  }
  .list-item-date {
    font-size: 0.6em;
  }
</style>
