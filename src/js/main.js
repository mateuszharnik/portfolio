import $ from 'jquery';
import Aos from 'aos';

import './components/navbar';
import './components/scrollToAnchor';

const appReady = () => {
  Aos.init();
};

$(appReady);
