export const goToTop = () => {
  window.smoothscroll = () => {
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
    if (currentScroll > 0) {
      window.requestAnimationFrame(window.smoothscroll)
      window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
    }
  }
  window.smoothscroll()
}
