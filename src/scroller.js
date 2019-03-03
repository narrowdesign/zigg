const Scroller = {
  scrollY: 0,
  init() {
    this.scrollY = document.scrollingElement.scrollTop;
    this.missionTop = document.querySelector('.js-mission-menu').getBoundingClientRect().bottom - 150 + this.scrollY;
    this.weTop = document.querySelector('.js-we-menu').getBoundingClientRect().bottom - 180 + this.scrollY;
    this.portfolioTop = document.querySelector('.js-portfolio-menu').getBoundingClientRect().bottom - 180 + this.scrollY;
    this.missionBottom = document.querySelector('.mission .js-bottom-edge');
    this.weBottom = document.querySelector('.we .js-bottom-edge');
    this.portfolioBottom = document.querySelector('.portfolio .js-bottom-edge');
    this.mission = document.querySelector('.mission');
    this.we = document.querySelector('.we');
    this.portfolio = document.querySelector('.portfolio');
    document.querySelector('.js-menu-icon').addEventListener('click', () => {
      document.scrollingElement.scrollTop = 0;
      //.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    })
    window.addEventListener('wheel', () => this.wheelHandler());
    window.addEventListener('scroll', () => this.wheelHandler());
  },
  wheelHandler() {
    requestAnimationFrame(() => {
      this.scrollY = document.scrollingElement.scrollTop;

      // this.mission.style.transform = `translate3d(${-40 + Math.min(this.scrollY/30, 40)}px, ${-40 + Math.min(this.scrollY/30, 40)}px, 0)`;
      // this.missionBottom.style.transform = `scaleY(${1 - Math.max(0, Math.min(this.scrollY/1200, 1))}) `
      if (this.scrollY > this.missionTop) {
        document.querySelector('body').classList.add('is-menu-collapsed');
        document.querySelector('body').classList.remove('is-menu-mission');
        document.querySelector('body').classList.remove('is-menu-we');
        document.querySelector('body').classList.remove('is-menu-portfolio');

        if (this.scrollY > this.weTop && this.scrollY < this.portfolioTop) {
          document.querySelector('body').classList.add('is-menu-we');
        } else if (this.scrollY >= this.portfolioTop) {
          document.querySelector('body').classList.add('is-menu-portfolio');
        } else {
          document.querySelector('body').classList.add('is-menu-mission');
        }
      } else {
        document.querySelector('body').classList.remove('is-menu-collapsed');
      }
    })
  }
}

export default Scroller;

setTimeout(function(){
  Scroller.init();
}, 10)