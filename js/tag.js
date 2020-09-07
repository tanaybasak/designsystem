import { PREFIX } from './utils/config';

class Tag {
  constructor(element) {
    this.element = element;
    this.selectors = {
      closeIcon: `.${PREFIX}-close`
    };
  }

  clickListener = event => {
    event.preventDefault();
    this.element.parentNode.removeChild(this.element);
  };

  keyListener = event => {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.element.parentNode.removeChild(this.element);
    }
  };

  attachEvents = () => {
    const closeIcon = this.element.querySelector(this.selectors.closeIcon);
    if (closeIcon) {
      closeIcon.addEventListener('click', this.clickListener.bind(this));
      closeIcon.addEventListener('keypress', this.keyListener.bind(this));
    }
  };
}
export default Tag;
