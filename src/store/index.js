import Vue from 'vue'
import Vuex from 'vuex'
import { getArticleListApi, getArticleApi } from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articles: []
  },
  mutations: {
    ADD_ARTICLE: (state, article) => {
      state.articles.push(article)
    },
    CLEAR_ARTICLE: (state) => {
      state.articles = []
    }
  },
  actions: {
    requestArticleList ({ commit }, page) {
      const pagination = { page: page, size: 66 }
      return new Promise((resolve, reject) => {
        getArticleListApi(pagination).then((articles) => {
          articles.forEach(article => {
            if (!article.labels.find(e => e.name === 'Hide')) {
              commit('ADD_ARTICLE', article)
            }
          })
          resolve()
        })
      })
    },
    requestArticle ({ commit }, number) {
      return new Promise((resolve, reject) => {
        getArticleApi(number).then(article => {
          commit('ADD_ARTICLE', article)
          resolve()
        })
      })
    }
  },
  getters: {
    getArticles: state => {
      return state.articles
    },
    getArticleById: (state) => (number) => {
      return state.articles.find(article => article.number === parseInt(number))
    },
    isArticlesEmpty: (state) => {
      return state.articles.length === 0
    },
    isArticleExisted: (state) => (number) => {
      return state.articles.find(article => article.number === parseInt(number)) !== undefined
    }
  }
})

export default store
