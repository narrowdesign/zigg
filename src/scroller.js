const Scroller = {
  scrollY: 0,
  init() {
    this.scrollY = document.scrollingElement.scrollTop;
    this.missionMenuTop = document.querySelector('.js-mission-menu').getBoundingClientRect().bottom - 150 + this.scrollY;
    this.weMenuTop = document.querySelector('.js-we-menu').getBoundingClientRect().bottom - 180 + this.scrollY;
    this.portfolioMenuTop = document.querySelector('.js-portfolio-menu').getBoundingClientRect().bottom - 180 + this.scrollY;
    this.missionBottom = document.querySelector('.mission .js-bottom-edge');
    this.weBottom = document.querySelector('.we .js-bottom-edge');
    this.portfolioBottom = document.querySelector('.portfolio .js-bottom-edge');
    this.mission = document.querySelector('.mission');
    this.we = document.querySelector('.we');
    this.portfolio = document.querySelector('.portfolio');
    this.missionTop = this.mission.querySelector('.mission__top')
    this.weTop = this.we.querySelector('.we__top')
    this.portfolioTop = this.portfolio.querySelector('.portfolio__top')
    this.body = document.querySelector('body');
    document.querySelector('.js-menu-icon').addEventListener('click', () => {
      document.scrollingElement.scrollTop = 0;
      //.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    })
    window.addEventListener('wheel', () => this.wheelHandler());
    window.addEventListener('scroll', () => this.wheelHandler());
    this.initLines();
  },
  wheelHandler() {
    requestAnimationFrame(() => {
      this.scrollY = document.scrollingElement.scrollTop;

      // this.mission.style.transform = `translate3d(${-40 + Math.min(this.scrollY/30, 40)}px, ${-40 + Math.min(this.scrollY/30, 40)}px, 0)`;
      // this.missionBottom.style.transform = `scaleY(${1 - Math.max(0, Math.min(this.scrollY/1200, 1))}) `
      if (this.scrollY > this.missionMenuTop) {
        this.body.classList.add('is-menu-collapsed');
        this.body.classList.remove('is-menu-mission');
        this.body.classList.remove('is-menu-we');
        this.body.classList.remove('is-menu-portfolio');

        if (this.scrollY > this.weMenuTop && this.scrollY < this.portfolioMenuTop) {
          this.body.classList.add('is-menu-we');
        } else if (this.scrollY >= this.portfolioMenuTop) {
          this.body.classList.add('is-menu-portfolio');
        } else {
          this.body.classList.add('is-menu-mission');
        }
      } else {
        this.body.classList.remove('is-menu-collapsed');
      }
    })
  },
  initLines() {
    const lines = Array.from(this.missionTop.querySelectorAll('svg line'));
    lines.forEach((line, i) => {
      line.style.transitionDelay = `${(lines.length - i) * .01}s`;
      line.style.opacity = '1';
    })
  }
}

export default Scroller;

setTimeout(function(){
  Scroller.init();
}, 1500)