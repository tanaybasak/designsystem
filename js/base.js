// eslint-disable-next-line no-unused-vars
import { isElement } from './utils/dom';
import handleDataBinding from './utils/data-api';

class Base {
  constructor(element, options) {
    // Assign element reference to class.
    this.element = element;

    // Set default config merged with user provided.
    this.state = {
      ...options
    };
  }

  // Lifecycle hook attach events to required elements and nodes.
  attachEvents = () => {
    this.element.addEventListener('click', event => {});
  };

  // Static method to handle data api binding.
  static handleDataAPI = () => {
    handleDataBinding('COMPONENT_NAME', function(element) {
      // Return component instance to start lifecycle hooks.
      return new Base(element, {});
    });
  };
}

export default Base;
