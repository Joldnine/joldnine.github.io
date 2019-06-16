import Vue from 'vue'
import Router from 'vue-router'

import ArticleList from '@/components/ArticleList'
import ArticleContent from '@/components/ArticleContent'
import CarsClassification from '@/components/CarsClassification'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/article/:number',
      name: 'ArticleContent',
      component: ArticleContent
    },
    {
      path: '/cars-classification',
      name: 'CarsClassification',
      component: CarsClassification
    }
  ]
})
