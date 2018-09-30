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
    window.smoothscroll = () => {
      this.visible = false
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
    window.onscroll = catchScroll
  },
  methods: {
    backToTop () {
      window.smoothscroll()
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
