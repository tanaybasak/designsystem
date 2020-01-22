import '../../scss/main.scss';
import Navigation from './navigation';
import { isElement } from '../utils/dom';

const ComponentList = {
  navigation: Navigation
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
  navigation: function(selector, options) {
    attachElements(selector, options, Navigation);
  }
};

if (window) {
  window.patron = components;
}

// eslint-disable-next-line no-undef
export default patron;
