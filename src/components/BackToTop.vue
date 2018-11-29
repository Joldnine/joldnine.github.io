<template>
  <transition>
    <div class="back-to-top" :style="`bottom:${this.bottom};right:${this.right};`" v-show="visible" @click="backToTop">
      <el-tag>
        <i class="el-icon-arrow-up"></i>
      </el-tag>
    </div>
  </transition>
</template>

<script>
import { goToTop } from '@/utils'

export default {
  name: 'BackToTop',
  props: {
    visibleOffset: {
      type: [String, Number],
      default: 50
    },
    right: {
      type: String,
      default: '64px'
    },
    bottom: {
      type: String,
      default: '80px'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  created () {
    let catchScroll = () => {
      this.visible = (window.pageYOffset > parseInt(this.visibleOffset))
    }
    window.onscroll = catchScroll
  },
  methods: {
    backToTop () {
      goToTop()
    }
  }
}
</script>

<style scoped>
  .back-to-top{
    position: fixed;
    cursor: pointer;
  }
</style>
