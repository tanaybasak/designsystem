import '../../../scss/base.scss';
import '../../../scss/components/number-input/_number-input.scss';
import { isElement } from '../../../js/utils/dom';
import NumberInput from '../../../js/numberInput';

const ComponentList = {
  numberInput: NumberInput
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
  numberInput: function(selector, options) {
    attachElements(selector, options, NumberInput);
  }
};

if (window) {
  window.patron = components;
}

// eslint-disable-next-line no-undef
export default patron;
