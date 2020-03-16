import { PREFIX } from './utils/config';

class Breadcrumb {
  constructor(element) {
    this.element = element;
    this.selectors = {
      items: `.${PREFIX}-breadcrumb-item>.${PREFIX}-link`,
      activeItems: `.${PREFIX}-breadcrumb-item.${PREFIX}-breadcrumb-item-active>.${PREFIX}-link`
    };
  }

  selectNewActiveItem = newActiveItem => {
    const activeItems = this.element.querySelectorAll(
      this.selectors.activeItems
    );
    activeItems.forEach(item => {
      item.parentNode.classList.remove(`${PREFIX}-breadcrumb-item-active`);
    });

    if (newActiveItem) {
      newActiveItem.parentNode.classList.add(
        `${PREFIX}-breadcrumb-item-active`
      );
    }
  };

  clickListener = event => {
    event.preventDefault();
    event.stopPropagation();
    this.selectNewActiveItem(event.currentTarget);
  };

  attachEvents = () => {
    const items = this.element.querySelectorAll(this.selectors.items);
    (items || []).forEach(item => {
      item.addEventListener('click', this.clickListener.bind(this));
    });
  };
}
export default Breadcrumb;
