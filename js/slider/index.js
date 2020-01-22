import '../../scss/main.scss';
import Slider from './slider';
import { isElement } from '../utils/dom';

const attachElements = (selector, options, Plugin) => {
  Array.from(document.querySelectorAll(selector)).forEach(element => {
    // Validate element type.
    if (isElement(element)) {
      const component = new Plugin(element, options);
      if (typeof component.attachEvents === 'function') {
        component.attachEvents(element);
      }
    } else {
      console.error('Invalid element provided.');
    }
  });
};

export const components = {
  slider: function(selector) {
    attachElements(selector, null, Slider);
  }
};

if (window) {
  window.patron = components;
}

// eslint-disable-next-line no-undef
export default patron;
