import '../../../scss/components/slider/_slider.scss';
import { isElement } from '../../../js/utils/dom';
import Slider from '../../../js/slider';

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
  slider: function (selector, options) {
    attachElements(selector, options, Slider);
  }
};

if (window) {
  window.patron = { ...window.patron, ...components };
}

// eslint-disable-next-line no-undef
export default patron;
