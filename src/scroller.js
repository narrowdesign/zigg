const Scroller = {
  scrollY: 0,
  init() {
    window.addEventListener('wheel', () => this.wheelHandler());
    window.addEventListener('scroll', () => this.wheelHandler());
  },
  wheelHandler() {
    Scroller.scrollY = document.scrollingElement.scrollTop;
    
    if (Scroller.scrollY > 300) {
      document.querySelector('body').classList.add('is-menu-collapsed');
    } else {
      document.querySelector('body').classList.remove('is-menu-collapsed');
    }
  }
}

export default Scroller;

Scroller.init();