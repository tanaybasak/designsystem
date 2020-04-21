import { PREFIX } from './utils/config';
import { addListener, removeListeners } from './eventManager';

let breadcrumbINC = 0;
class Breadcrumb {
  constructor(element) {
    this.element = element;
    this.selectors = {
      items: `.${PREFIX}-breadcrumb-item>.${PREFIX}-link`,
      activeItems: `.${PREFIX}-breadcrumb-item.${PREFIX}-breadcrumb-item-active>.${PREFIX}-link`,
      overflowContainer: `.${PREFIX}-ellipsis`,
      overflowMenu: `.${PREFIX}-overflow-menu`
    };
    this.state = {
      isOpen: false
    };
    this.breadcrumbId = breadcrumbINC++;
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

  clickOverflowListener = event => {
    event.preventDefault();
    event.stopPropagation();
    const overflowmenu = this.element.querySelector(this.selectors.overflowMenu);
    overflowmenu.classList.toggle(`${PREFIX}-hidden`);
    this.state.isOpen = !(Array.from(overflowmenu.classList).indexOf(`${PREFIX}-hidden`) > -1);
    this.toggleState(this.state.isOpen);
    this.element.querySelector(`.${PREFIX}-overflow-option .${PREFIX}-link`).focus();
  }

  keydownOverflowListener = event => {
    const keycode = event.keycode || event.which;
    // TODO accessibility
    if (keycode === 13 || keycode === 32) { // space or Enter
      event.preventDefault();
      event.target.click();
    }
  }

  toggleState = (isOpen) => {
    if (isOpen) {
      addListener(
        'breadcrumb-' + this.breadcrumbId,
        'click',
        e => {
          this.handleClick(e);
        },
        true
      );
    } else {
      removeListeners('breadcrumb-' + this.breadcrumbId, 'click');
      const overflowmenu = this.element.querySelector(this.selectors.overflowMenu);
      overflowmenu.classList.add(`${PREFIX}-hidden`);
    }
  }

  handleClick = e => {
    if (this.element) {
      if (e && this.element.contains(e.target)) {
        return;
      }
      this.state.isOpen = !this.state.isOpen;
      this.toggleState(this.state.isOpen);
    }
  }

  attachEvents = () => {
    const items = this.element.querySelectorAll(this.selectors.items);
    const overflowItem = this.element.querySelector(this.selectors.overflowContainer);
    (items || []).forEach(item => {
      item.addEventListener('click', this.clickListener.bind(this));
    });
    if (overflowItem) {
      overflowItem.addEventListener('click', this.clickOverflowListener.bind(this));
      overflowItem.addEventListener('keydown', this.keydownOverflowListener.bind(this));
    }
  };
}
export default Breadcrumb;
