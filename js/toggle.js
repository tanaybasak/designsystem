import { PREFIX } from './utils/config';

class Toggle {
  constructor(element, options) {
    this.element = element;
    this.state = {
      ...options
    };
  }

  attachEvents = () => {
    console.log(this.element);
  };
}

export default Toggle;
