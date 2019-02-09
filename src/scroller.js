const Scroller = {
  scrollY: 0,
  init() {
    window.addEventListener('wheel', this.wheelHandler);
    window.addEventListener('scroll', this.wheelHandler);
  },
  wheelHandler() {
    Scroller.scrollY = document.scrollingElement.scrollTop;
  }
  
}

export default Scroller;

Scroller.init();