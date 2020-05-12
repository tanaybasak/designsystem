import '../../../scss/components/pagination/_pagination.scss';
import { isElement } from '../../../js/utils/dom';
import Pagination from '../../../js/pagination';

const ComponentList = {
  pagination: Pagination
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
  pagination: function(selector, options) {
    attachElements(selector, options, Pagination);
  }
};

if (window) {
  window.patron = { ...window.patron, ...components };
}
