import '../../../scss/components/tree/_tree.scss';
import { isElement } from '../../../js/utils/dom';
import Overlay from '../../../js/overlay';

const ComponentList = {
  overlay: Overlay
};

for (const componentName in ComponentList) {
  if (Object.prototype.hasOwnProperty.call(ComponentList, componentName)) {
    const component = ComponentList[componentName];
    if (typeof component.handleDataAPI === 'function') {
      component.handleDataAPI();
    }
  }
}

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
  overlay: function(selector) {
    attachElements(selector, null, Overlay);
  }
};

if (window) {
  window.patron = { ...window.patron, ...components };
}

// eslint-disable-next-line no-undef
export default patron;
