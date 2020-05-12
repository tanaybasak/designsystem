import '../../../scss/components/tooltip/_tooltip.scss';
import { isElement } from '../../../js/utils/dom';
import Tooltip from '../../../js/tooltip';

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
  tooltip: function(selector, options) {
    attachElements(selector, options, Tooltip);
  }
};

if (window) {
  window.patron = { ...components };
}

// eslint-disable-next-line no-undef
export default patron;
