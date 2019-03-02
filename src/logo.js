import Scroller from './scroller';

class Logo {
  constructor() {
    
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