const Scroller = {
  scrollY: 0,
  init() {
    window.addEventListener('wheel', this.wheelHandler);
  },
  wheelHandler(e) {
    Scroller.scrollY = document.scrollingElement.scrollTop;
  }
  
}

export default Scroller;

Scroller.init();