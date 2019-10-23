import './style.css';
import Scroller from './scroller';

function App() {
  setTimeout(() => {
    document.body.scrollLeft = 0;
    document.scrollingElement.scrollLeft = 0;
  },10)

  Scroller();
}

App();