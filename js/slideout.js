import { PREFIX } from './utils/config';
import getClosest from './utils/get-closest';

class Slideout {
  constructor(element, options) {
    this.element = element;

    this.state = {
      expanded: false,
      ...options
    };
  }
}

export default Slideout;
