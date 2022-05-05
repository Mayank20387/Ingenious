import React from '../../web_modules/react.js';
import Particles from '../../web_modules/react-particles-js.js';

const Background = () => /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
}, /*#__PURE__*/React.createElement(Particles, {
  params: {
    particles: {
      number: {
        value: 55
      },
      size: {
        value: 3
      }
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        }
      }
    }
  }
}));

export default Background;