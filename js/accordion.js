import { PREFIX } from './utils/config';

class Accordion {
  constructor(element, options) {
    this.element = element;

    this.state = {
      uncontrolled: options.uncontrolled || false,
      ...options
    };

    this.elements = this.element.querySelectorAll(`.${PREFIX}-accordion-title`);
  }

  toggleContent = event => {
    const comp = event.currentTarget;
    const item = comp.parentNode;
    const expanded = item.classList.contains('expanded');
    if (this.state.uncontrolled) {
      if (expanded) {
        item.classList.remove('expanded');
      }
    } else {
      this.elements.forEach(element => {
        const itm = element.parentNode;
        itm.classList.remove('expanded');
      });
    }
    if (!expanded) {
      item.classList.add('expanded');
    }
  };

  attachEvents = () => {
    this.elements.forEach((item) => {
      item.addEventListener('click', this.toggleContent);
    });
  };
}

export default Accordion;
