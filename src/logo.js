import Scroller from './scroller';

class Logo {
  constructor() {
    this.logoEl = document.querySelector('js-logo');
    this.logoBase = document.querySelector('.js-logo-base');
    this.logoBg = document.querySelector('.js-logo-bg');
    this.logoPolygons = document.querySelector('.logo-container svg').querySelectorAll('polygon')
    for (let i = 0; i < this.logoPolygons.length; i++) {
      this.logoPolygons[i].style.opacity = 0;
      this.fadeIn(this.logoPolygons[i],i);
    }
    requestAnimationFrame(this.animate);
  }

  animate() {
    
  }
  
  fadeIn(el, num) {
    setTimeout(function(){
      el.style.opacity = 1;
    }, num * 300)
  }
}

export default Logo;