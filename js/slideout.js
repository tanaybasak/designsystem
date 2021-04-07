// import { PREFIX } from './utils/config';
// import getClosest from './utils/get-closest';

class Slideout {
  constructor(element, options) {
    this.element = element;

    this.state = {
      expanded: false,
      direction: 'right',
      varient: 'default',
      ...options
    };
  }

  show = () => {};
  hide = () => {};
}

export default Slideout;
