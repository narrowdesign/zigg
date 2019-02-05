import './style.css';
import Geometry from './geometry';

function App() {
  Geometry();
  let logoPolygons = document.querySelector('.logo-container svg').querySelectorAll('polygon')
  
  for (let i = 0; i < logoPolygons.length; i++) {
    logoPolygons[i].style.opacity = 0;
    fadeIn(logoPolygons[i],i);
  }
  
  function fadeIn(el, num) {
    setTimeout(function(){
      el.style.opacity = 1;
    },num * 300)
  }
}

App();