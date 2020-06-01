import { PREFIX } from './utils/config';

class Accordion {
  constructor(element, options) {
    this.element = element;

    this.state = {
      uncontrolled: options.uncontrolled || false,
      ...options
    };

    const chkClass = el => el.classList.contains(`${PREFIX}-accordion-title`);
    const childs = ele => Array.from(ele.children);
    this.elements = childs(this.element).flatMap(el =>
      childs(el).filter(el => chkClass(el))
    );
  }

  toggleHeight = (item, status, isChanged) => {
    const collapseElement = item.children[1];
    if (!status) {
      if (isChanged) {
        const content = item.children[1].children[0];
        collapseElement.style.height = content.offsetHeight + 'px';
        setTimeout(() => {
          collapseElement.style.height = 0;
          collapseElement.style.overflow = 'hidden';
        });
      }
    } else {
      const content = item.children[1].children[0];
      collapseElement.style.height = content.offsetHeight + 'px';
      setTimeout(() => {
        collapseElement.style.height = 'auto';
        collapseElement.style.overflow = 'visible';
      }, 300);
    }
  };

  toggleContent = event => {
    const comp = event.currentTarget;
    const item = comp.parentNode;
    const expanded = item.classList.contains('expanded');
    if (this.state.uncontrolled) {
      if (expanded) {
        item.classList.remove('expanded');
        this.toggleHeight(item, false, expanded);
      }
    } else {
      this.elements.forEach(element => {
        const itm = element.parentNode;
        const isChanged = itm.classList.contains('expanded');
        itm.classList.remove('expanded');
        this.toggleHeight(itm, false, isChanged);
      });
    }
    if (!expanded) {
      item.classList.add('expanded');
      this.toggleHeight(item, true, false);
    }
  };

  attachEvents = () => {
    this.elements.forEach(item => {
      item.addEventListener('click', this.toggleContent);
      item.addEventListener('keypress', event => {
        event.preventDefault();
        if (event.keyCode === 13) {
          this.toggleContent(event);
        }
      });
    });
  };
}

export default Accordion;
